import { EdaAbstractStore } from './EdaAbstractStore'
import { useWatch } from './useWatch'

export function usePartialStore<T extends EdaAbstractStore>(store: T, keys: Array<keyof T>): void {
	const oldValues: Array<any> = keys.map((key: keyof T): any => {
		return store[key]
	})
	useWatch(store, (): boolean => {
		for (let i: number = 0; i < keys.length; i++) {
			const newValue: any = store[keys[i]]
			if (!Object.is(oldValues[i], newValue)) {
				return true
			}
		}
		return false
	})
}
