import React, { useLayoutEffect, useRef, useState } from 'react'
import { Main } from './main'
import { createStoreInstance, AtomStoreContext, TMixinStoreMap } from './store/Main'

function ZustandRoot(): React.ReactElement {
	const [store, setStore] = useState<TMixinStoreMap>(null!)
	const storeRef: { current: TMixinStoreMap } = useRef<TMixinStoreMap>(null!)
	useLayoutEffect((): (() => void) => {
		createStoreInstance().then((atomInstance: TMixinStoreMap): void => {
			setStore(atomInstance)
			storeRef.current = atomInstance
		})
		return (): void => {}
	}, [])
	if (!store) {
		return <section>store initialing...</section>
	}
	return (
		<section>
			<AtomStoreContext.Provider value={store}>
				<Main />
			</AtomStoreContext.Provider>
		</section>
	)
}
export default React.memo(ZustandRoot)
