import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	// useWatch(mainStore.infoStore)
	const infoStore = useProxyDependencies2(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		infoStore.age = +inputElement.value
	}
	return (
		<div>
			<label>AgeView: </label>
			<input type="number" value={infoStore.age} onChange={inputInputAction} />
		</div>
	)
}
