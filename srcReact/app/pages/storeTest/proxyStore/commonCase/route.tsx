import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const storeTestProxyStoreCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/proxyStore',
		exact: true,
		element: Index,
	}
}
