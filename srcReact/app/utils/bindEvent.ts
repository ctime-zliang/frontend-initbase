/**
 * @description 绑定事件
 * @function bindEvent
 * @param {htmllement|string} host 事件的真实宿主元素或用于捕获宿主的选择器
 * @param {string} eventName 事件名称
 * @param {string} selector 触发事件的元素选择器(可选)
 *      如果此项不是一个字符串, 则内部将把此参数作为 callback 处理
 * @param {function} callback 事件处理器
 * @param {boolean} capture 设定以在冒泡/捕获阶段执行事件
 * @return {function}
 */
export function bindEvent(
	host: string | HTMLElement,
	eventName: string,
	selector: string | ((e: Event) => void) = null!,
	callback: (e: Event) => void = null!,
	capture: boolean = false
): (e: Event) => void {
	let hostElement: string | HTMLElement = host
	if (typeof host === 'string') {
		hostElement = document.querySelector(host) as HTMLElement
	}
	if (!hostElement || !eventName || typeof eventName !== 'string' || typeof arguments[2] == 'undefined') {
		return null!
	}
	let _capture: boolean = !!capture
	let _selector: string | ((e: Event) => void) = selector
	let _callback: (e: Event) => void = callback
	if (typeof selector === 'function') {
		_callback = selector
		_capture = !!callback
		_selector = null!
	}
	const handler = function (e: Event): void {
		if (!_selector) {
			//@ts-ignore
			_callback && _callback.call(this, e)
			return
		}
		const targetCapture: HTMLElement = bindEventCaptureTargetElement(_selector as string, e.target as HTMLElement, hostElement as HTMLElement)
		if (targetCapture) {
			_callback && _callback.call(targetCapture, e)
		}
	}
	;(hostElement as HTMLElement).addEventListener(eventName, handler, _capture)
	return handler
}
function bindEventCaptureTargetElement(selector: string, startChildElement: HTMLElement, endParentElemet: HTMLElement): HTMLElement {
	try {
		const targetElementsArray: Array<HTMLElement> = Array.from(endParentElemet.querySelectorAll(selector))
		if (!targetElementsArray.length) {
			return null!
		}
		let startFindElement: HTMLElement = startChildElement
		while (startFindElement) {
			if (startFindElement === endParentElemet.parentElement) {
				return null!
			}
			if (targetElementsArray.includes(startFindElement)) {
				return startFindElement
			}
			startFindElement = startFindElement.parentElement as HTMLElement
		}
		return startFindElement
	} catch (e: any) {
		console.warn(`[bindEvent]: error finding html-element.`)
		console.warn(e)
		return null!
	}
}

/**
 * @description 解除绑定事件
 * @function ven$unbindEvent
 * @param {htmllement|string} host 事件的真实宿主元素或用于捕获宿主的选择器
 * @param {string} eventName 事件名称
 * @param {function} handler 事件处理器
 *      此处的 handler 必须是使用 ven$bindEvent 函数后返回的 handler
 * @return {undefined}
 */
export function unbindEvent(host: string | HTMLElement, eventName: string, handler: (e: Event) => void): void {
	let hostElement: string | HTMLElement = host
	if (typeof host === 'string') {
		hostElement = document.querySelector(host) as HTMLElement
	}
	if (!hostElement || !eventName || typeof eventName !== 'string' || typeof arguments[2] == 'undefined' || !(handler instanceof Function)) {
		return
	}
	;(hostElement as HTMLElement).removeEventListener(eventName, handler)
}
