import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useProxyDependencies } from '../../../../../..//store/edaStore/useProxyDependencies'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.infoStore)
	const infoStore = useProxyDependencies(mainStore.infoStore)
	return (
		<div>
			Display: {infoStore.title || '-'} | {infoStore.name || '-'} | {infoStore.age || '-'}
		</div>
	)
}
