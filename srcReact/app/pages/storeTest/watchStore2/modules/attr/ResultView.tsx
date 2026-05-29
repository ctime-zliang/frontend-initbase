import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function ResultView(): React.ReactElement {
	console.log(`Component: ResultView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.infoStore)
	useWatch2(mainStore.attrStore)
	const infoStore = useProxyDependencies2(mainStore.infoStore)
	const attrStore = useProxyDependencies2(mainStore.attrStore)
	return (
		<div style={{ color: mainStore.attrStore.warn ? 'red' : 'black' }}>
			ResultView: {mainStore.attrStore.price * mainStore.attrStore.count} (Title: {mainStore.infoStore.title || '-'})
		</div>
	)
}
