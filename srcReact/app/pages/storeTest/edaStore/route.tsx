import { TRouteItem } from '../../Router'
import { EdaStoreRootMemo } from './Index'

export const storeTestEdaAbstractStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/eda',
		exact: true,
		element: EdaStoreRootMemo,
	}
}
