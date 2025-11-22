import { TRouteItem } from '../../layout/Router'
import { Error404RootMemo } from './404'
import { AsyncAnimatorRootMemo } from './asyncAnimator/Index'
import { AsyncTimeoutRootMemo } from './asyncTimeout/Index'
import { ConcurrencyControlRootMemo } from './concurrencyControl/Index'
import { DiffJSONRootMemo } from './diffJSON/Index'
import { ListDragableRootMemo } from './dragable/Index'
import { GestureCaseRootMemo } from './gesture/Index'
import { ProxyStateRootMemo } from './proxyState/Index'
import { SetMessageTimeoutRootMemo } from './setMessageTimeout/Index'

export const utilsErrorRoute = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		element: Error404RootMemo,
	}
}

export const proxyStateRoute = (): TRouteItem => {
	return {
		path: '/proxyState',
		exact: true,
		element: ProxyStateRootMemo,
	}
}

export const asyncAnimatorRoute = (): TRouteItem => {
	return {
		path: '/asyncAnimator',
		exact: true,
		element: AsyncAnimatorRootMemo,
	}
}

export const asyncTimeoutRoute = (): TRouteItem => {
	return {
		path: '/asyncTimeout',
		exact: true,
		element: AsyncTimeoutRootMemo,
	}
}

export const concurrencyControlRoute = (): TRouteItem => {
	return {
		path: '/concurrencyControl',
		exact: true,
		element: ConcurrencyControlRootMemo,
	}
}

export const diffJSONRoute = (): TRouteItem => {
	return {
		path: '/diffJSON',
		exact: true,
		element: DiffJSONRootMemo,
	}
}

export const setMessageTimeoutRoute = (): TRouteItem => {
	return {
		path: '/setMessageTimeout',
		exact: true,
		element: SetMessageTimeoutRootMemo,
	}
}

export const listDragableRoute = (): TRouteItem => {
	return {
		path: '/listDragable',
		exact: true,
		element: ListDragableRootMemo,
	}
}

export const gestureCaseRoute = (): TRouteItem => {
	return {
		path: '/gestureCase',
		exact: true,
		element: GestureCaseRootMemo,
	}
}
