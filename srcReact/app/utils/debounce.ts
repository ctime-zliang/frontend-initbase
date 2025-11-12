/**
 * debounce 防抖
 * 		option.immediate = true & option.trailing = false
 * 			在高频事件第一次触发时执行一次回调, 事件触发终止 delay 毫秒后也不会再执行回调
 *      option.immediate = true & option.trailing = true
 * 			在高频事件第一次触发时执行一次回调, 事件触发终止 delay 毫秒后会再执行一次回调
 *      option.immediate = false
 * 			在事件触发终止 delay 毫秒后会执行一次回调
 * 			trailing 设置将失效
 */
export function debounce(
	fn: (...args: Array<any>) => void,
	delay: number = 500,
	option: {
		immediate?: boolean
		trailing?: boolean
	} = { immediate: false, trailing: false }
): () => void {
	let timer: number = null!
	return function (): void {
		if (timer) {
			window.clearTimeout(timer)
		}
		if (!option.immediate) {
			timer = window.setTimeout((): void => {
				//@ts-ignore
				fn.apply(this, arguments)
			}, delay)
		} else {
			if (!timer) {
				//@ts-ignore
				fn.apply(this, arguments)
			}
			timer = window.setTimeout((): void => {
				timer = null!
				if (option.trailing) {
					//@ts-ignore
					fn.apply(this, arguments)
				}
			}, delay)
		}
	}
}
