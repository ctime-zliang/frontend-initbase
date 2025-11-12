import { TRouteItem } from '../../layout/Router'
import { HomePageRootMemo } from './Index'

export const homeRoute = (): TRouteItem => {
	return {
		path: '/',
		exact: true,
		element: HomePageRootMemo,
	}
}
