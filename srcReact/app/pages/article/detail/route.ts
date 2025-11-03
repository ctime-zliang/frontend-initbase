import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const articleDetailRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/detail/*',
		exact: true,
		element: Index,
	}
}
