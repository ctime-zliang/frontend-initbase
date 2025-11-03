import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const linkListRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: Index,
	}
}
