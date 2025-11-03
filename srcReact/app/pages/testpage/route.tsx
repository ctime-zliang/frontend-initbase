import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'
import Error404 from './404'

export const testpageCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/common',
		exact: true,
		element: Index,
	}
}

export const testpageErrorRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
