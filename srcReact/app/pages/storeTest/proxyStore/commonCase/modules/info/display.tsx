import React, { useContext } from 'react'
import { subscribe, useSnapshot } from '../../../../../../store/proxyStore'
import { MainStoreContext, MainStore } from '../../store/Main'

export function DisplayView(): React.ReactElement {
	console.log(`Component: DisplayView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	/**
	 * 创建一份只读的快照
	 */
	const infoStore = useSnapshot(mainStore.infoStore)
	return (
		<div>
			Display: {infoStore.title || '-'} | {infoStore.name || '-'} | {infoStore.age || '-'}
		</div>
	)
}
