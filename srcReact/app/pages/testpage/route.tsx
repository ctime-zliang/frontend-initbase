import { TReduxStore } from '../../store/public/types'
import { TRouteItem } from '../Router'
import Index from '.'
import Error404 from './404'

export const testpageCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/common',
		exact: true,
		element: Index,
	}
}

export const testpageErrorRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404,
	}
}
