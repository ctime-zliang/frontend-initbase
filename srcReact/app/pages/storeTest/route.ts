import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { EdaStoreRootMemo } from './edaStore/Index'
import { ProxyStoreRootMemo } from './proxyStore/Index'

export const storeTestErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const storeTestEdaAbstractStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/edaStore',
		exact: true,
		element: EdaStoreRootMemo,
	}
}

export const storeTestProxyStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/proxyStore',
		exact: true,
		element: ProxyStoreRootMemo,
	}
}
