import React, { useLayoutEffect, useRef, useState } from 'react'
import { proxyStoreTest1, valitoStoreTest1 } from '../public/test1'
import { proxyStoreTest2 } from '../public/test2'
import { Main } from './main'
import { TestInput } from './modules/testInput'
import { createStoreInstance, MainStore, MainStoreContext } from './store/Main'

function ProxyStoreRoot(): React.ReactElement {
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
		return <section>store initialing...</section>
	}
	return (
		<section>
			<TestInput />
			<MainStoreContext.Provider value={store}>
				<Main />
			</MainStoreContext.Provider>
		</section>
	)
}

// proxyStoreTest1()
// valitoStoreTest1()
// proxyStoreTest2()

export default React.memo(ProxyStoreRoot)
