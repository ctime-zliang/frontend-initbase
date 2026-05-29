import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { ProxyStoreRootMemo } from './proxyStore/Index'
import React from 'react'
import { createStoreInstance, MainStoreContext } from './watchStore/store/Main'
import { WatchStoreRoot } from './watchStore/Index'
import { createStoreInstance2, MainStoreContext2 } from './watchStore2/store/Main'
import { WatchStoreRoot2 } from './watchStore2/Index'

export const storeTestErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const storeTestWatchStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/watchStore',
		exact: true,
		element: React.memo((): React.ReactElement => {
			return (
				<MainStoreContext.Provider value={createStoreInstance()}>
					<WatchStoreRoot />
				</MainStoreContext.Provider>
			)
		}),
	}
}

export const storeTestProxyStoreCommonRoute = (): TRouteItem => {
	return {
		path: '/proxyStore',
		exact: true,
		element: ProxyStoreRootMemo,
	}
}

export const storeTestWatchStoreCommonRoute2 = (): TRouteItem => {
	return {
		path: '/watchStore2',
		exact: true,
		element: React.memo((): React.ReactElement => {
			return (
				<MainStoreContext2.Provider value={createStoreInstance2()}>
					<WatchStoreRoot2 />
				</MainStoreContext2.Provider>
			)
		}),
	}
}
