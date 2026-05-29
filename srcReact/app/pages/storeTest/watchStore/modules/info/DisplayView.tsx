import React, { useContext } from 'react'
import { useProxyDependencies, useWatch } from '../../../../../store/watchStore/WatchAbstractStore'
import { MainStore, MainStoreContext } from '../../store/Main'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
	const infoStore = useProxyDependencies(mainStore.infoStore)
	return (
		<div>
			DisplayView: {mainStore.infoStore.title || '-'} | {mainStore.infoStore.name || '-'} | {mainStore.infoStore.age || '-'}
		</div>
	)
}
