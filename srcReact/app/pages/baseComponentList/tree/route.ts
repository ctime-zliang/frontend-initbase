import { TRouteItem } from '../../Router'
import { TreeRootMemo } from '.'

export const componentTreeRoute = (): TRouteItem => {
	return {
		path: '/tree',
		exact: true,
		element: TreeRootMemo,
	}
}
