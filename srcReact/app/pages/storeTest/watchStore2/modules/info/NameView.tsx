import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}
	const infoStore = useProxyDependencies2(mainStore.infoStore)
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
