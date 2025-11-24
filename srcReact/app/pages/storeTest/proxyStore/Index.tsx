import React, { useLayoutEffect, useRef, useState } from 'react'
import { proxyStoreTest1 } from './public/test1'
import { proxyStoreTest2 } from './public/test2'
import { Main } from './Main'
import { TestInput } from './modules/TestInput'
import { createStoreInstance, MainStore, MainStoreContext } from './store/Main'
import { Helmet } from 'react-helmet-async'

function ProxyStoreRoot(): React.ReactElement {
	const MODULE_NAME: string = `ProxyStore`
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
				<TestInput />
				<MainStoreContext.Provider value={store}>
					<Main />
				</MainStoreContext.Provider>
			</section>
		</>
	)
}

// proxyStoreTest1()
// proxyStoreTest2()

export const ProxyStoreRootMemo = React.memo(ProxyStoreRoot)
