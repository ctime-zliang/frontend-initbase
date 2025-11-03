import React, { useContext } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.price = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	/**
	 * 创建一份只读的快照
	 */
	const attrStore = useSnapshot(mainStore.attrStore)
	return (
		<div>
			<label>Price: </label>
			<input type="number" value={attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
