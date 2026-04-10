import { TVariableHeightListScrollingProfile } from '../types/types'

export const variableListItemWrapperIdPrefix: string = '__vsitemid'

export const defaultProfileVariable: TVariableHeightListScrollingProfile = {
	containerHeight: 0,
	countTotal: 0,
	isShowBottom: false,
	bottomHeight: 0,
	bottomContent: null!,
	estimatedRowHeight: 25,
	topBufferSize: 50,
	bottomBufferSize: 50,
	initContainerScrollTop: 0,
	rowCache: [],
	onScroll: null!,
	children: null!,
}
