import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../Router'
import Index from '.'

export const componentPaginationRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/pagination',
		exact: true,
		element: Index,
	}
}
