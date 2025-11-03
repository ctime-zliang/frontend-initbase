import { v4 as uuidv4 } from 'uuid'
import { TStore } from './types'
import { globalConfig } from 'srcReact/app/config/config'

export const createInitialState = (): TStore => {
	return {
		g_languageSetting: globalConfig.lang,
		linkData: [
			{
				subject: 'Modules List',
				list: [{ id: uuidv4(), title: 'Article', desc: 'Article Module Case', path: '/article' }],
			},
			{
				subject: 'Store Manager',
				list: [
					{ id: uuidv4(), title: 'Valtio State Manager', desc: 'Valtio Store Manager Case', path: '/storetest/valtio' },
					{ id: uuidv4(), title: 'Redux State Manager', desc: 'Redux Store Manager Case', path: '/storetest/redux' },
					{ id: uuidv4(), title: 'EdaAbstractStore State Manager', desc: 'EdaAbstract Store Manager Case', path: '/storetest/eda' },
					{ id: uuidv4(), title: 'Jotai State Manager', desc: 'Jotai Store Manager Case', path: '/storetest/jotai' },
					{ id: uuidv4(), title: 'ProxyStore State Manager', desc: 'Proxy Store Manager Case', path: '/storetest/proxyStore' },
				],
			},
			{
				subject: 'Base Component Lib',
				list: [
					{ id: uuidv4(), title: 'Paginataion', desc: 'Pagination Base Component', path: '/componentLib/pagination' },
					{ id: uuidv4(), title: 'Tree', desc: 'Tree Base Component', path: '/componentLib/tree' },
					{ id: uuidv4(), title: 'Virtual Scrolling', desc: 'VirtualScrolling Base Component', path: '/componentLib/virtualscrolling' },
					{ id: uuidv4(), title: 'Contextmenu', desc: 'Contextmenu Base Component', path: '/componentLib/contextmenu' },
				],
			},
			{
				subject: 'Test Page',
				list: [{ id: uuidv4(), title: 'Common', desc: 'Test Common Case Page', path: '/testpage/common' }],
			},
		],
	}
}
