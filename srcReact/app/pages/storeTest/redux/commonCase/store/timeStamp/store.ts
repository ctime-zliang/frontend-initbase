import { TStore } from './types'

export const createInitialState = (): TStore => {
	return {
		stamp: -1,
		isLoading: false,
	}
}
