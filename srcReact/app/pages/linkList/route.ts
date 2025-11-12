import { TRouteItem } from '../../layout/Router'
import { LinkListRoot } from './Index'

export const linkListRoute = (): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: LinkListRoot,
	}
}
