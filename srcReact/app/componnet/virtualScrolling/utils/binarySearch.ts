import { TRowCache } from '../types/types'

export function binarySearch(rowCache: Array<TRowCache>, scrollTop: number): number {
	let startIndex: number = 0
	let endIndex: number = rowCache.length - 1
	let tmpIndex: number = -1
	while (startIndex <= endIndex) {
		tmpIndex = Math.floor((startIndex + endIndex) / 2)
		const midRowCacheItem: TRowCache = rowCache[tmpIndex]
		let midItemBottom: number = midRowCacheItem.bottom
		if (midItemBottom === scrollTop) {
			return tmpIndex
		} else if (midItemBottom < scrollTop) {
			startIndex = tmpIndex + 1
		} else {
			endIndex = tmpIndex - 1
		}
	}
	return tmpIndex
}
