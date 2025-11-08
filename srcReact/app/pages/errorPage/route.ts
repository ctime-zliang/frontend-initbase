import { TRouteItem } from '../Router'
import Error404 from './404'

export const error404Route = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
