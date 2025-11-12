import { TRouteItem } from '../layout/Router'
import { Error404PageRootMemo } from './404'

export const error404Route = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404PageRootMemo,
	}
}
