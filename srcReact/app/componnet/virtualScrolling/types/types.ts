import React from 'react'

export type TVariableHeightListScrollingProps = TVariableHeightListScrollingCallProps
export type TVariableHeightListScrollingCallProps = {
	containerHeight: number
	countTotal: number
	estimatedRowHeight?: number
	topBufferSize?: number
	bottomBufferSize?: number
	initContainerScrollTop?: number
	onScroll?: ((y: number, x: number) => void) | null
	children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any> | null
}
export type TVariableHeightListScrollingFunctionProps = TVariableHeightListScrollingCallProps & {
	rowCache: Array<TRowCache>
	topBufferSize: number
	bottomBufferSize: number
	initContainerScrollTop: number
	estimatedRowHeight: number
	children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any> | null
}
export type TVariableHeightListRowItemCallStyle = {
	width: number | string
}

export type TFixedHeightListScrollingProps = TFixedHeightListScrollingCallProps
export type TFixedHeightListScrollingCallProps = {
	containerHeight: number
	countTotal: number
	estimatedRowHeight?: number
	topBufferSize?: number
	bottomBufferSize?: number
	initContainerScrollTop?: number
	onScroll?: ((y: number, x: number) => void) | null
	children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any> | null
}
export type TFixedHeightListScrollingFunctionProps = TFixedHeightListScrollingCallProps & {
	rowCache: Array<TRowCache>
	topBufferSize: number
	bottomBufferSize: number
	initContainerScrollTop: number
	estimatedRowHeight: number
	children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any> | null
}
export type TFixedHeightListRowItemCallStyle = {
	width: number | string
}

export type TRowCache = {
	index: number
	top: number
	bottom: number
	height: number
	diffHeight: number
}

export type TBoundingClientRectResultToJSONResult = {
	left: number
	top: number
	right: number
	bottom: number
	width: number
	height: number
	x: number
	y: number
}
export type TBoundingClientRectResult = TBoundingClientRectResultToJSONResult & {
	toJSON: () => TBoundingClientRectResultToJSONResult
}
