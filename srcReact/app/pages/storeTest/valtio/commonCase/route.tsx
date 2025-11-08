import { TRouteItem } from '../../../Router'
import { ValtioRootMemo } from '.'

export const storeTestValtioCommonRoute = (): TRouteItem => {
	return {
		path: '/valtio',
		exact: true,
		element: ValtioRootMemo,
	}
}
