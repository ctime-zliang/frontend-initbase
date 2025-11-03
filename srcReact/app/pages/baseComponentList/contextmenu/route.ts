import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const componentContextmenuRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/contextmenu',
		exact: true,
		element: Index,
	}
}
