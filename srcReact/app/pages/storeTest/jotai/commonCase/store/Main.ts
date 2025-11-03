import { createContext } from 'react'
import { atom } from 'jotai'
import { attrStore, ATTR_STORE_NAME, TAttrStore } from './Attr'
import { infoStore, INFO_STORE_NAME, TInfoStore } from './Info'

export type TAtomResult<T> = {
	init: TAttrStore | TInfoStore
} & any

export type TMixinStoreMap = {
	[key: string]: TAtomResult<TAttrStore | TInfoStore>
}

export async function createStoreInstance(): Promise<TMixinStoreMap> {
	const atomInstanceMap: Map<string, any> = new Map()
	atomInstanceMap.set(INFO_STORE_NAME, atom({ ...infoStore }))
	atomInstanceMap.set(ATTR_STORE_NAME, atom({ ...attrStore }))
	return atomInstanceMap
}

export const AtomStoreContext = createContext<TMixinStoreMap>(null!)
