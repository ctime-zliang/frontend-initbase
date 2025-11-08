import { createSelector } from 'reselect'
import { EStoreModuleKey } from '../public/config'
import { TCombineStore } from '../public/types'
import { TStore } from './store'

export const getLanguageSetting = createSelector(
	[
		(state: TCombineStore): TStore => {
			return state[EStoreModuleKey.global]
		},
	],
	(profile: TStore): string => {
		return profile.g_languageSetting
	}
)
