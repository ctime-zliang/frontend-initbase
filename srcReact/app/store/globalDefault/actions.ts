import { ACTION_TYPE } from './types'
import { TStoreReduxCommonAction } from '../public/types'
import { TCombineState } from '../redux'

/**
 * 同一个 action 的两种写法
 *      1. 直接返回 action-type
 *      2. 调用函数处理并在函数中派发 action-type
 */
// export const changeLanguageSettingAction = (params: any): TStoreReduxCommonAction<string> => {
// 	console.log(params)
// 	return {
// 		type: counter_ACTION_TYPE.MODIFY_GLOABL_LANG,
// 		data: { languageSetting: a === 'zh_cn' ? 'en_us' : 'zh_cn' },
// 	}
// }
export const changeLanguageSettingAction = (params: any): ((dispatch: (a: TStoreReduxCommonAction<string>) => void, getState: () => any) => void) => {
	return async (dispatch: (a: TStoreReduxCommonAction<string>) => void, getState: () => any): Promise<void> => {
		const oldState: TCombineState = getState()
		const oldLanguageSetting = oldState.globalDefault.g_languageSetting
		console.log(params)
		dispatch({
			type: ACTION_TYPE.MODIFY_GLOABL_LANG,
			data: { languageSetting: oldLanguageSetting === 'zh_cn' ? 'en_us' : 'zh_cn' },
		})
	}
}
