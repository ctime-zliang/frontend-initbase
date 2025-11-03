import { TReduxStore } from '../store/public/types'

export type TCommonComponentBaseProps = {
	reduxStore: TReduxStore
	[key: string]: any
}
