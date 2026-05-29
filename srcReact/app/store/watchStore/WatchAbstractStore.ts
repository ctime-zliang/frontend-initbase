import { Dispatch, useEffect, useLayoutEffect, useRef, useState } from 'react'

function getValues<T extends WatchAbstractStore>(storeInstance: T, keys: Array<keyof T>): Array<any> {
	const oldValues: Array<any> = keys.map((key: keyof T): any => {
		return storeInstance[key]
	})
	return oldValues
}

function getKeys<T extends WatchAbstractStore>(affected: Map<object, Set<keyof T>>): Array<keyof T> {
	let keys: Array<keyof T> = []
	for (let [key, item] of affected) {
		const paths: Array<keyof T> = Array.from(item)
		keys = ([] as Array<keyof T>).concat(paths, keys)
	}
	return keys
}

export type TTriggerItemCallback = () => boolean

export type TTriggerItem = {
	setState: Dispatch<number>
	callback?: TTriggerItemCallback
}

export abstract class WatchAbstractStore {
	private _ticket: number
	private _indexCount: number
	private _triggerMap: Map<number, TTriggerItem>
	private _scheduled: boolean
	constructor() {
		this._ticket = 0
		this._indexCount = 0
		this._triggerMap = new Map()
		this._scheduled = false
	}

	protected notify(): void {
		if (this._scheduled) {
			return
		}
		this._scheduled = true
		Promise.resolve().then((): void => {
			++this._ticket
			for (let [key, trigger] of this._triggerMap) {
				if (trigger.callback) {
					const result: boolean = trigger.callback()
					if (result) {
						trigger.setState(this._ticket)
					}
					continue
				}
				trigger.setState(this._ticket)
			}
			this._scheduled = false
		})
	}

	public createEffect(setState: Dispatch<number>, callback?: TTriggerItemCallback): () => () => void {
		const idx: number = ++this._indexCount
		return (): (() => void) => {
			this._triggerMap.set(idx, { setState, callback })
			return (): void => {
				console.log(`[WatchAbstractStore -> createEffect]: unmount idx: ${idx}`)
				this._triggerMap.delete(idx)
			}
		}
	}
}

export function useWatch<T extends WatchAbstractStore>(store: T, callback?: TTriggerItemCallback): void {
	const [, setState] = useState<number>(0)
	const callbackRef = useRef<TTriggerItemCallback | undefined>(callback)
	callbackRef.current = callback
	useLayoutEffect((): (() => void) => {
		return store.createEffect(setState, (): boolean => {
			return callbackRef.current ? callbackRef.current() : true
		})()
	}, [store])
}

export function useProxyDependencies<T extends WatchAbstractStore>(storeInstance: T): T {
	const affected: { current: Map<object, Set<keyof T>> } = useRef<Map<object, Set<keyof T>>>(new Map())
	const deps = useRef<Array<keyof T>>([])
	const preValues: { current: Array<any> } = useRef<Array<any>>([])
	const proxyStoreInstanceRef: { current: any } = useRef<T>(null!)
	if (!proxyStoreInstanceRef.current) {
		proxyStoreInstanceRef.current = new Proxy(storeInstance, {
			get(target: WatchAbstractStore, key: keyof WatchAbstractStore): any {
				const oldSet: Set<keyof T> = affected.current.get(target)! || new Set()
				oldSet.add(key)
				affected.current.set(target, oldSet)
				return Reflect.get(target, key)
			},
		})
	}
	useWatch(storeInstance, (): boolean => {
		for (let i: number = 0; i < deps.current.length; i++) {
			const newValue: any = storeInstance[deps.current[i]]
			if (!Object.is(preValues.current[i], newValue)) {
				return true
			}
		}
		return false
	})
	useEffect((): void => {
		deps.current = getKeys(affected.current)
		preValues.current = getValues(storeInstance, deps.current)
	})
	useEffect((): (() => void) => {
		return (): void => {
			console.log(`[WatchAbstractStore -> useProxyDependencies]: unmount`)
			affected.current.clear()
		}
	}, [])
	return proxyStoreInstanceRef.current
}
