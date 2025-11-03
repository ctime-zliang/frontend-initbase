import { createContext } from 'react'
import { AttrStore } from './Attr'
import { InfoStore } from './Info'
import { ProxyStore } from 'srcReact/app/store/proxyStore'

export async function createStoreInstance(): Promise<MainStore> {
	const storeInstance: MainStore = new MainStore()
	await storeInstance.initial()
	const proxyStore = new ProxyStore(storeInstance)
	console.log(proxyStore)
	const store: MainStore = proxyStore.proxyObject
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
