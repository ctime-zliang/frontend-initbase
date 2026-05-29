import React, { useContext } from 'react'
import { useProxyDependencies, useWatch } from '../../../../../store/watchStore/WatchAbstractStore'
import { MainStore, MainStoreContext } from '../../store/Main'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const attrStore = useProxyDependencies(mainStore.attrStore)
	// useWatch(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		attrStore.price = +inputElement.value
		attrStore.whenPayamountUpdate()
	}
	return (
		<div>
			<label>PriceView: </label>
			<input type="number" value={attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
