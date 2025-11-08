import { v4 as uuidv4 } from 'uuid'
import { globalConfig } from '../../config/config'

export type TLinkListItem = {
	id: string
	title: string
	path: string
	desc: string
}
export type TStore = {
	g_headLoadStatus: string
	g_languageSetting: string
	linkData: Array<{
		subject: string
		list: Array<TLinkListItem>
	}>
}
export const createInitialState = (): TStore => {
	return {
		g_headLoadStatus: '-',
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
					{ id: uuidv4(), title: 'EdaAbstractStore State Manager', desc: 'EdaAbstract Store Manager Case', path: '/storetest/eda' },
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
