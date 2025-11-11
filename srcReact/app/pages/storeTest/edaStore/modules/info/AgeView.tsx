import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useProxyDependencies } from '../../../../../store/edaStore/useProxyDependencies'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.age = +inputElement.value
	}
	const infoStore = useProxyDependencies(mainStore.infoStore)
	return (
		<div>
			<label>Age: </label>
			<input type="number" value={infoStore.age} onChange={inputInputAction} />
		</div>
	)
}
