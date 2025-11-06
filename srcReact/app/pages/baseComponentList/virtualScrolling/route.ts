import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../Router'
import Index from '.'

export const componentVirtualScrollingRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/virtualscrolling',
		exact: true,
		element: Index,
	}
}
