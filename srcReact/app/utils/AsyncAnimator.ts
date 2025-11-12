export class AsyncAnimator {
	private _duration: number
	private _updateCall: (p1: number, p2: number) => void
	private _easingHandler: (progress: number) => number | undefined
	private _cancel: () => void
	constructor(duration: number, updateCall: (p1: number, p2: number) => void, easingHandler?: (progress: number) => number) {
		this._duration = duration
		this._updateCall = updateCall
		this._easingHandler = easingHandler!
	}

	public get cancel(): () => void {
		return this._cancel
	}

	public animate(startTime: number = 0): Promise<number> {
		const duration: number = this._duration
		const updateCall: (p1: number, p2: number) => void = this._updateCall
		const easingHandler: (progress: number) => number | undefined = this._easingHandler
		let startTime2: number = startTime || 0
		return new Promise((resolve): void => {
			let qId: number = 0
			const step = (timestamp: number): void => {
				startTime2 = startTime2 || timestamp
				const progress: number = Math.min(1.0, (timestamp - startTime2) / duration)
				updateCall.call(this, easingHandler ? easingHandler(progress)! : progress, progress)
				if (progress < 1.0) {
					qId = window.requestAnimationFrame(step)
				} else {
					resolve(startTime2 + duration)
				}
			}
			this._cancel = (): void => {
				window.cancelAnimationFrame(qId)
				updateCall.call(this, 0, 0)
				resolve(startTime2 + duration)
			}
			qId = window.requestAnimationFrame(step)
		})
	}

	ease(easingHandler: (progress: number) => number): AsyncAnimator {
		return new AsyncAnimator(this._duration, this._updateCall, easingHandler)
	}
}
