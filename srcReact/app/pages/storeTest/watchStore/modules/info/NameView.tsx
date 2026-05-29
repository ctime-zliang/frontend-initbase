import React, { useContext } from 'react'
import { useProxyDependencies, useWatch } from '../../../../../store/watchStore/WatchAbstractStore'
import { MainStore, MainStoreContext } from '../../store/Main'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}
	const infoStore = useProxyDependencies(mainStore.infoStore)
	if (mainStore.infoStore.title.length >= 5) {
		return (
			<div>
				<label>NameView-2: </label>
				<input type="text" value={mainStore.infoStore.name} onChange={inputInputAction} />
			</div>
		)
	}
	return (
		<div>
			<label>NameView-1: </label>
			<input type="text" value={mainStore.infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
