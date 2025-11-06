import { TReduxStore } from '../../../store/public/types'
import { TRouteItem } from '../../Router'
import Index from '.'

export const componentTreeRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/tree',
		exact: true,
		element: Index,
	}
}
