import { createSelector } from 'reselect'
import { TCombineState } from '../redux'
import { moduleKey } from './config'
import { TStore } from './types'

export const getLanguageSetting = createSelector(
	[
		(state: TCombineState): TStore => {
			return state[moduleKey] as TStore
		},
	],
	(profile: TStore): string => {
		return profile.g_languageSetting
	}
)
