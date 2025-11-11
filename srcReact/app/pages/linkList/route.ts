import { TRouteItem } from '../Router'
import { LinkListRoot } from './Index'

export const linkListRoute = (): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: LinkListRoot,
	}
}
