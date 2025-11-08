import { TRouteItem } from '../Router'
import { TestPageMainMemo } from '.'
import { Error404RootMemo } from './404'

export const testpageCommonRoute = (): TRouteItem => {
	return {
		path: '/common',
		exact: true,
		element: TestPageMainMemo,
	}
}

export const testpageErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}
