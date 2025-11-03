import { createSelector } from 'reselect'
import { TCombineState } from '../redux'
import { moduleKey } from './config'
import { TStore } from './types'

const profile = (state: TCombineState): TStore => {
	return state[moduleKey] as TStore
}

export const getLanguageSetting = createSelector([profile], (profile: TStore): string => {
	return profile.g_languageSetting
})
