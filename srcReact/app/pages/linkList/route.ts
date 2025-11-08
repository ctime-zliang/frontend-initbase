import { TRouteItem } from '../Router'
import { ListRoot } from '.'

export const linkListRoute = (): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: ListRoot,
	}
}
