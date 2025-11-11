import { TRouteItem } from '../Router'
import { ListRoot } from './Index'

export const linkListRoute = (): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: ListRoot,
	}
}
