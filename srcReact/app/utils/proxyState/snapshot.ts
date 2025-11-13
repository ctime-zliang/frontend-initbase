import { globalProxyObjectHandlerMap, globalSnapCache } from './profile'
import { TLocalObject, TProxyObjectHandlerItemObject } from './types'

export function createSnapshot(objectData: TLocalObject, version: number): TLocalObject {
	const snapCacheItem: [number, TLocalObject] = globalSnapCache.get(objectData)!
	if (snapCacheItem && snapCacheItem[0] === version) {
		return snapCacheItem[1]
	}
	const snapCacheData: TLocalObject = Array.isArray(objectData) ? [] : Object.create(Object.getPrototypeOf(objectData))
	globalSnapCache.set(objectData, [version, snapCacheData])
	const ownKeys: Array<string | symbol> = Reflect.ownKeys(objectData)
	for (let i: number = 0; i < ownKeys.length; i++) {
		if (Object.getOwnPropertyDescriptor(snapCacheData, ownKeys[i])) {
			continue
		}
		const value: any = Reflect.get(objectData, ownKeys[i])
		const descriptor: PropertyDescriptor = {
			value,
			enumerable: true,
			configurable: true,
		}
		if (globalProxyObjectHandlerMap.has(value)) {
			const proxyObjectHandlerItem: TProxyObjectHandlerItemObject = globalProxyObjectHandlerMap.get(value)!
			const { data, ensureVersion } = proxyObjectHandlerItem
			descriptor.value = createSnapshot(data, ensureVersion())
		}
		Object.defineProperty(snapCacheData, ownKeys[i], descriptor)
	}
	return Object.preventExtensions(snapCacheData)
}

export function subscribe(proxyObject: Object, callback: (...args: Array<any>) => void): () => void {
	const proxyObjectHandlerItem: TProxyObjectHandlerItemObject = globalProxyObjectHandlerMap.get(proxyObject)!
	const ops: Array<(...args: Array<any>) => void> = []
	let promise: Promise<any> = undefined!
	let isListenerActive: boolean = false
	const listener = (op: (...args: Array<any>) => void) => {
		ops.push(op)
		if (!promise) {
			promise = Promise.resolve().then((): void => {
				promise = undefined!
				if (isListenerActive) {
					callback(ops.splice(0))
				}
			})
		}
	}
	const removeListener: () => void = proxyObjectHandlerItem.addListener(listener)
	isListenerActive = true
	return (): void => {
		isListenerActive = false
		removeListener()
	}
}

export function snapshot(proxyObject: Object): TLocalObject {
	const proxyObjectHandlerItem: TProxyObjectHandlerItemObject = globalProxyObjectHandlerMap.get(proxyObject)!
	const { data, ensureVersion, createSnapshot } = proxyObjectHandlerItem
	return createSnapshot(data, ensureVersion())
}
