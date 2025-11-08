import { TRouteItem } from '../Router'
import { HomePageRootMemo } from '.'

export const homeRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: HomePageRootMemo,
	}
}
