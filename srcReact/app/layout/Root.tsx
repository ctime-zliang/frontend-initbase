import React from 'react'
import { createRoutes } from '../router/RouteList'
import { TCommonComponentBaseProps } from '../types/comm.types'
import { renderRoutes, TRouteItem } from './Router'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	const authPath: string = '/'
	const routes: Array<TRouteItem> = createRoutes()
	return renderRoutes(
		routes,
		{
			authPath,
		},
		{ ...props }
	)
}

export const RootMemo = React.memo(Root)
