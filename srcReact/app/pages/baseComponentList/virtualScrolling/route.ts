import { TRouteItem } from '../../Router'
import { VirtualScrollingRootMemo } from './Index'

export const componentVirtualScrollingRoute = (): TRouteItem => {
	return {
		path: '/virtualscrolling',
		exact: true,
		element: VirtualScrollingRootMemo,
	}
}
