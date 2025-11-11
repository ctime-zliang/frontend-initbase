import { TRouteItem } from '../../Router'
import { ArticleListRootMemo } from './Index'

export const articleListRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: ArticleListRootMemo,
	}
}
