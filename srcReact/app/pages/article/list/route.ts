import { TRouteItem } from '../../Router'
import { ListRootMemo } from '.'

export const articleListRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: ListRootMemo,
	}
}
