import { ProxyState } from './ProxyState'
import { TLocalObject, TProxyObjectHandlerItemObject } from './types'

export const markVersionHolder: [number, number] = [1, 1]

export const globalProxyStoreCache: WeakMap<Object, ProxyState> = new WeakMap()
export const globalProxyObjectCache: WeakMap<Object, any> = new WeakMap()
export const globalProxyObjectHandlerMap: WeakMap<Object, TProxyObjectHandlerItemObject> = new WeakMap()
export const globalSnapCache: WeakMap<Object, [number, TLocalObject]> = new WeakMap()

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
