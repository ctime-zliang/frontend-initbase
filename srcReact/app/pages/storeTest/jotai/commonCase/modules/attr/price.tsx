import React, { useContext } from 'react'
import { useAtom } from 'jotai'
import { AtomStoreContext, TMixinStoreMap } from '../../store/Main'
import { ATTR_STORE_NAME, TAttrStore, whenStoreCountUpdate } from '../../store/Attr'

export function PriceView(): React.ReactElement {
	console.log(`Component: PriceView`)
	const atomStore: TMixinStoreMap = useContext(AtomStoreContext)
	const [valStore, setStore] = useAtom(atomStore.get(ATTR_STORE_NAME))
	const attrStore: TAttrStore = valStore as TAttrStore
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		setStore((prevAttrStore: TAttrStore): TAttrStore => {
			return whenStoreCountUpdate(prevAttrStore, +inputElement.value)
		})
	}
	return (
		<div>
			<label>Price: </label>
			<input type="number" value={attrStore.price} onChange={inputInputAction} />
		</div>
	)
}
