import React, { useLayoutEffect, useRef, useState } from 'react'
import { Main } from './Main'
import { createStoreInstance, MainStore, MainStoreContext } from './store/Main'
import { Helmet } from 'react-helmet-async'

function EdaStoreRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `EdaAbstractStore`
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
		return (
			<>
				<Helmet>
					<title>{MODULE_NAME}</title>
				</Helmet>
				<section style={{ padding: `10px 10px`, position: 'relative' }}>
					<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
					<section style={{ padding: `10px 10px`, position: 'relative' }}>store initialing...</section>
				</section>
			</>
		)
	}
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<MainStoreContext.Provider value={store}>
					<Main />
				</MainStoreContext.Provider>
			</section>
		</>
	)
}

export const EdaStoreRootMemo = EdaStoreRoot
