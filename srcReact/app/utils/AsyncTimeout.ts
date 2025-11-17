type TTaskStartExecListener = (optional: { attempt: number; timeStamp: number; maxRetries: number; timeout: number; intervalDelay: number }) => void
type TTaskEndExecListener = (
	finished: boolean,
	result: any,
	optional: { attempt: number; timeStamp: number; maxRetries: number; isTimeout: boolean; timeout: number; intervalDelay: number }
) => void

const TIMEOUT_TAG: string = '__ASYNC_TIMEOUT_ERROR__'
export class AsyncTimeout {
	private _isRuning: boolean
	private _isCanceled: boolean
	private _maxRetries: number
	private _timeout: number
	private _intervalDelay: number
	private _taskStartExecListeners: Array<TTaskStartExecListener>
	private _taskEndExecListeners: Array<TTaskEndExecListener>
	constructor(maxRetries: number = 1, timeout: number = 5000, intervalDelay: number = 500) {
		this._isRuning = false
		this._isCanceled = false
		this._maxRetries = maxRetries
		this._timeout = timeout
		this._intervalDelay = intervalDelay
		this._taskStartExecListeners = []
		this._taskEndExecListeners = []
	}

	public cancel(): void {
		this._isCanceled = true
	}

	public addTaskStartExecListener(taskItem: TTaskStartExecListener): void {
		this._taskStartExecListeners.push(taskItem)
	}
	public addTaskEndListener(taskItem: TTaskEndExecListener): void {
		this._taskEndExecListeners.push(taskItem)
	}

	public clearTaskStartExecListeners(): void {
		this._taskStartExecListeners = []
	}
	public clearTaskEndListeners(): void {
		this._taskEndExecListeners = []
	}

	public async exec(fn: () => Promise<any>): Promise<any> {
		if (this._isRuning) {
			return
		}
		this._isCanceled = false
		this._isRuning = true
		let attempt: number = 0
		let isTimeout: boolean = false
		let successed: boolean = false
		let result: any = undefined!
		while (attempt < this._maxRetries) {
			if (this._isCanceled) {
				return
			}
			try {
				const timeStamp: number = new Date().getTime()
				for (let taskItem of this._taskStartExecListeners) {
					taskItem({
						attempt,
						timeStamp,
						maxRetries: this._maxRetries,
						timeout: this._timeout,
						intervalDelay: this._intervalDelay,
					})
				}
				result = await Promise.race([
					fn(),
					new Promise((resolve, reject): void => {
						window.setTimeout((): void => {
							reject({ __$$innner_tag__: TIMEOUT_TAG })
						}, this._timeout)
					}),
				])
				successed = true
				isTimeout = false
			} catch (error: any) {
				result = error
				successed = false
				isTimeout = error && error.__$$innner_tag__ === TIMEOUT_TAG ? true : false
			}
			if (this._isCanceled) {
				return
			}
			const timeStamp: number = new Date().getTime()
			for (let taskItem of this._taskEndExecListeners) {
				taskItem(successed, result, {
					attempt,
					timeStamp,
					maxRetries: this._maxRetries,
					timeout: this._timeout,
					isTimeout,
					intervalDelay: this._intervalDelay,
				})
			}
			if (successed) {
				this._isRuning = false
				return result
			}
			attempt++
			if (attempt >= this._maxRetries) {
				this._isRuning = false
				throw result
			}
			await new Promise((resolve): void => {
				window.setTimeout((): void => {
					resolve(null)
				}, this._intervalDelay)
			})
		}
	}
}
