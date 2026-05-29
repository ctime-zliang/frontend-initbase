import { Dispatch, useLayoutEffect, useReducer, useRef } from 'react'

type Key = PropertyKey

type TListener = {
	/**
	 * undefined:
	 * watch all
	 */
	keys?: Set<Key>

	render: Dispatch<number>

	version: number
}

const EMPTY_CLEANUP = (): void => {}

function isDepsEqual(prev: Set<Key>, next: Set<Key>): boolean {
	if (prev === next) {
		return true
	}

	if (prev.size !== next.size) {
		return false
	}

	for (const key of prev) {
		if (!next.has(key)) {
			return false
		}
	}

	return true
}

function createDepsKey(keys?: Set<Key>): string {
	if (!keys) {
		return '__ALL__'
	}

	return Array.from(keys)
		.map((key: Key): string => {
			if (typeof key === 'symbol') {
				return key.toString()
			}

			return String(key)
		})
		.sort()
		.join('|')
}

export abstract class WatchAbstractStore2 {
	private _version: number = 0

	/**
	 * key -> listeners
	 */
	private _keyListeners: Map<Key, Set<TListener>> = new Map()

	/**
	 * global listeners
	 */
	private _globalListeners: Set<TListener> = new Set()

	/**
	 * pending changed keys
	 */
	private _pendingKeys: Set<Key> = new Set()

	private _scheduled: boolean = false

	private _destroyed: boolean = false

	/**
	 * notify all
	 */
	protected notify(): void

	/**
	 * precise notify
	 */
	protected notify(key: Key): void

	protected notify(key?: Key): void {
		if (this._destroyed) {
			return
		}

		if (key !== undefined) {
			this._pendingKeys.add(key)
		}

		if (this._scheduled) {
			return
		}

		this._scheduled = true

		queueMicrotask((): void => {
			if (this._destroyed) {
				return
			}

			this._scheduled = false

			this._version++

			const version: number = this._version

			const pendingKeys: Set<Key> = this._pendingKeys

			this._pendingKeys = new Set()

			const notified: Set<TListener> = new Set()

			/**
			 * global listeners
			 */
			this._globalListeners.forEach((listener: TListener): void => {
				notified.add(listener)

				if (listener.version === version) {
					return
				}

				listener.version = version

				listener.render(version)
			})

			/**
			 * notify all
			 */
			if (pendingKeys.size === 0) {
				this._keyListeners.forEach((listeners: Set<TListener>): void => {
					listeners.forEach((listener: TListener): void => {
						if (notified.has(listener)) {
							return
						}

						notified.add(listener)

						if (listener.version === version) {
							return
						}

						listener.version = version

						listener.render(version)
					})
				})

				return
			}

			/**
			 * precise notify
			 */
			pendingKeys.forEach((key: Key): void => {
				const listeners: Set<TListener> | undefined = this._keyListeners.get(key)

				if (!listeners) {
					return
				}

				listeners.forEach((listener: TListener): void => {
					if (notified.has(listener)) {
						return
					}

					notified.add(listener)

					if (listener.version === version) {
						return
					}

					listener.version = version

					listener.render(version)
				})
			})
		})
	}

	public subscribe(listener: TListener): () => void {
		if (this._destroyed) {
			return EMPTY_CLEANUP
		}

		/**
		 * watch all
		 */
		if (!listener.keys) {
			this._globalListeners.add(listener)

			return (): void => {
				this._globalListeners.delete(listener)
			}
		}

		/**
		 * precise watch
		 */
		listener.keys.forEach((key: Key): void => {
			let set: Set<TListener> | undefined = this._keyListeners.get(key)

			if (!set) {
				set = new Set()

				this._keyListeners.set(key, set)
			}

			set.add(listener)
		})

		return (): void => {
			listener.keys?.forEach((key: Key): void => {
				const set: Set<TListener> | undefined = this._keyListeners.get(key)

				if (!set) {
					return
				}

				set.delete(listener)

				if (set.size === 0) {
					this._keyListeners.delete(key)
				}
			})
		}
	}

	public destroy(): void {
		if (this._destroyed) {
			return
		}

		this._destroyed = true

		this._pendingKeys.clear()

		this._keyListeners.clear()

		this._globalListeners.clear()
	}
}

export function useWatch2<T extends WatchAbstractStore2>(store: T, keys?: Set<Key>, depsVersion?: number): void {
	const [, forceUpdate] = useReducer((count: number): number => {
		return count + 1
	}, 0)

	const listenerRef = useRef<TListener>(null as never)

	if (!listenerRef.current) {
		listenerRef.current = {
			keys,
			render: forceUpdate,
			version: -1,
		}
	}

	const depsKey: string = createDepsKey(keys)

	useLayoutEffect((): (() => void) => {
		listenerRef.current.keys = keys

		return store.subscribe(listenerRef.current)
	}, [store, depsKey, depsVersion])
}

export function useProxyDependencies2<T extends WatchAbstractStore2>(store: T): T {
	/**
	 * render phase collecting deps
	 */
	const collectingDepsRef = useRef<Set<Key>>(new Set())

	/**
	 * committed deps
	 */
	const committedDepsRef = useRef<Set<Key>>(new Set())

	/**
	 * trigger re-subscribe
	 */
	const [depsVersion, updateDepsVersion] = useReducer((version: number): number => {
		return version + 1
	}, 0)

	/**
	 * reset collecting deps
	 */
	collectingDepsRef.current = new Set()

	const proxyRef = useRef<T>(null as never)

	if (!proxyRef.current) {
		proxyRef.current = new Proxy(store, {
			get(target: T, key: Key, receiver: any): any {
				collectingDepsRef.current.add(key)

				return Reflect.get(target, key, receiver)
			},
		})
	}

	/**
	 * commit deps
	 *
	 * render deps
	 * ->
	 * committed deps
	 */
	useLayoutEffect((): void => {
		const nextDeps: Set<Key> = collectingDepsRef.current

		const prevDeps: Set<Key> = committedDepsRef.current

		if (isDepsEqual(prevDeps, nextDeps)) {
			return
		}

		committedDepsRef.current = nextDeps

		/**
		 * trigger re-subscribe
		 */
		updateDepsVersion()
	})

	useWatch2(store, committedDepsRef.current, depsVersion)

	useLayoutEffect((): (() => void) => {
		return (): void => {
			collectingDepsRef.current.clear()

			committedDepsRef.current.clear()

			proxyRef.current = undefined as never
		}
	}, [])

	return proxyRef.current
}

/* =========================================
 * example
 * ========================================= */

export class CounterStore extends WatchAbstractStore2 {
	public count: number = 0

	public name: string = 'counter'

	public increment(): void {
		this.count++

		this.notify('count')
	}

	public decrement(): void {
		this.count--

		this.notify('count')
	}

	public rename(name: string): void {
		this.name = name

		this.notify('name')
	}

	public reset(): void {
		this.count = 0

		this.name = 'counter'

		/**
		 * notify all
		 */
		this.notify()
	}
}
