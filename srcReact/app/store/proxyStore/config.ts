import { ProxyStore } from './Proxy'
import { TProxyObjectHandlerItem, TSnapCacheItem } from './types'

export const markVersionHolder: [number, number] = [1, 1]

export const globalProxyStoreCache: WeakMap<PlainObject, ProxyStore> = new WeakMap()
export const globalProxyObjectCache: WeakMap<PlainObject, PlainObject> = new WeakMap()
export const globalProxyObjectHandlerMap: WeakMap<object, TProxyObjectHandlerItem> = new WeakMap()
export const globalSnapCache: WeakMap<object, TSnapCacheItem> = new WeakMap()

export enum EMarkOperation {
	SET = 'SET',
	GET = 'GET',
	DELETE = 'DELETE',
	RESOLVE = 'RESOLVE',
	REJECT = 'REJECT',
}

export enum EPromiseStatus {
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}
