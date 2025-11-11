import { TRouteItem } from '../../Router'
import { ContextmenuRootMemo } from './Index'

export const componentContextmenuRoute = (): TRouteItem => {
	return {
		path: '/contextmenu',
		exact: true,
		element: ContextmenuRootMemo,
	}
}
