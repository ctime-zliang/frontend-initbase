import { TReduxStore } from '../../../../store/public/types'
import { TRouteItem } from '../../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const storeTestValtioCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/valtio',
		exact: true,
		element: Index,
	}
}
