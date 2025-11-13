export type TProxyObjectHandlerItemObject = {
	data: any
	createSnapshot: (objectData: Object, version: number) => TLocalObject
	ensureVersion: (nextCheckVersion?: number) => number
	addListener: (listener: (...args: Array<any>) => void) => () => void
	listenerRemove: any
}

export type TProxyHandlerItem = {
	deleteProperty: (target: TLocalObject, prop: string) => boolean
	set: (target: TLocalObject, prop: string, value: any, receiver: TLocalObject) => boolean
}

export type TLocalObject = PlainObject | Array<any>
