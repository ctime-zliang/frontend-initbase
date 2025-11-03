import { TStoreReduxCommonAction } from '../../../../../../store/public/types'
import { moduleKey } from './config'
import { createInitialState } from './store'
import { ACTION_TYPE, TStore } from './types'

const actionTypeReducers: { [key: string]: (state: TStore, actionData: any) => TStore } = {
	[ACTION_TYPE.CHANGE_STAMP]: (state: TStore, actionData: any): TStore => {
		const newState: TStore = JSON.parse(JSON.stringify(state))
		newState.stamp = actionData.stamp
		return newState
	},
	[ACTION_TYPE.SETTING_BTN_LOADIG]: (state: TStore, actionData: any): TStore => {
		const newState: TStore = JSON.parse(JSON.stringify(state))
		newState.isLoading = !!actionData.isLoading
		return newState
	},
}

export const initialState: TStore = createInitialState()

export const createReducer = (initState: TStore = initialState) => {
	return (state: TStore = initState, actions: TStoreReduxCommonAction<ACTION_TYPE>): TStore => {
		const func: any = actionTypeReducers[actions.type]
		if (func) {
			return func(state, actions.data)
		}
		return state
	}
}
