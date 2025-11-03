import React, { useContext, useEffect } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { useSnapshot, subscribe } from 'valtio'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.name = inputElement.value
	}

	useEffect((): (() => void) => {
		const handler: () => void = subscribe(mainStore, (): void => {
			// console.log(`[Component: NameView] store.title has changed:`, mainStore.infoStore.title)
		})
		return (): void => {
			handler()
		}
	}, [])

	/**
	 * 创建一份只读的快照
	 */
	const infoStore = useSnapshot(mainStore.infoStore)
	// if (infoStore.title.length >= 5) {
	// 	return (
	// 		<div>
	// 			<label>Name-2: </label>
	// 			<input type="text" value={infoStore.name} onChange={inputInputAction} />
	// 		</div>
	// 	)
	// }
	return (
		<div>
			<label>Name-1: </label>
			<input type="text" value={infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
