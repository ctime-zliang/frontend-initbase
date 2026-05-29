import React, { useContext } from 'react'
import { useProxyDependencies, useWatch } from '../../../../../store/watchStore/WatchAbstractStore'
import { MainStore, MainStoreContext } from '../../store/Main'

export function CountView(): React.ReactElement {
	console.log(`Component: CountView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const attrStore = useProxyDependencies(mainStore.attrStore)
	// useWatch(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		attrStore.count = +inputElement.value
		attrStore.whenPayamountUpdate()
	}
	return (
		<div>
			<label>CountView: </label>
			<input type="number" value={attrStore.count} onChange={inputInputAction} />
		</div>
	)
}
