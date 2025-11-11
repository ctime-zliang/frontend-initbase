import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useProxyDependencies } from '../../../../../store/edaStore/useProxyDependencies'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}
	const infoStore = useProxyDependencies(mainStore.infoStore)
	if (infoStore.title.length >= 5) {
		return (
			<div>
				<label>Name-2: </label>
				<input type="text" value={infoStore.name} onChange={inputInputAction} />
			</div>
		)
	}
	return (
		<div>
			<label>Name-1: </label>
			<input type="text" value={infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
