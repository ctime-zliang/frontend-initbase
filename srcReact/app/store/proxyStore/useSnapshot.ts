import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import { snapshot, subscribe } from './utils'
import type { TKeyPath, TSnapshot } from './types'
import { isChanged } from './proxyCompare'

export function useSnapshot<T extends object>(proxyObject: T): PlainObject {
	const lastSnapshot = useRef<TSnapshot<T>>()
	const lastAffected = useRef<WeakMap<object, Set<TKeyPath>>>(new WeakMap())
	let inRender: boolean = true
	const currSnapshot: PlainObject = useSyncExternalStore(
		useCallback(
			(callback: () => void): (() => void) => {
				const unsub = subscribe(proxyObject, (): void => {
					callback()
				})
				callback()
				return unsub
			},
			[proxyObject]
		),
		(): PlainObject => {
			const nextSnapshot = snapshot(proxyObject)
			if (!inRender && lastSnapshot.current && lastAffected.current && !isChanged(lastSnapshot.current, nextSnapshot, lastAffected.current)) {
				// console.log(`unchang.`)
				return lastSnapshot.current
			}
			// console.log(`changed.`)
			return nextSnapshot
		},
		(): PlainObject => {
			return snapshot(proxyObject)
		}
	)
	inRender = false
	const currAffected = new WeakMap()
	useEffect((): void => {
		lastSnapshot.current = currSnapshot as any
		lastAffected.current = currAffected as any
	})
	return new Proxy(currSnapshot, {
		get(target: PlainObject, key: TKeyPath): any {
			const oldSet: Set<TKeyPath> = currAffected.get(target) || new Set()
			oldSet.add(key)
			currAffected.set(target, oldSet)
			return Reflect.get(target, key)
		},
		has(target: PlainObject, key: TKeyPath): boolean {
			return Reflect.has(target, key)
		},
		getOwnPropertyDescriptor(target: PlainObject, key: TKeyPath): PropertyDescriptor {
			return Reflect.getOwnPropertyDescriptor(target, key) as PropertyDescriptor
		},
		ownKeys(target: PlainObject): Array<TKeyPath> {
			return Reflect.ownKeys(target)
		},
	})
}
