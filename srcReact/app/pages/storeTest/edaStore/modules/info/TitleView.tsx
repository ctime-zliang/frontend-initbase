import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useProxyDependencies } from '../../../../../store/edaStore/useProxyDependencies'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.title = inputElement.value
	}
	const infoStore = useProxyDependencies(mainStore.infoStore)
	return (
		<div>
			<label>Title: </label>
			<input type="text" value={infoStore.title} onChange={inputInputAction} />
		</div>
	)
}
