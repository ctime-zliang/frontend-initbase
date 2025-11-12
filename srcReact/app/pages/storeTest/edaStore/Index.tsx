import React, { useLayoutEffect, useRef, useState } from 'react'
import { Main } from './Main'
import { createStoreInstance, MainStore, MainStoreContext } from './store/Main'

function EdaStoreRoot(props: any): React.ReactElement {
	const [store, setStore] = useState<MainStore>(null!)
	const storeRef: { current: MainStore } = useRef<MainStore>(null!)
	useLayoutEffect((): (() => void) => {
		createStoreInstance().then((storeInstacen: MainStore): void => {
			setStore(storeInstacen)
			storeRef.current = storeInstacen
			storeRef.current.whenMouned()
		})
		return (): void => {
			storeRef.current.whenUnmount()
		}
	}, [])
	if (!store) {
		return <section style={{ padding: `10px 10px` }}>store initialing...</section>
	}
	return (
		<section style={{ padding: `10px 10px` }}>
			<MainStoreContext.Provider value={store}>
				<Main />
			</MainStoreContext.Provider>
		</section>
	)
}

export const EdaStoreRootMemo = EdaStoreRoot
