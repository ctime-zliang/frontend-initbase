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
					{ id: uuidv4(), title: 'ProxyStore State Manager', desc: 'ProxyStore manager case test', path: '/storetest/proxyStore' },
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
					{ id: uuidv4(), title: 'Alert', desc: 'Alert component case test', path: '/baseComponentLib/alert' },
				],
			},
			{
				subject: 'Utils',
				list: [
					{ id: uuidv4(), title: 'Proxy State', desc: 'Proxy state util case test', path: '/utils/proxyState' },
					{ id: uuidv4(), title: 'Async Animator', desc: 'Async animator util case test', path: '/utils/asyncAnimator' },
					{ id: uuidv4(), title: 'Async Timeout', desc: 'Async timeout util case test', path: '/utils/asyncTimeout' },
					{ id: uuidv4(), title: 'Concurrency Control', desc: 'Concurrency control util case test', path: '/utils/concurrencyControl' },
					{ id: uuidv4(), title: 'DiffJSON', desc: 'DiffJSON util case test', path: '/utils/diffJSON' },
					{ id: uuidv4(), title: 'SetMessageTimeout', desc: 'SetMessageTimeout util case test', path: '/utils/setMessageTimeout' },
					{ id: uuidv4(), title: 'List Dragable 2', desc: 'List dragable util case test', path: '/utils/listDragable2' },
					{ id: uuidv4(), title: 'Gesture', desc: 'Gesture util case test', path: '/utils/gestureCase' },
				],
			},
			{
				subject: 'WebGL',
				list: [{ id: uuidv4(), title: 'WebGL Projection', desc: 'WebGL projection test', path: '/webgl/projectionTest' }],
			},
			{
				subject: 'Test Page',
				list: [{ id: uuidv4(), title: 'Common', desc: 'Common page', path: '/testpage/common' }],
			},
		],
	}
}
