import { TListenerEffectItem } from './hook'

export interface Store<S, A> {
	state: S
	actions: A
	setState(state: S, updatedCallback?: (a: Store<any, any>) => void): void
	listeners?: Array<TListenerEffectItem>
	flushListeners?: (store: TUseStore) => void
}

export type TUseStoreResult<S, A> = (() => [S, A]) &
	(<NS>(stateFunc: (state: S) => NS) => [NS, A]) &
	(<NS, NA>(stateFunc: (state: S) => NS, actionsFunc: (state: A) => NA) => [NS, NA]) &
	(<NA>(stateFunc: undefined, actionsFunc: (state: A) => NA) => [S, NA])

export type TUseStore = {
	state: any
	actions: { [key: string]: any }
	setState?: (state: any, updatedCallback?: (a: TUseStore) => void) => void
	listeners?: Array<TListenerEffectItem>
	flushListeners?: (store: TUseStore) => void
}
