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
				subject: 'Page Module List',
				list: [{ id: uuidv4(), title: 'Article', desc: 'Article page case test', path: '/article' }],
			},
			{
				subject: 'Store Tool',
				list: [
					{
						id: uuidv4(),
						title: 'EdaAbstractStore State Manager',
						desc: 'EdaAbstractStore manager case test',
						path: '/storetest/edaStore',
					},
					{ id: uuidv4(), title: 'ProxyStore State Manager', desc: 'Proxy-Store manager case test', path: '/storetest/proxyStore' },
				],
			},
			{
				subject: 'Base Component Lib',
				list: [
					{ id: uuidv4(), title: 'Paginataion', desc: 'Pagination component case test', path: '/baseComponentLib/pagination' },
					{ id: uuidv4(), title: 'Tree', desc: 'Tree component case test', path: '/baseComponentLib/tree' },
					{
						id: uuidv4(),
						title: 'VirtualScrolling',
						desc: 'VirtualScrolling component case test',
						path: '/baseComponentLib/virtualscrolling',
					},
					{ id: uuidv4(), title: 'Contextmenu', desc: 'Contextmenu component case test', path: '/baseComponentLib/contextmenu' },
				],
			},
			{
				subject: 'Utils',
				list: [{ id: uuidv4(), title: 'ProxyState', desc: 'ProxyState util case test', path: '/utils/proxyState' }],
			},
			{
				subject: 'Test Page',
				list: [{ id: uuidv4(), title: 'Common', desc: 'Common page', path: '/testpage/common' }],
			},
		],
	}
}
