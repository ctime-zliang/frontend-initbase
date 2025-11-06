import { TReduxStore } from '../../../../store/public/types'
import { TRouteItem } from '../../../Router'
import Index from '.'

export const storeTestProxyStoreCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/proxyStore',
		exact: true,
		element: Index,
	}
}
