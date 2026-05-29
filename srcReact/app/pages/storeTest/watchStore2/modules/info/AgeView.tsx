import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.age = +inputElement.value
	}
	const infoStore = useProxyDependencies2(mainStore.infoStore)
	return (
		<div>
			<label>AgeView: </label>
			<input type="number" value={mainStore.infoStore.age} onChange={inputInputAction} />
		</div>
	)
}
