import React, { useContext } from 'react'
import { useProxyDependencies, useWatch } from '../../../../../store/watchStore/WatchAbstractStore'
import { MainStore, MainStoreContext } from '../../store/Main'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.infoStore)
	// useWatch(mainStore.attrStore)
	const infoStore = useProxyDependencies(mainStore.infoStore)
	const attrStore = useProxyDependencies(mainStore.attrStore)
	return (
		<div style={{ color: attrStore.warn ? 'red' : 'black' }}>
			ResultView: {attrStore.price * attrStore.count} (Title: {infoStore.title || '-'})
		</div>
	)
}
