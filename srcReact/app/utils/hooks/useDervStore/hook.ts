import React from 'react'
import { FreeObject } from '../../../../types/common'
import { TUseStore } from './types'

export type TUseStoreReturnFunction = (mapState?: any, mapActions?: any) => TUseStoreReturnFunctionResult
export type TUseStoreReturnFunctionResult = [any, { [key: string]: any }]
export type TListenerEffectItem = {
	state: any
	run?: (a: any) => any
}

function createEffectHandler(
	store: TUseStore,
	oldState: FreeObject<any>,
	originalHook: (v: FreeObject<any>) => void | ((v: FreeObject<any>) => FreeObject<any>)
): () => void {
	const newListenerItem: TListenerEffectItem = {
		state: oldState,
		run: originalHook,
	}
	if (store.listeners) {
		store.listeners.push(newListenerItem)
	}
	return (): void => {
		store.listeners = (store.listeners as Array<TListenerEffectItem>).filter((item: TListenerEffectItem): boolean => {
			return item !== newListenerItem
		})
	}
}

export function hook(store: TUseStore): TUseStoreReturnFunctionResult {
	const state: FreeObject<any> = store.state
	const actions: { [key: string]: any } = store.actions
	const [, originalHook] = React.useState(state)
	React.useEffect((): (() => void) => {
		return createEffectHandler(store, state, originalHook)
	}, [])
	return [state, actions]
}
