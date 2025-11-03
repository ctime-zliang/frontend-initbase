import React, { useContext } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { useSnapshot } from 'valtio'

export function AgeView(): React.ReactElement {
	console.log(`Component: AgeView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.age = +inputElement.value
	}
	/**
	 * 创建一份只读的快照
	 */
	const infoStore = useSnapshot(mainStore.infoStore)
	return (
		<div>
			<label>Age: </label>
			<input type="number" value={infoStore.age} onChange={inputInputAction} />
		</div>
	)
}
