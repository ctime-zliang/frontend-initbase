import { TRouteItem } from '../../Router'
import { PaginationRootMemo } from './Index'

export const componentPaginationRoute = (): TRouteItem => {
	return {
		path: '/pagination',
		exact: true,
		element: PaginationRootMemo,
	}
}
