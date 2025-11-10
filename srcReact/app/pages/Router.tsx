import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { TCommonComponentBaseProps } from '../types/comm.types'
import { LayoutMemo } from '../layout/Layout'

export type TRouteItem = {
	path: string
	element?: React.ReactElement | React.FC | any
	render?: (...r: any[]) => {}
	requiresAuth?: boolean
	routes?: TRouteItem[]
	exact?: boolean
	noMatch?: boolean
	strict?: boolean
	sensitive?: boolean
	meta?: any
	getInitialProps?: (...r: any[]) => {}
	asyncStoreKeys?: string[]
	[key: string]: any
}

const createRouteComponentList = (routes: Array<TRouteItem>, profile: { [key: string]: any }, props: TCommonComponentBaseProps) => {
	return routes.map((item: TRouteItem, index: number) => {
		if (item && item.routes) {
			return (
				<Route
					path={item.path}
					element={
						<>
							<Routes>{createRouteComponentList(item.routes, profile, props)}</Routes>
						</>
					}
					key={index}
				></Route>
			)
		}
		return (
			<Route
				path={item.path}
				element={
					<LayoutMemo {...props}>
						<item.element {...props}></item.element>
					</LayoutMemo>
				}
				key={index}
			></Route>
		)
	})
}

export function renderRoutes(routes: Array<TRouteItem>, profile: { [key: string]: any }, props: TCommonComponentBaseProps): React.ReactElement {
	return <Routes>{createRouteComponentList(routes, profile, props)}</Routes>
}
