/**
 * throttle 节流
 */
export function throttleStamp(fn: (...args: Array<any>) => void, delay: number = 500): () => void {
	let previous: number = 0
	return function (): void {
		let now: number = +new Date()
		if (now - previous > delay) {
			// @ts-ignore
			fn.apply(this, arguments)
			previous = now
		}
	}
}

/**
 * throttle 节流
 */
export function throttleTimeout(fn: (...args: Array<any>) => void, delay: number = 500): () => void {
	let timer: number = null!
	return function (): void {
		if (!timer) {
			timer = window.setTimeout((): void => {
				timer = null!
				// @ts-ignore
				fn.apply(this, arguments)
			}, delay)
		}
	}
}
