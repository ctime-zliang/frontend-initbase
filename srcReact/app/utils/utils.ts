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

export function getHashIden(length: number = 36): string {
	const s: Array<string> = []
	const HEX_DIGITS: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	for (let i: number = 0; i < length; i++) {
		s[i] = HEX_DIGITS.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] && (s[14] = String(getRandomInArea(1, 9)))
	s[19] && (s[19] = HEX_DIGITS.substr(((+s[19] as number) & 0x3) | 0x8, 1))
	s[8] && (s[8] = String(getRandomInArea(1, 9)))
	s[13] && (s[13] = String(getRandomInArea(1, 9)))
	s[18] && (s[18] = String(getRandomInArea(1, 9)))
	s[23] && (s[23] = String(getRandomInArea(1, 9)))
	return s.join('')
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
export function isEmptyObject(obj: PlainObject): boolean {
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
 * 打开系统文件选择对话框选择文件
 *      返回文件对象数组
 */
export async function selectPlatformFiles(
	options: {
		itemMaxSize?: number
		accept?: string
		multiple?: boolean
	} = {},
	appendElement?: HTMLElement | HTMLBodyElement
): Promise<{ code: number; data: { files: Array<File>; overs: Array<File> } | null; msg: string }> {
	return new Promise((resolve): void => {
		const itemMaxSize: number = options.itemMaxSize || 50 * 1024 * 1024
		const inputElement = document.createElement('input')
		inputElement.style.position = 'absolute'
		inputElement.style.left = `0`
		inputElement.style.top = `0`
		inputElement.style.zIndex = `-999`
		inputElement.style.visibility = 'hidden'
		inputElement.style.width = `1px`
		inputElement.style.height = `1px`
		inputElement.style.outline = `0`
		inputElement.type = 'file'
		inputElement.accept = options.accept || '*'
		inputElement.multiple = options.multiple || false
		if (appendElement) {
			appendElement.appendChild(inputElement)
		}
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
				resolve({ code: -1002, data: null, msg: 'no file selected.' })
			}
		})
		inputElement.addEventListener('cancel', function (): void {
			resolve({ code: -1001, data: null, msg: 'cancel file selection.' })
		})
		inputElement.click()
		if (appendElement) {
			inputElement.remove()
		}
	})
}

/**
 * 解析 URL 参数
 */
export function parseURLParams(url: string): { [key: string]: any } {
	const params: { [key: string]: any } = {}
	let queryString: string = url.split('?')[1]
	if (!queryString) {
		return params
	}
	queryString = queryString.split('#')[0]
	let pairs: Array<string> = queryString.split('&')
	for (let i: number = 0; i < pairs.length; i++) {
		let pair: string = pairs[i]
		let index: number = pair.indexOf('=')
		let key: string = undefined!
		let value: any = undefined!
		if (index === -1) {
			key = decodeURIComponent(pair)
			value = ''
			continue
		}
		key = decodeURIComponent(pair.substring(0, index))
		value = decodeURIComponent(pair.substring(index + 1))
		params[key] = value
	}
	return params
}

export function viewMatrix(containerElement: HTMLElement, data: Array<number>, row: number, col: number, title?: string): void {
	if (row * col !== data.length) {
		throw new Error('illegal matrix.')
	}
	let matrixTitle: string = title || `Matrix ${row}x${col}`
	let htmlStrArr: Array<string> = []
	htmlStrArr.push(
		`<div style="display: inline-flex; flex-direction: column; justify-content: center; width: fit-content; border: 1px solid #dcdcdc;box-sizing: border-box; margin: 10px 10px;">`
	)
	htmlStrArr.push(`<h4 style="padding: 5px 10px; margin: 0; text-align: center;">${matrixTitle}</h4>`)
	htmlStrArr.push(`<table border="0" cellspacing="0" cellpadding="0" style="text-align: center;">`)
	htmlStrArr.push(`<tbody>`)
	for (let ri: number = 0; ri <= row - 1; ri++) {
		htmlStrArr.push(`<tr>`)
		for (let ci = 0; ci <= col - 1; ci++) {
			const index = ci + ri * col
			htmlStrArr.push(`<td style="padding: 5px 5px; min-width: 50px;">${data[index]}</td>`)
		}
		htmlStrArr.push(`</tr>`)
	}
	htmlStrArr.push(`</tbody>`)
	htmlStrArr.push(`</table>`)
	htmlStrArr.push(`</div>`)
	const fragmentElement: DocumentFragment = document.createRange().createContextualFragment(htmlStrArr.join('\n'))
	containerElement.appendChild(fragmentElement)
}

export function arrayCopy(
	sourceArray: Array<number>,
	sourceIndex: number,
	resultArray: Array<number>,
	resultIndex: number,
	copyLength: number
): void {
	if (sourceArray.length >= sourceIndex + copyLength && resultArray.length >= resultIndex + copyLength) {
		while (copyLength-- > 0) {
			resultArray[resultIndex++] = sourceArray[sourceIndex++]
		}
		return
	}
	throw new Error('cannot read array out of range.')
}
