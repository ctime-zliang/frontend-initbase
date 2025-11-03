import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const storeTestEdaAbstractStoreCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/eda',
		exact: true,
		element: Index,
	}
}
