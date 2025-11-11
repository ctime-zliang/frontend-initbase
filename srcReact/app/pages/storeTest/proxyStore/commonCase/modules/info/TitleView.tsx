import React, { useContext, useEffect } from 'react'
import { MainStoreContext, MainStore } from '../../store/Main'
import { subscribe, useSnapshot } from '../../../../../../store/proxyStore'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore = useContext(MainStoreContext)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.title = inputElement.value
	}

	useEffect((): (() => void) => {
		const handler: () => void = subscribe(mainStore, (): void => {
			console.log(`[Component: TitleView] store.title has changed:`, mainStore.infoStore.title)
		})
		return (): void => {
			handler()
		}
	}, [])

	/**
	 * 创建一份只读的快照
	 */
	const infoStore = useSnapshot(mainStore.infoStore)
	return (
		<div>
			<label>Title: </label>
			<input type="text" value={infoStore.title} onChange={inputInputAction} />
		</div>
	)
}
