import {
	EMarkOperation,
	EPromiseStatus,
	globalProxyObjectCache,
	globalProxyObjectHandlerMap,
	globalProxyStoreCache,
	markVersionHolder,
} from './config'
import { TKeyPath, TListenerHandler, TMarkOperationStructureItem, TProxyObjectHandlerItem } from './types'
import { canProxy, createSnapshot, isObject } from './utils'

export class ProxyStore {
	private parent: ProxyStore
	private _nowVersion: number
	private _checkVersion: number
	private _listeners: Set<TListenerHandler>
	private _proxyObject: PlainObject
	private _childMap: Map<string, ProxyStore>
	private _proxyObjectHandlerItem: TProxyObjectHandlerItem
	constructor(initialObject: PlainObject, parent?: ProxyStore) {
		if (!isObject(initialObject)) {
			throw new Error('need object.')
		}
		const cachedProxyStore: ProxyStore = globalProxyStoreCache.get(initialObject) as ProxyStore
		if (cachedProxyStore) {
			return cachedProxyStore
		}
		this.parent = parent || null!
		this._nowVersion = markVersionHolder[0]
		this._checkVersion = markVersionHolder[1]
		this._listeners = new Set()
		this._proxyObject = null!
		this._childMap = new Map()
		this._proxyObjectHandlerItem = null!
		this.initial(initialObject)
	}

	private initial(initialObject: PlainObject): void {
		const localObject: PlainObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject))
		const proxyObject: PlainObject = new Proxy(localObject, this.createProxyHandler())
		const proxyObjectHandlerItem: TProxyObjectHandlerItem = this.createProxyObjectHandlerItemObject(localObject)
		this._proxyObject = proxyObject
		this._proxyObjectHandlerItem = proxyObjectHandlerItem
		globalProxyStoreCache.set(initialObject, this)
		globalProxyObjectHandlerMap.set(proxyObject, proxyObjectHandlerItem)
		const ownKeys: Array<TKeyPath> = Reflect.ownKeys(initialObject)
		for (let i: number = 0; i < ownKeys.length; i++) {
			const propKey: TKeyPath = ownKeys[i]
			const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(initialObject, propKey) as PropertyDescriptor
			if (descriptor.get || descriptor.set) {
				Object.defineProperty(localObject, propKey, descriptor)
				continue
			}
			proxyObject[propKey as string] = initialObject[propKey as keyof PlainObject]
		}
	}

	public get proxyObject(): any {
		return this._proxyObject
	}

	private createProxyObjectHandlerItemObject(data: PlainObject): TProxyObjectHandlerItem {
		return {
			data,
			createSnapshot,
			ensureVersion: this.ensureVersion.bind(this),
			addListener: this.addListener.bind(this),
			listenerRemove: null!,
		}
	}

	private notifyUpdate(op: TMarkOperationStructureItem): void {
		this._listeners.forEach((listener: TListenerHandler): void => {
			listener(op)
		})
	}

	private ensureVersion(nextCheckVersion: number = ++markVersionHolder[1]): number {
		let maxNowVersion: number = this._nowVersion
		if (this._checkVersion !== nextCheckVersion) {
			this._checkVersion = nextCheckVersion
			this._childMap.forEach((childProxyStore: ProxyStore, key: string): void => {
				const propProxyObjectHandlerItem: TProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
				const propVersion: number = propProxyObjectHandlerItem.ensureVersion(nextCheckVersion)
				if (propVersion > maxNowVersion) {
					maxNowVersion = propVersion
				}
			})
		}
		return maxNowVersion
	}

	private addPropListener(propKey: string, proxyObjectHandlerItem: TProxyObjectHandlerItem): void {
		if (this._listeners.size) {
			const listenerRemove = proxyObjectHandlerItem.addListener((op: TMarkOperationStructureItem): void => {
				const newOp: TMarkOperationStructureItem = [...op]
				newOp[1] = [propKey, ...newOp[1]]
				this.notifyUpdate(newOp)
			})
			proxyObjectHandlerItem.listenerRemove = listenerRemove
			return
		}
	}

	private removePropListener(propKey: string): void {
		if (!this._childMap.has(propKey)) {
			return
		}
		const proxyObjectHandlerItem: TProxyObjectHandlerItem = (this._childMap.get(propKey) as ProxyStore)._proxyObjectHandlerItem
		if (proxyObjectHandlerItem.listenerRemove instanceof Function) {
			proxyObjectHandlerItem.listenerRemove()
		}
		this._childMap.delete(propKey)
	}

	private addListener(listener: TListenerHandler): () => void {
		this._listeners.add(listener)
		if (this._listeners.size === 1) {
			this._childMap.forEach((childProxyStore: ProxyStore, key: string): void => {
				const propProxyObjectHandlerItem: TProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
				const listenerRemove = propProxyObjectHandlerItem.addListener((op: TMarkOperationStructureItem): void => {
					const newOp: TMarkOperationStructureItem = [...op]
					newOp[1] = [key, ...newOp[1]]
					this.notifyUpdate(newOp)
				})
				propProxyObjectHandlerItem.listenerRemove = listenerRemove
			})
		}
		return (): void => {
			this._listeners.delete(listener)
			if (this._listeners.size <= 0) {
				this._childMap.forEach((childProxyStore: ProxyStore): void => {
					const propProxyObjectHandlerItem: TProxyObjectHandlerItem = childProxyStore._proxyObjectHandlerItem
					if (propProxyObjectHandlerItem.listenerRemove instanceof Function) {
						propProxyObjectHandlerItem.listenerRemove()
						propProxyObjectHandlerItem.listenerRemove = null!
					}
				})
			}
		}
	}

	private createProxyHandler(): object {
		const self = this
		return {
			deleteProperty(target: PlainObject, prop: string): boolean {
				const prevValue = Reflect.get(target, prop)
				self.removePropListener(prop)
				const deleted: boolean = Reflect.deleteProperty(target, prop)
				if (deleted) {
					self._nowVersion = ++markVersionHolder[0]
					self.notifyUpdate([EMarkOperation.DELETE, [prop], undefined, prevValue])
				}
				return deleted
			},
			set(target: PlainObject, prop: string, value: any, receiver: ProxyHandler<PlainObject>): any | boolean {
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
						.then((v: any): void => {
							;(value as any).status = EPromiseStatus.FULFILLED
							;(value as any).value = v
							self._nowVersion = ++markVersionHolder[0]
							self.notifyUpdate([EMarkOperation.RESOLVE, [prop], v, oldValue])
						})
						.catch((e: any): void => {
							;(value as any).status = EPromiseStatus.REJECTED
							;(value as any).reason = e
							self._nowVersion = ++markVersionHolder[0]
							self.notifyUpdate([EMarkOperation.REJECT, [prop], e, undefined])
						})
				} else {
					if (canProxy(newValue) && !globalProxyObjectHandlerMap.has(newValue)) {
						const hasExist: boolean = globalProxyStoreCache.has(newValue)
						const childProxyStore: ProxyStore = new ProxyStore(newValue, self)
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
