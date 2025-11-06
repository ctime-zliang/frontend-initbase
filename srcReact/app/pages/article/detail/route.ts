import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../Router'
import Index from '.'

export const articleDetailRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/detail/*',
		exact: true,
		element: Index,
	}
}
