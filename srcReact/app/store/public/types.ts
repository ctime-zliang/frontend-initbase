import { EStoreModuleKey } from './config'
import { TStore as TGloablStore } from '../global/store'

export type TCombineStore = {
	[EStoreModuleKey.global]: TGloablStore
}

export type TReduxToolkitActionCommonResult<T> = {
	payload: T
	type: string
}
