import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { ArticleDetailRootMemo } from './detail/Index'
import { ArticleListRootMemo } from './list/Index'

export const articleErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const articleListRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: ArticleListRootMemo,
	}
}

export const articleDetailRoute = (): TRouteItem => {
	return {
		path: '/detail/*',
		exact: true,
		element: ArticleDetailRootMemo,
	}
}
