import Layout from '../pages/layout'
import { TRouteItem } from '../utils/hoc/renderRoutes/renderRoutes'
import { TReduxStore } from '../store/public/types'
/* ... */
import { homeRoute } from './home/route'
import { error404Route } from './errorPage/route'
import { linkListRoute } from './linkList/route'
import { articleListRoute } from './article/list/route'
import { articleDetailRoute } from './article/detail/route'
import { articleErrorRoute } from './article/error/route'
import { componentPaginationRoute } from './baseComponentList/pagination/route'
import { componentTreeRoute } from './baseComponentList/tree/route'
import { componentVirtualScrollingRoute } from './baseComponentList/virtualScrolling/route'
import { componentContextmenuRoute } from './baseComponentList/contextmenu/route'
import { testpageCommonRoute, testpageErrorRoute } from './testpage/route'
import { storeTestValtioCommonRoute } from './storeTest/valtio/commonCase/route'
import { storeTestErrorRoute } from './storeTest/error/route'
import { storeTestReduxCommonRoute } from './storeTest/redux/commonCase/route'
import { storeTestEdaAbstractStoreCommonRoute } from './storeTest/edaStore/commonCase/route'
import { storeTestJotaiCommonRoute } from './storeTest/jotai/commonCase/route'
import { storeTestProxyStoreCommonRoute } from './storeTest/proxyStore/commonCase/route'

export const createRoutes = (reduxStore: TReduxStore): Array<TRouteItem> => {
	return [
		homeRoute(reduxStore),
		linkListRoute(reduxStore),
		{
			path: '/article/*',
			routes: [articleListRoute(reduxStore), articleDetailRoute(reduxStore), articleErrorRoute(reduxStore)],
		},
		{
			path: '/storetest/*',
			routes: [
				storeTestValtioCommonRoute(reduxStore),
				storeTestReduxCommonRoute(reduxStore),
				storeTestEdaAbstractStoreCommonRoute(reduxStore),
				storeTestJotaiCommonRoute(reduxStore),
				storeTestProxyStoreCommonRoute(reduxStore),
				storeTestErrorRoute(reduxStore),
			],
		},
		{
			path: '/testpage/*',
			routes: [testpageCommonRoute(reduxStore), testpageErrorRoute(reduxStore)],
		},
		{
			path: '/componentLib/*',
			routes: [
				componentPaginationRoute(reduxStore),
				componentTreeRoute(reduxStore),
				componentVirtualScrollingRoute(reduxStore),
				componentContextmenuRoute(reduxStore),
			],
		},
		error404Route(reduxStore),
	]
}

export const filterRoutes = (routes: Array<TRouteItem> = []): Array<TRouteItem> => {
	return exec(routes, ``), routes

	function exec(routes: Array<TRouteItem> = [], prefixPath: string = ''): void {
		let path: string = ``
		for (let i: number = 0; i < routes.length; i++) {
			const routeItem: TRouteItem = routes[i]
			if (routeItem.routes && routeItem.routes.length) {
				exec(routeItem.routes)
			}
			path = prefixPath + routeItem.path
			routeItem.path = path
			routeItem.layout = Layout
		}
	}
}
