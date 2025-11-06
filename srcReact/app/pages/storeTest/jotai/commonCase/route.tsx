import { TReduxStore } from '../../../../store/public/types'
import { TRouteItem } from '../../../Router'
import Index from '.'

export const storeTestJotaiCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/jotai',
		exact: true,
		element: Index,
	}
}
