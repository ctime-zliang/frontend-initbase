import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { ProxyStateRootMemo } from './proxyState/Index'

export const utilsErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const proxyStateRoute = (): TRouteItem => {
	return {
		path: '/proxyState',
		exact: true,
		element: ProxyStateRootMemo,
	}
}
