/**
 * 异步等待阻塞
 */
export async function sleep(delay: number = 500, ...args: Array<any>): Promise<Array<any>> {
	return new Promise((_): void => {
		window.setTimeout((): void => {
			_(args)
		}, +delay)
	})
}

/**
 * 同步阻塞
 */
export function blocking(delay: number = 1000): number {
	console.log('%c synchronous blocking start...' + delay + 'ms.', 'color: green; font-size: 18px;')
	const start: number = performance.now()
	let count: number = 0
	while (performance.now() - start <= delay) {
		++count
	}
	console.log('%c synchronous blocking end...', 'color: green; font-size: 18px;')
	return count
}

/**
 * 在指定上下限范围内生成随机数
 */
export function getRandomInArea(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 异步任务执行
 */
export function nextFrameTick(callback: (timeStamp: number) => void, delay: number = 0): void {
	window.setTimeout((): void => {
		window.requestAnimationFrame((timeStamp: number): void => {
			callback(timeStamp)
		})
	}, delay)
}

/**
 * 类型检测
 */
export function classOf(target: any): string {
	return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

/**
 * 判断对象是否为空
 */
export function isEmptyObject(obj: { [key: string]: any }): boolean {
	for (let attr in obj) {
		return false
	}
	return true
}

/**
 * 以 0 补全数值位数
 */
export function padNumber(number: number, allLength: number): string {
	const len: number = String(number).length
	return Array(allLength > len ? allLength - len + 1 || 0 : 0).join('') + number
}

/**
 * 生成指定长度的数组并以固定值填充各位
 */
export function createArray<T extends string>(length: number, value: T = undefined!): Array<string> {
	return new Array(length + 1).join(value).split('')
}

/**
 * 依据 HTML 字符串生成 DOM 片段
 */
export function createElementFragment(htmlString: string, useDOMParser: boolean = false): DocumentFragment | Document {
	if (useDOMParser) {
		return new DOMParser().parseFromString(htmlString, 'text/html')
	}
	return document.createRange().createContextualFragment(htmlString)
}

/**
 * 使用 setTimeout 模拟 setInterval
 */
export function interval(fn: (...args: Array<any>) => void, interval: number, scope: any = undefined): NodeJS.Timeout | null {
	const handler: { timer: NodeJS.Timeout | null } = { timer: null }
	const intv = function (): void {
		fn.call(scope)
		handler.timer = setTimeout(intv, interval)
	}
	handler.timer = setTimeout(intv, interval)
	return handler.timer
}

/**
 * 奇偶判断
 */
export function isOddEven(number: number): boolean {
	return !!(number & 1)
}

/**
 * 递归向上查找指定 className 的元素节点
 */
export function findTargetByClassName(
	element: HTMLElement,
	className: string,
	eventPath: Array<HTMLElement> | ArrayLike<HTMLElement>,
	index: number = 0
): HTMLElement {
	if (!eventPath) {
		return null!
	}
	const nowElement: HTMLElement = eventPath[index] as HTMLElement
	if (!nowElement || (nowElement.nodeType !== 1 && nowElement.nodeType !== 3)) {
		return null!
	}
	if (element.classList.contains(className)) {
		return element
	}
	return findTargetByClassName(element.parentElement!, className, eventPath, ++index)
}
export function findTargetByClassName2(nowElement: HTMLElement, className: string): HTMLElement {
	if (!nowElement || (nowElement.nodeType !== 1 && nowElement.nodeType !== 3)) {
		return null!
	}
	if (nowElement.classList.contains(className)) {
		return nowElement
	}
	return findTargetByClassName2(nowElement.parentElement!, className)
}

/**
 * 精确执行 setTimeout (https://mp.weixin.qq.com/s/v7YJAmMhzSAFzlJXY4mXTg)
 */
export function accurateSetTimeout(
	callback: (options: any, profile: { idealTimeStamp: number; realTimeStamp: number; timeStampDifference: number }) => boolean,
	options: any = undefined!,
	interval: number = (1 / 60) * 1000
): void {
	let loopCount: number = 0
	let startTimeStamp: number = performance.now()
	function instance(): void {
		const idealTimeStamp: number = loopCount++ * interval
		const realTimeStamp: number = performance.now() - startTimeStamp
		const timeStampDifference: number = realTimeStamp - idealTimeStamp
		const result: boolean = callback(options, { idealTimeStamp, realTimeStamp, timeStampDifference })
		if (result === false) {
			return
		}
		window.setTimeout((): void => {
			instance()
		}, interval - timeStampDifference)
	}
	instance()
}

/**
 * 动态引入 script-js
 */
export function importScript(src: string): void {
	const newScriptElement: HTMLScriptElement = document.createElement('script')
	newScriptElement.src = src
	newScriptElement.type = 'text/javascript'
	const nScriptElement: HTMLScriptElement = document.getElementsByTagName('script')[0] as HTMLScriptElement
	;(nScriptElement.parentNode as HTMLElement).insertBefore(newScriptElement, nScriptElement)
}

/**
 * 设置图片自适应容器
 * 		效果参考 CSS 规则 object-fit: contain | cover
 */
export type TZoomImageByContainerResult = {
	adaptBenchmark: 'WIDTH' | 'HEIGHT'
	offset: number
	fitType: 'contain' | 'cover'
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
	fitType: 'contain' | 'cover'
) {
	const result: TZoomImageByContainerResult = {
		adaptBenchmark: undefined!,
		offset: 0,
		fitType,
		scaledWidth: 0,
		scaledHeight: 0,
		naturalWidth,
		naturalHeight,
		containerWidth,
		containerHeight,
	}
	if (!['cover', 'contain'].includes(result.fitType)) {
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
			result.scaledHeight = containerWidth / imageRatio
			result.offset = (result.containerHeight - result.scaledHeight) / 2
		} else {
			result.adaptBenchmark = 'HEIGHT'
			result.scaledHeight = containerHeight
			result.scaledWidth = containerHeight * imageRatio
			result.offset = (result.containerWidth - result.scaledWidth) / 2
		}
	} else if (result.fitType === 'cover') {
		if (imageRatio > containerRatio) {
			result.adaptBenchmark = 'HEIGHT'
			result.scaledHeight = containerHeight
			result.scaledWidth = containerHeight * imageRatio
			result.offset = (result.containerWidth - result.scaledWidth) / 2
		} else {
			result.adaptBenchmark = 'WIDTH'
			result.scaledWidth = containerWidth
			result.scaledHeight = containerWidth / imageRatio
			result.offset = (result.containerHeight - result.scaledHeight) / 2
		}
	}
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

/**
 * 打开系统文件选择对话框选择文件
 *      返回文件对象数组
 */
export async function selectPlatformFiles(
	options: {
		itemMaxSize?: number
		accept?: string
		multiple?: boolean
	} = {}
): Promise<{ code: number; data: { files: Array<File>; overs: Array<File> } | null; msg: string }> {
	return new Promise((resolve): void => {
		const itemMaxSize: number = options.itemMaxSize || 50 * 1024 * 1024
		const inputElement = document.createElement('input')
		inputElement.type = 'file'
		inputElement.accept = options.accept || '*'
		inputElement.multiple = options.multiple || false
		inputElement.addEventListener('change', function (e: Event): void {
			const files: ArrayLike<File> = (e.target as any).files
			const iFiles: Array<File> = []
			const jFiles: Array<File> = []
			if (files.length > 0) {
				for (let i: number = 0; i < files.length; i++) {
					if (files[i].size > itemMaxSize) {
						jFiles.push(files[i])
						break
					}
					iFiles.push(files[i])
				}
				resolve({ code: 0, data: { files: iFiles, overs: jFiles }, msg: '' })
			} else {
				resolve({ code: -1, data: null, msg: 'no file selected.' })
			}
		})
		inputElement.addEventListener('cancel', function (): void {
			resolve({ code: -1, data: null, msg: 'cancel file selection.' })
		})
		inputElement.click()
	})
}
