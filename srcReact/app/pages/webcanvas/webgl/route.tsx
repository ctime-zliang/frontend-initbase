import { TRouteItem } from '../../../layout/Router'
import { Error404RootMemo } from './404'
import { ComprehensiveTestMemo } from './comprehensiveTest/Index'

export const webglErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const comprehensiveTestRoute = (): TRouteItem => {
	return {
		path: '/comprehensiveTest',
		exact: true,
		element: ComprehensiveTestMemo,
	}
}
