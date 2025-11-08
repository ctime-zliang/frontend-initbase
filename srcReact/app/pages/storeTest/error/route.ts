import { TRouteItem } from '../../Router'
import { Error404RootMemo } from './404'

export const storeTestErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}
