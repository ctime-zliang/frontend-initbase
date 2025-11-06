import { TReduxStore } from '../../store/public/types'
import { TRouteItem } from '../Router'
import Error404 from './404'

export const error404Route = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
