import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useProxyDependencies } from '../../../../../../store/edaStore/useProxyDependencies'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.infoStore)
	// useWatch(mainStore.attrStore)
	const infoStore = useProxyDependencies(mainStore.infoStore)
	const attrStore = useProxyDependencies(mainStore.attrStore)
	return (
		<div style={{ color: attrStore.warn ? 'red' : 'black' }}>
			Result: {attrStore.price * attrStore.count} (Title: {infoStore.title || '-'})
		</div>
	)
}
