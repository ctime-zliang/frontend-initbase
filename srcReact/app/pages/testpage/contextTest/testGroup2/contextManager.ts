import React, { Context } from 'react'

export type TStoreAction<T> = {
	type: T
	data?: any
}

export type TStoreState = {
	name: string
	number: number
}

export type TStore = {
	state: TStoreState
	dispatch: (action: TStoreAction<any>) => void
}

export const defaultValue: TStoreState = {
	name: 'contextInitialValue',
	number: -1,
}

export const LocalContext: Context<TStore> = React.createContext(undefined as unknown as TStore)

export const contextReducer = (state: TStoreState, action: TStoreAction<any>): TStoreState => {
	switch (action.type) {
		case 'INCREASE_NUMBER': {
			const copyState: TStoreState = JSON.parse(JSON.stringify(state))
			copyState.number += 1
			return copyState
		}
		default: {
			return JSON.parse(JSON.stringify(state))
		}
	}
}
