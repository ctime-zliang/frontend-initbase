import React, { useContext } from 'react'
import { useProxyDependencies, useWatch } from '../../../../../store/watchStore/WatchAbstractStore'
import { MainStore, MainStoreContext } from '../../store/Main'

export function CountView(): React.ReactElement {
	console.log(`Component: CountView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	useWatch(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.count = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	const attrStore = useProxyDependencies(mainStore.attrStore)
	return (
		<div>
			<label>CountView: </label>
			<input type="number" value={mainStore.attrStore.count} onChange={inputInputAction} />
		</div>
	)
}
