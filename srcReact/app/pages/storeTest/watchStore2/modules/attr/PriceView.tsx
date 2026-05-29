import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.price = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	const attrStore = useProxyDependencies2(mainStore.attrStore)
	return (
		<div>
			<label>PriceView: </label>
			<input type="number" value={mainStore.attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
