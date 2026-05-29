import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function CountView(): React.ReactElement {
	console.log(`Component: CountView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.attrStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.attrStore.count = +inputElement.value
		mainStore.attrStore.whenPayamountUpdate()
	}
	const attrStore = useProxyDependencies2(mainStore.attrStore)
	return (
		<div>
			<label>CountView: </label>
			<input type="number" value={mainStore.attrStore.count} onChange={inputInputAction} />
		</div>
	)
}
