import React, { useContext } from 'react'
import { MainStore, MainStoreContext } from '../../store/Main'
import { useProxyDependencies } from '../../../../../../store/edaStore/useProxyDependencies'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	// useWatch(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.price = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	const attrStore = useProxyDependencies(mainStore.attrStore)
	return (
		<div>
			<label>Price: </label>
			<input type="number" value={attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
