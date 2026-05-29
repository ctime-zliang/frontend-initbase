import React, { useContext } from 'react'
import { useProxyDependencies2, useWatch2 } from '../../../../../store/watchStore2/WatchAbstractStore2'
import { MainStore2, MainStoreContext2 } from '../../store/Main'

export function TitleView(): React.ReactElement {
	console.log(`Component: TitleView`)
	const mainStore: MainStore2 = useContext(MainStoreContext2)
	// useWatch(mainStore.infoStore)
	const infoStore = useProxyDependencies2(mainStore.infoStore)
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		infoStore.title = inputElement.value
	}
	return (
		<div>
			<label>TitleView: </label>
			<input type="text" value={infoStore.title} onChange={inputInputAction} />
		</div>
	)
}
