import { TRouteItem } from '../../Router'
import { ContextmenuRootMemo } from '.'

export const componentContextmenuRoute = (): TRouteItem => {
	return {
		path: '/contextmenu',
		exact: true,
		element: ContextmenuRootMemo,
	}
}
