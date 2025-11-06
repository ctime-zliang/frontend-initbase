import Layout from '../pages/layout'
import { TReduxStore } from '../store/public/types'
/* ... */
import { homeRoute } from '../pages/home/route'
import { error404Route } from '../pages/errorPage/route'
import { linkListRoute } from '../pages/linkList/route'
import { articleListRoute } from '../pages/article/list/route'
import { articleDetailRoute } from '../pages/article/detail/route'
import { articleErrorRoute } from '../pages/article/error/route'
import { componentPaginationRoute } from '../pages/baseComponentList/pagination/route'
import { componentTreeRoute } from '../pages/baseComponentList/tree/route'
import { componentVirtualScrollingRoute } from '../pages/baseComponentList/virtualScrolling/route'
import { componentContextmenuRoute } from '../pages/baseComponentList/contextmenu/route'
import { testpageCommonRoute, testpageErrorRoute } from '../pages/testpage/route'
import { storeTestValtioCommonRoute } from '../pages/storeTest/valtio/commonCase/route'
import { storeTestErrorRoute } from '../pages/storeTest/error/route'
import { storeTestReduxCommonRoute } from '../pages/storeTest/redux/commonCase/route'
import { storeTestEdaAbstractStoreCommonRoute } from '../pages/storeTest/edaStore/commonCase/route'
import { storeTestJotaiCommonRoute } from '../pages/storeTest/jotai/commonCase/route'
import { storeTestProxyStoreCommonRoute } from '../pages/storeTest/proxyStore/commonCase/route'
import { TRouteItem } from '../pages/Router'

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
		}
	}
}
