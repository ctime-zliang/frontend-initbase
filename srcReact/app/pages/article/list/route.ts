import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../Router'
import Index from '.'

export const articleListRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: Index,
	}
}
