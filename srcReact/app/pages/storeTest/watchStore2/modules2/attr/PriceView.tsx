import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	const attrStore = useProxyDependencies2(mainStore.attrStore)
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
