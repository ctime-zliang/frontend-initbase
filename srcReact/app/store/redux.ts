import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { TReduxStore } from './public/types'
import { createReducer as globalDefault_createReducer, initialState as globalDefault_initialState } from './globalDefault/reducer'
import { TStore as globalDefault_TStore } from './globalDefault/types'
import { moduleKey as globalDefault_moduleKey } from './globalDefault/config'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

/**
 * 创建 reducer
 *      创建由静态 reducer 和动态传入的 async-reducer 组成的 reducers 对象
 */
function createCombineReducers(asyncReducers: { [key: string]: any } = {}) {
	const o: { [key: string]: any } = {
		[globalDefault_moduleKey]: globalDefault_createReducer(),
		...asyncReducers,
	}
	return {
		combinedReducer: combineReducers(o),
		syncReducerKeys: Object.keys(o),
	}
}

/**
 * 动态注入异步 reducer
 *      在注册路由的时候注册 reducer
 */
export function modulesInjectReducer(store: TReduxStore, key: string, createAsyncReducer: Function): TReduxStore {
	const concernedStoreKeys: Array<string> = Object.keys(store.asyncReducers || {})
	if (concernedStoreKeys.includes(key)) {
		return store
	}
	store.asyncReducers[key] = createAsyncReducer()
	const ccr = createCombineReducers(store.asyncReducers)
	store.replaceReducer(ccr.combinedReducer)
	return store
}

export const configureStore = (): TReduxStore => {
	const ccr = createCombineReducers()
	const store = createStoreWithMiddleware(ccr.combinedReducer, {
		[globalDefault_moduleKey as string]: globalDefault_initialState,
	}) as TReduxStore
	/**
	 * 记录已经注册过的动态异步 reducer
	 */
	store.asyncReducers = {}
	return store
}

export type TCombineState = {
	[globalDefault_moduleKey]: globalDefault_TStore
	[key: string]: any
}
