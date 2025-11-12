import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { ContextmenuRootMemo } from './contextmenu/Index'
import { PaginationRootMemo } from './pagination/Index'
import { TreeRootMemo } from './tree/Index'
import { VirtualScrollingRootMemo } from './virtualScrolling/Index'

export const baseComponentListErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const componentContextmenuRoute = (): TRouteItem => {
	return {
		path: '/contextmenu',
		exact: true,
		element: ContextmenuRootMemo,
	}
}

export const componentPaginationRoute = (): TRouteItem => {
	return {
		path: '/pagination',
		exact: true,
		element: PaginationRootMemo,
	}
}

export const componentTreeRoute = (): TRouteItem => {
	return {
		path: '/tree',
		exact: true,
		element: TreeRootMemo,
	}
}

export const componentVirtualScrollingRoute = (): TRouteItem => {
	return {
		path: '/virtualscrolling',
		exact: true,
		element: VirtualScrollingRootMemo,
	}
}
