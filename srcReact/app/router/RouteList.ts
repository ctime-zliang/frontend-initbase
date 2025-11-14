import { homeRoute } from '../pages/home/route'
import { error404Route } from '../pages/route'
import { linkListErrorRoute, linkListRoute } from '../pages/linkList/route'
import { articleErrorRoute, articleListRoute, articleDetailRoute } from '../pages/article/route'
import {
	baseComponentListErrorRoute,
	componentPaginationRoute,
	componentTreeRoute,
	componentVirtualScrollingRoute,
	componentContextmenuRoute,
} from '../pages/baseComponentList/route'
import { testpageCommonRoute, testPageErrorRoute } from '../pages/testpage/route'
import { storeTestErrorRoute, storeTestEdaAbstractStoreCommonRoute, storeTestProxyStoreCommonRoute } from '../pages/storeTest/route'
import { TRouteItem } from '../layout/Router'
import { proxyStateRoute, utilsErrorRoute } from '../pages/utils/route'

export const createRoutes = (): Array<TRouteItem> => {
	const routes: Array<TRouteItem> = [
		error404Route(),
		homeRoute(),
		linkListRoute(),
		{
			path: '/link/*',
			routes: [linkListErrorRoute()],
		},
		{
			path: '/article/*',
			routes: [articleErrorRoute(), articleListRoute(), articleDetailRoute()],
		},
		{
			path: '/storetest/*',
			routes: [storeTestErrorRoute(), storeTestEdaAbstractStoreCommonRoute(), storeTestProxyStoreCommonRoute()],
		},
		{
			path: '/baseComponentLib/*',
			routes: [
				baseComponentListErrorRoute(),
				componentPaginationRoute(),
				componentTreeRoute(),
				componentVirtualScrollingRoute(),
				componentContextmenuRoute(),
			],
		},
		{
			path: '/utils/*',
			routes: [utilsErrorRoute(), proxyStateRoute()],
		},
		{
			path: '/testpage/*',
			routes: [testPageErrorRoute(), testpageCommonRoute()],
		},
	]
	return recursion(routes, ``), routes
}

function recursion(routes: Array<TRouteItem> = [], prefixPath: string = ''): void {
	let path: string = ``
	for (let i: number = 0; i < routes.length; i++) {
		const routeItem: TRouteItem = routes[i]
		if (routeItem.routes && routeItem.routes.length) {
			recursion(routeItem.routes)
		}
		path = prefixPath + routeItem.path
		routeItem.path = path
	}
}
