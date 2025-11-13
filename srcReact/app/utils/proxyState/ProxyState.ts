import {
	EMarkOperation,
	EPromiseStatus,
	globalProxyObjectCache,
	globalProxyObjectHandlerMap,
	globalProxyStoreCache,
	markVersionHolder,
} from './profile'
import { createSnapshot } from './snapshot'
import { TLocalObject, TProxyHandlerItem, TProxyObjectHandlerItemObject } from './types'
import { canProxy, isObject } from './utils'

export class ProxyState {
	private _parent: Object
	private _nowVersion: number
	private _checkVersion: number
	private _listeners: Set<(...args: Array<any>) => void>
	private _proxyObject: Object
	private _childMap: Map<string, ProxyState>
	private _proxyObjectHandlerItem: TProxyObjectHandlerItemObject
	constructor(initialObject: TLocalObject, parent: Object = null!) {
		if (!isObject(initialObject)) {
			throw new Error('need object.')
		}
		const cachedProxyStore: ProxyState = globalProxyStoreCache.get(initialObject)!
		if (cachedProxyStore) {
			return cachedProxyStore
		}
		this._parent = parent || null
		this._nowVersion = markVersionHolder[0]
		this._checkVersion = markVersionHolder[1]
		this._listeners = new Set()
		this._proxyObject = null!
		this._childMap = new Map()
		this._proxyObjectHandlerItem = null!
		this.initial(initialObject)
	}

	private initial(initialObject: PlainObject): void {
		const localObject: TLocalObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject))
		this._proxyObject = new Proxy(localObject, this.createProxyHandler())
		this._proxyObjectHandlerItem = {
			data: localObject,
			createSnapshot,
			ensureVersion: this.ensureVersion.bind(this),
			addListener: this.addListener.bind(this),
			listenerRemove: null,
		}
		globalProxyStoreCache.set(initialObject, this)
		globalProxyObjectHandlerMap.set(this._proxyObject, this._proxyObjectHandlerItem)
		const ownKeys: Array<string | symbol> = Reflect.ownKeys(initialObject)
		for (let i: number = 0; i < ownKeys.length; i++) {
			const propKey: string | symbol = ownKeys[i]
			const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(initialObject, propKey)!
			if (descriptor.get || descriptor.set) {
				Object.defineProperty(localObject, propKey, descriptor)
				continue
			}
			;(this.proxyObject as any)[propKey as string] = initialObject[propKey as string]
		}
	}

	public get proxyObject() {
		return this._proxyObject
	}

	private notifyUpdate(op: Array<any>) {
		this._listeners.forEach((listener: (...args: Array<any>) => void): void => {
			listener(op)
		})
	}

	private ensureVersion(nextCheckVersion: number = ++markVersionHolder[1]): number {
		let maxNowVersion: number = this._nowVersion
		if (this._checkVersion !== nextCheckVersion) {
			this._checkVersion = nextCheckVersion
			for (let [key, childProxyStore] of this._childMap) {
				const propVersion: number = childProxyStore._proxyObjectHandlerItem.ensureVersion(nextCheckVersion)
				if (propVersion > maxNowVersion) {
					maxNowVersion = propVersion
				}
			}
		}
		return maxNowVersion
	}

	private addPropListener(propKey: string, proxyObjectHandlerItem: TProxyObjectHandlerItemObject): void {
		if (this._listeners.size) {
			const listenerRemove = proxyObjectHandlerItem.addListener((op: Array<any>): void => {
				const newOp: Array<any> = [...op]
				newOp[1] = [propKey, ...newOp[1]]
				this.notifyUpdate(newOp)
			})
			proxyObjectHandlerItem.listenerRemove = listenerRemove
		}
	}

	private removePropListener(propKey: string): void {
		if (!this._childMap.has(propKey)) {
			return
		}
		const childProxyStore: ProxyState = this._childMap.get(propKey)!
		const proxyObjectHandlerItem: TProxyObjectHandlerItemObject = childProxyStore._proxyObjectHandlerItem
		if (proxyObjectHandlerItem.listenerRemove instanceof Function) {
			proxyObjectHandlerItem.listenerRemove()
		}
		this._childMap.delete(propKey)
	}

	private addListener(listener: (...args: Array<any>) => void): () => void {
		this._listeners.add(listener)
		if (this._listeners.size === 1) {
			for (let [key, childProxyStore] of this._childMap) {
				const propProxyObjectHandlerItem: TProxyObjectHandlerItemObject = childProxyStore._proxyObjectHandlerItem
				const listenerRemove = propProxyObjectHandlerItem.addListener((op: Array<any>): void => {
					const newOp: Array<any> = [...op]
					newOp[1] = [key, ...newOp[1]]
					this.notifyUpdate(newOp)
				})
				propProxyObjectHandlerItem.listenerRemove = listenerRemove
			}
		}
		return (): void => {
			this._listeners.delete(listener)
			if (this._listeners.size <= 0) {
				for (let [key, childProxyStore] of this._childMap) {
					const propProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
					if (propProxyObjectHandlerItem.listenerRemove instanceof Function) {
						propProxyObjectHandlerItem.listenerRemove()
						propProxyObjectHandlerItem.listenerRemove = null
					}
				}
			}
		}
	}

	private createProxyHandler(): TProxyHandlerItem {
		const self: ProxyState = this
		return {
			deleteProperty(target: TLocalObject, prop: string): boolean {
				const prevValue: any = Reflect.get(target, prop)
				self.removePropListener(prop)
				const deleted: boolean = Reflect.deleteProperty(target, prop)
				if (deleted) {
					self._nowVersion = ++markVersionHolder[0]
					self.notifyUpdate([EMarkOperation.DELETE, [prop], undefined, prevValue])
				}
				return deleted
			},
			set(target: TLocalObject, prop: string, value: any, receiver: TLocalObject): boolean {
				const hasPrev: boolean = Reflect.has(target, prop)
				const oldValue: any = Reflect.get(target, prop, receiver)
				if (
					(hasPrev && oldValue === value) ||
					(globalProxyObjectCache.has(value) && Object.is(oldValue, globalProxyObjectCache.get(value)))
				) {
					return true
				}
				self.removePropListener(prop)
				let newValue: any = value
				if (value instanceof Promise) {
					value
						.then((v: PromiseFulfilledResult<any>): void => {
							;(value as any).status = EPromiseStatus.FULFILLED
							;(value as any).value = v
							self._nowVersion = ++markVersionHolder[0]
							self.notifyUpdate([EMarkOperation.RESOLVE, [prop], v, oldValue])
						})
						.catch((e: PromiseRejectionEvent): void => {
							;(value as any).status = EPromiseStatus.REJECTED
							;(value as any).reason = e
							self._nowVersion = ++markVersionHolder[0]
							self.notifyUpdate([EMarkOperation.REJECT, [prop], e, undefined])
						})
				} else {
					if (canProxy(newValue) && !globalProxyObjectHandlerMap.has(newValue)) {
						const hasExist: boolean = globalProxyStoreCache.has(newValue)
						const childProxyStore: ProxyState = new ProxyState(newValue, self)
						!hasExist && self._childMap.set(prop, childProxyStore)
						newValue = childProxyStore.proxyObject
						self.addPropListener(prop, childProxyStore._proxyObjectHandlerItem)
					}
				}
				const res: boolean = Reflect.set(target, prop, newValue, receiver)
				self._nowVersion = ++markVersionHolder[0]
				self.notifyUpdate([EMarkOperation.SET, [prop], value, oldValue])
				return res
			},
		}
	}
}
