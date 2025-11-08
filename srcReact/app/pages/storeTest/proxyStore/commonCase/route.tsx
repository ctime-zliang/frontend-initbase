import { TRouteItem } from '../../../Router'
import { ProxyStoreRootMemo } from '.'

export const storeTestProxyStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/proxyStore',
		exact: true,
		element: ProxyStoreRootMemo,
	}
}
