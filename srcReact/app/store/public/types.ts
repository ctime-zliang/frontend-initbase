import { Store as ReduxStore } from 'redux'

export type TStoreReduxCommonAction<T> = {
	type: T
	data?: any
}

export type TReduxStoreExtend = {
	syncInitialState?: any
	asyncReducers?: any
	replaceReducer?: Function
}

export type TReduxStore = ReduxStore & TReduxStoreExtend
