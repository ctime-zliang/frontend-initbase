import { createContext } from 'react'
import { AttrStore } from './Attr'
import { InfoStore } from './Info'
import { WatchAbstractStore2 } from '../../../../store/watchStore2/WatchAbstractStore2'

export function createStoreInstance2(): MainStore2 {
	const store: MainStore2 = new MainStore2()
	store.initial()
	return store
}

export class MainStore2 extends WatchAbstractStore2 {
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

export const MainStoreContext2 = createContext<MainStore2>(null!)
