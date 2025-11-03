import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const homeRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: Index,
	}
}
