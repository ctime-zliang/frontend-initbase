import { useLayoutEffect, useState } from 'react'
import { EdaAbstractStore, TTriggerItemCallback } from './EdaAbstractStore'

export function useWatch<T extends EdaAbstractStore>(store: T, callback?: TTriggerItemCallback): void {
	const [, setState] = useState<number>(0)
	useLayoutEffect(store.createEffect(setState, callback))
}
