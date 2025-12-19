/**
 * 设置图片自适应容器
 * 		效果参考 CSS 规则 object-fit
 */
export type TZoomImageByContainerResult = {
	adaptBenchmark: 'WIDTH' | 'HEIGHT'
	scaleRatio: number
	offsetX: number
	offsetY: number
	fitType: 'contain' | 'cover' | 'fit' | 'original'
	scaledWidth: number
	scaledHeight: number
	naturalWidth: number
	naturalHeight: number
	containerWidth: number
	containerHeight: number
}
export function zoomImageByContainer(
	naturalWidth: number,
	naturalHeight: number,
	containerWidth: number,
	containerHeight: number,
	fitType: 'contain' | 'cover' | 'fit' | 'original'
) {
	const result: TZoomImageByContainerResult = {
		adaptBenchmark: undefined!,
		scaleRatio: 1,
		offsetX: 0,
		offsetY: 0,
		fitType,
		scaledWidth: 0,
		scaledHeight: 0,
		naturalWidth,
		naturalHeight,
		containerWidth,
		containerHeight,
	}
	if (!['cover', 'contain', 'fit', 'original'].includes(result.fitType)) {
		throw new Error(`error fit-type for zoom image.`)
	}
	if (naturalWidth <= 0 || naturalHeight <= 0) {
		throw new Error(`error image rect data.`)
	}
	const imageRatio: number = naturalWidth / naturalHeight
	const containerRatio: number = containerWidth / containerHeight
	if (result.fitType === 'contain') {
		if (imageRatio > containerRatio) {
			result.adaptBenchmark = 'WIDTH'
			result.scaledWidth = containerWidth
			result.scaledHeight = result.scaledWidth / imageRatio
			result.offsetX = 0
			result.offsetY = (result.containerHeight - result.scaledHeight) / 2
		} else {
			result.adaptBenchmark = 'HEIGHT'
			result.scaledHeight = containerHeight
			result.scaledWidth = result.scaledHeight * imageRatio
			result.offsetX = (result.containerWidth - result.scaledWidth) / 2
			result.offsetY = 0
		}
	} else if (result.fitType === 'cover') {
		if (imageRatio > containerRatio) {
			result.adaptBenchmark = 'HEIGHT'
			result.scaledHeight = containerHeight
			result.scaledWidth = result.scaledHeight * imageRatio
			result.offsetX = (result.containerWidth - result.scaledWidth) / 2
			result.offsetY = 0
		} else {
			result.adaptBenchmark = 'WIDTH'
			result.scaledWidth = containerWidth
			result.scaledHeight = result.scaledWidth / imageRatio
			result.offsetX = 0
			result.offsetY = (result.containerHeight - result.scaledHeight) / 2
		}
	} else if (result.fitType === 'fit') {
		if (imageRatio > containerRatio) {
			result.adaptBenchmark = 'WIDTH'
			result.scaledWidth = Math.min(naturalWidth, containerWidth)
			result.scaledHeight = result.scaledWidth / imageRatio
			result.offsetX = naturalWidth <= containerWidth ? (containerWidth - naturalWidth) / 2 : 0
			result.offsetY = (result.containerHeight - result.scaledHeight) / 2
		} else {
			result.adaptBenchmark = 'HEIGHT'
			result.scaledHeight = Math.min(naturalHeight, containerHeight)
			result.scaledWidth = result.scaledHeight * imageRatio
			result.offsetX = (result.containerWidth - result.scaledWidth) / 2
			result.offsetY = naturalHeight <= containerHeight ? (containerHeight - naturalHeight) / 2 : 0
		}
	} else if (fitType === 'original') {
		if (imageRatio > containerRatio) {
			result.adaptBenchmark = 'WIDTH'
			result.scaledWidth = naturalWidth
			result.scaledHeight = naturalHeight
			result.offsetX = (containerWidth - naturalWidth) / 2
			result.offsetY = (containerHeight - naturalHeight) / 2
		} else {
			result.adaptBenchmark = 'HEIGHT'
			result.scaledWidth = naturalWidth
			result.scaledHeight = naturalHeight
			result.offsetX = (containerWidth - naturalWidth) / 2
			result.offsetY = (containerHeight - naturalHeight) / 2
		}
	}
	result.scaleRatio = result.scaledWidth / naturalWidth
	return result
}
export function createTransformString(benchmark: 'WIDTH' | 'HEIGHT', offset: number): { left: number | string; top: number | string } {
	if (benchmark === 'WIDTH') {
		return {
			left: 0,
			top: `${offset}px`,
		}
	}
	if (benchmark === 'HEIGHT') {
		return {
			left: `${offset}px`,
			top: 0,
		}
	}
	return {
		left: 0,
		top: 0,
	}
}
