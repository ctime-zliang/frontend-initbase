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
	name: string
	number: number
	setName: (a: ((a: string) => string) | string) => void
	setNumber: (a: ((a: number) => number) | number) => void
}

export const defaultValue: TStoreState = {
	name: 'contextInitialValue',
	number: -1,
}

export const LocalContext: Context<TStore> = React.createContext(undefined as unknown as TStore)
