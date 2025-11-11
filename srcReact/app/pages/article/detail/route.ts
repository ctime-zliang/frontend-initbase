import { TRouteItem } from '../../Router'
import { ArticleDetailRootMemo } from './Index'

export const articleDetailRoute = (): TRouteItem => {
	return {
		path: '/detail/*',
		exact: true,
		element: ArticleDetailRootMemo,
	}
}
