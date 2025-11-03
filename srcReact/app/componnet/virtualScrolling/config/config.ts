import { TFixedHeightListScrollingFunctionProps, TVariableHeightListScrollingFunctionProps } from '../types/types'

export const variableListItemWrapperIdPrefix: string = '__vsitemid'

export const defaultProfileVariable: TVariableHeightListScrollingFunctionProps = {
	containerHeight: 0,
	countTotal: 0,
	estimatedRowHeight: 25,
	topBufferSize: 10,
	bottomBufferSize: 10,
	initContainerScrollTop: 0,
	rowCache: [],
	children: null,
}

export const defaultProfileFixed: TFixedHeightListScrollingFunctionProps = {
	containerHeight: 0,
	countTotal: 0,
	estimatedRowHeight: 25,
	topBufferSize: 10,
	bottomBufferSize: 10,
	initContainerScrollTop: 0,
	rowCache: [],
	children: null,
}
