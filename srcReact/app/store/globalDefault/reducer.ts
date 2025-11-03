import { TStoreReduxCommonAction } from '../public/types'
import { moduleKey } from './config'
import { createInitialState } from './store'
import { ACTION_TYPE, TStore } from './types'

const actionTypeReducers: { [key: string]: (state: TStore, actionData: any) => TStore } = {
	[ACTION_TYPE.MODIFY_GLOABL_LANG]: (state: TStore, actionData: any): TStore => {
		const newState: TStore = JSON.parse(JSON.stringify(state))
		newState.g_languageSetting = actionData.languageSetting
		return newState
	},
}

export const initialState: TStore = createInitialState()

/**
 * const reducer = (state: TStore, actions: TStoreReduxCommonAction<ACTION_TYPE>): TStore => {
 *      ...
 * }
 *
 * reducr 实际上是将被调用时传入的 type 与预定义的 type-map 做匹配, 并获取匹配出的 handler 的结果并返回
 *      如果 handler 是一个直接的对象, 则直接返回该对象
 *      如果 handler 是一个函数, 则运行该函数并返回该函数返回的对象
 */
export const createReducer = (initState: TStore = initialState) => {
	return (state: TStore = initState, actions: TStoreReduxCommonAction<ACTION_TYPE>): TStore => {
		const func: any = actionTypeReducers[actions.type]
		if (func) {
			return func(state, actions.data)
		}
		return state
	}
}
