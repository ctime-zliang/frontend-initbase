import { useEffect, useRef } from 'react'
import { EdaAbstractStore } from './EdaAbstractStore'
import { useWatch } from './useWatch'

function getValues<T extends EdaAbstractStore>(storeInstance: T, keys: Array<keyof T>): Array<any> {
	const oldValues: Array<any> = keys.map((key: keyof T): any => {
		return storeInstance[key]
	})
	return oldValues
}

function getKeys<T extends EdaAbstractStore>(affected: Map<object, Set<keyof EdaAbstractStore>>): Array<keyof EdaAbstractStore> {
	let keys: Array<keyof EdaAbstractStore> = []
	affected.forEach((item: Set<keyof EdaAbstractStore>): void => {
		const paths: Array<keyof EdaAbstractStore> = Array.from(item)
		keys = [...paths, ...keys]
	})
	return keys
}

export function useProxyDependencies<T extends EdaAbstractStore>(storeInstance: T): T {
	const affected = useRef<Map<object, Set<keyof EdaAbstractStore>>>(new Map())
	const deps = useRef<Array<keyof EdaAbstractStore>>([])
	const preValues = useRef<Array<any>>([])
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
			affected.current.clear()
		}
	}, [])
	return new Proxy(storeInstance, {
		get(target: EdaAbstractStore, key: keyof EdaAbstractStore): any {
			const oldSet: Set<keyof EdaAbstractStore> = affected.current.get(target) || new Set()
			oldSet.add(key)
			affected.current.set(target, oldSet)
			return Reflect.get(target, key)
		},
	}) as T
}

const a = new Proxy({}, {})
