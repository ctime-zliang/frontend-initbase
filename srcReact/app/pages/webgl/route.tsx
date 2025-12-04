import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { ProjectionTestMemo } from './projectionTest/Index'

export const webglErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const projectionTestRoute = (): TRouteItem => {
	return {
		path: '/projectionTest',
		exact: true,
		element: ProjectionTestMemo,
	}
}
