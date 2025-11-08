// index.ts 文件

import { configureStore } from '@reduxjs/toolkit'
import { globalReducer } from './global/slice'
import { EStoreModuleKey } from './public/config'

export const reduxStore = configureStore({
	reducer: {
		[EStoreModuleKey.global]: globalReducer,
	},
})
