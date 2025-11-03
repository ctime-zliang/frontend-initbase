import { TReduxStore } from 'srcReact/app/store/public/types'
import { TRouteItem } from 'srcReact/app/utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const storeTestJotaiCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/jotai',
		exact: true,
		element: Index,
	}
}
