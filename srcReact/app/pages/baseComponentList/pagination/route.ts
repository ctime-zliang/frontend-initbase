import { TRouteItem } from '../../Router'
import { PaginationRootMemo } from '.'

export const componentPaginationRoute = (): TRouteItem => {
	return {
		path: '/pagination',
		exact: true,
		element: PaginationRootMemo,
	}
}
