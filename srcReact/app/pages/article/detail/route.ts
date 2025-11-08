import { TRouteItem } from '../../Router'
import { DetailRootMemo } from '.'

export const articleDetailRoute = (): TRouteItem => {
	return {
		path: '/detail/*',
		exact: true,
		element: DetailRootMemo,
	}
}
