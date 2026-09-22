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
export function throttleTimeout<T extends (...args: any[]) => any>(fn: T, delay: number): T {
	let lastCall = 0
	let timer: ReturnType<typeof setTimeout> | null = null
	return ((...args: any[]) => {
		const now = Date.now()
		const remaining = delay - (now - lastCall)
		if (remaining <= 0) {
			if (timer) {
				clearTimeout(timer)
				timer = null
			}
			lastCall = now
			fn(...args)
		} else if (!timer) {
			timer = setTimeout(() => {
				lastCall = Date.now()
				timer = null
				fn(...args)
			}, remaining)
		}
	}) as T
}
