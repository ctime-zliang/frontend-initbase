import { createSlice } from '@reduxjs/toolkit'
import { createInitialState, TStore } from './store'
import { EStoreModuleKey } from '../public/config'

export const globalSlice = createSlice({
	name: EStoreModuleKey.global,
	initialState: createInitialState(),
	reducers: {
		changeLanguageSettingAction(state: TStore): void {
			state.g_languageSetting = state.g_languageSetting === 'zh_cn' ? 'en_us' : 'zh_cn'
		},
	},
})
export const { changeLanguageSettingAction } = globalSlice.actions

export const globalReducer = globalSlice.reducer
