import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	useWatch2(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		mainStore.infoStore.title = inputElement.value
	}
	const infoStore = useProxyDependencies2(mainStore.infoStore)
	return (
		<div>
			<label>TitleView: </label>
			<input type="text" value={mainStore.infoStore.title} onChange={inputInputAction} />
		</div>
	)
}
