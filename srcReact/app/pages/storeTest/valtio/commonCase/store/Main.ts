import { createContext } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { AttrStore } from './Attr'
import { InfoStore } from './Info'

export async function createStoreInstance(): Promise<MainStore> {
	const storeInstance: MainStore = new MainStore()
	await storeInstance.initial()
	const store: MainStore = proxy(storeInstance)
	return store
}

export class MainStore {
	public infoStore: InfoStore
	public attrStore: AttrStore
	constructor() {
		this.infoStore = new InfoStore(this)
		this.attrStore = new AttrStore(this)
	}

	public async initial(): Promise<void> {
		/* ... */
	}

	public whenMouned(): void {
		console.log(`The module has mounted.`)
	}

	public whenUnmount(): void {
		console.log(`The module has unmounted.`)
	}
}

export const MainStoreContext = createContext<MainStore>(null!)
