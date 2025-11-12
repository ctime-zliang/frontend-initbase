import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { LinkListRoot } from './Index'

export const linkListErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const linkListRoute = (): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: LinkListRoot,
	}
}
