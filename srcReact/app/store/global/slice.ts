import { createSlice } from '@reduxjs/toolkit'
import { createInitialState, TStore } from './store'
import { EStoreModuleKey } from '../public/config'
import { ELanguageSetting } from '../../i18n/I18nProvider'

export const globalSlice = createSlice({
	name: EStoreModuleKey.global,
	initialState: createInitialState(),
	reducers: {
		changeLanguageSettingAction(state: TStore): void {
			state.g_languageSetting = state.g_languageSetting === ELanguageSetting.ZHCN ? ELanguageSetting.ENUS : ELanguageSetting.ZHCN
		},
	},
})
export const { changeLanguageSettingAction } = globalSlice.actions

export const globalReducer = globalSlice.reducer
