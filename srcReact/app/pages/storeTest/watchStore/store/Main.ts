import { createContext } from 'react'
import { AttrStore } from './Attr'
import { InfoStore } from './Info'
import { WatchAbstractStore } from '../../../../store/watchStore/WatchAbstractStore'

export function createStoreInstance(): MainStore {
	const store: MainStore = new MainStore()
	store.initial()
	return store
}

export class MainStore extends WatchAbstractStore {
	public infoStore: InfoStore
	public attrStore: AttrStore
	constructor() {
		super()
		this.infoStore = new InfoStore(this)
		this.attrStore = new AttrStore(this)
	}

	public initial(): void {
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
