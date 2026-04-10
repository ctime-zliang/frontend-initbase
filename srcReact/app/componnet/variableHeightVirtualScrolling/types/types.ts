import { TVariableHeightListScrollingProps } from '../modules/VariableHeightListScrolling'

export type TVariableHeightListScrollingProfile = Required<TVariableHeightListScrollingProps> & {
	rowCache: Array<TRowCache>
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
