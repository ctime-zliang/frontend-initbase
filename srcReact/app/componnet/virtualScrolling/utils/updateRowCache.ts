import { TBoundingClientRectResult, TRowCache } from '../types/types'

export function initRowCache(estimatedRowHeight: number, countTotal: number, rowCache: Array<TRowCache>): Array<TRowCache> {
	rowCache.length = 0
	for (let i: number = 0; i < countTotal; i++) {
		rowCache[i] = {
			index: i,
			height: estimatedRowHeight,
			top: i * estimatedRowHeight,
			bottom: (i + 1) * estimatedRowHeight,
			diffHeight: 0,
		}
	}
	return [...rowCache]
}

export function updateRowCacheByContentItemElement(children: Array<HTMLElement>, rowCache: Array<TRowCache>, callback: (a: number) => void): void {
	const startElementByRender: HTMLElement = children[0]
	children.forEach((element: HTMLElement): void => {
		if (!element) {
			return
		}
		const clientRect: TBoundingClientRectResult = element.getBoundingClientRect()
		const { height } = clientRect
		const index: number = Number(element.id.split('-')[1])
		const diffHeight: number = rowCache[index].height - height
		if (diffHeight) {
			rowCache[index].bottom -= diffHeight
			rowCache[index].height = height
			rowCache[index].diffHeight = diffHeight
		}
	})

	let renderStartIndex: number = 0
	if (startElementByRender) {
		renderStartIndex = Number(startElementByRender.id.split('-')[1])
	}
	let cumulativeDiffHeight = rowCache[renderStartIndex].diffHeight
	rowCache[renderStartIndex].diffHeight = 0
	for (let i: number = renderStartIndex + 1; i < rowCache.length; i++) {
		const itemData: TRowCache = rowCache[i]
		rowCache[i].top = rowCache[i - 1].bottom
		rowCache[i].bottom = rowCache[i].bottom - cumulativeDiffHeight
		if (itemData.diffHeight !== 0) {
			cumulativeDiffHeight += itemData.diffHeight
			itemData.diffHeight = 0
		}
	}

	const height: number = rowCache[rowCache.length - 1].bottom
	callback && callback(height)
}
