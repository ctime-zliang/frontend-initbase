import { associateActions } from './associateActions'
import { setState } from './setState'
import { hook, TUseStoreReturnFunction, TUseStoreReturnFunctionResult, TListenerEffectItem } from './hook'
import { flushListeners } from './flushListeners'
import { FreeObject } from '../../../../types/common'
import { Store as _Store, TUseStore, TUseStoreResult } from './types'

export type Store<S, A> = _Store<S, A>

export function useDervStore<S, A>(inititalState: S, actions: object): TUseStoreResult<S, A>
export function useDervStore(initialState: FreeObject<any>, actions: FreeObject<any>): TUseStoreReturnFunction {
	const store: TUseStore = {
		state: initialState,
		actions: {},
		listeners: [],
		setState: undefined,
		flushListeners: undefined,
	}
	store.setState = (state: FreeObject<any>, updatedCallback?: (a: TUseStore) => void): void => {
		return setState(store, state, updatedCallback)
	}
	store.flushListeners = (): void => {
		return flushListeners(store)
	}
	store.actions = associateActions(store, actions)
	return (): TUseStoreReturnFunctionResult => {
		return hook(store)
	}
}

export default useDervStore
