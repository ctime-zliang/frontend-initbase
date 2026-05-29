import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.infoStore)
	const infoStore = useProxyDependencies2(mainStore.infoStore)
	return (
		<div>
			DisplayView: {mainStore.infoStore.title || '-'} | {mainStore.infoStore.name || '-'} | {mainStore.infoStore.age || '-'}
		</div>
	)
}
