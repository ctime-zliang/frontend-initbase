import React from 'react'
import { TReduxStore } from '../../../../store/public/types'
import { TRouteItem } from '../../../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'
/* ... */
import { createReducer as counter_createReducer } from './store/counter/reducer'
import { moduleKey as counter_moduleKey } from './store/counter/config'
/* ... */
import { createReducer as timeStamp_createReducer } from './store/timeStamp/reducer'
import { moduleKey as timeStamp_moduleKey } from './store/timeStamp/config'
import { modulesInjectReducer } from '../../../../store/redux'

export const storeTestReduxCommonRoute = (reduxStore: TReduxStore): TRouteItem => {
	modulesInjectReducer(reduxStore, counter_moduleKey, counter_createReducer)
	modulesInjectReducer(reduxStore, timeStamp_moduleKey, timeStamp_createReducer)
	return {
		path: '/redux',
		exact: true,
		element: (): React.ReactElement => {
			return <Index reduxStore={reduxStore} />
		},
	}
}
