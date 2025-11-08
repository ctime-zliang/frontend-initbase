import { TRouteItem } from '../../Router'
import { VirtualScrollingRootMemo } from '.'

export const componentVirtualScrollingRoute = (): TRouteItem => {
	return {
		path: '/virtualscrolling',
		exact: true,
		element: VirtualScrollingRootMemo,
	}
}
