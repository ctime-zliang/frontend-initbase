import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { TestPageMainMemo } from './Index'

export const testPageErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const testpageCommonRoute = (): TRouteItem => {
	return {
		path: '/common',
		exact: true,
		element: TestPageMainMemo,
	}
}
