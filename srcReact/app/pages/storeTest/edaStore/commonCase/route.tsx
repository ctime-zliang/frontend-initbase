import { TRouteItem } from '../../../Router'
import { EdaStoreRootMemo } from '.'

export const storeTestEdaAbstractStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/eda',
		exact: true,
		element: EdaStoreRootMemo,
	}
}
