import { EMarkOperation } from './config'

export type TKeyPath = string | symbol
export type TListenerHandler = (op: TMarkOperationStructureItem) => void

export type TProxyObjectHandlerItem = {
	data: PlainObject
	ensureVersion: (nextCheckVersion?: number) => number
	createSnapshot: (target: PlainObject, version: number) => PlainObject
	addListener: (listener: TListenerHandler) => () => void
	listenerRemove: () => void
}

export type TSnapCacheItem = [number, PlainObject]

export type TMarkOperationStructureItem = [EMarkOperation, Array<string>, any, any]

type TAnyFunction = (...args: any[]) => any
type TPrimitive = string | number | boolean | null | undefined | symbol | bigint
type TSnapshotIgnore = Date | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any> | Error | RegExp | TAnyFunction | TPrimitive

export type TSnapshot<T> = T extends TSnapshotIgnore
	? T
	: T extends Promise<unknown>
	? Awaited<T>
	: T extends object
	? { readonly [K in keyof T]: TSnapshot<T[K]> }
	: T
