import React, { useContext } from 'react'
import { useAtom } from 'jotai'
import { AtomStoreContext, TMixinStoreMap } from '../../store/Main'
import { INFO_STORE_NAME, TInfoStore } from '../../store/Info'

export function NameView(): React.ReactElement {
	console.log(`Component: NameView`)
	const atomStore: TMixinStoreMap = useContext(AtomStoreContext)
	const [valStore, setStore] = useAtom(atomStore.get(INFO_STORE_NAME))
	const infoStore: TInfoStore = valStore as TInfoStore
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		setStore((prevInfoStore: TInfoStore): TInfoStore => {
			prevInfoStore.name = inputElement.value
			return { ...prevInfoStore }
		})
	}
	return (
		<div>
			<label>Name: </label>
			<input type="text" value={infoStore.name} onChange={inputInputAction} />
		</div>
	)
}
