type TTaskStartExecListener = (optional: { attempt: number; timeStamp: number; maxRetries: number; timeout: number; intervalDelay: number }) => void
type TTaskSuccessedListener = (
	result: any,
	optional: { attempt: number; timeStamp: number; maxRetries: number; timeout: number; intervalDelay: number }
) => void
type TTaskFailedListener = (
	error: any,
	optional: { attempt: number; timeStamp: number; maxRetries: number; timeout: number; intervalDelay: number }
) => void
export class AsyncTimeout {
	private _maxRetries: number
	private _timeout: number
	private _intervalDelay: number
	private _taskStartExecListeners: Array<TTaskStartExecListener>
	private _taskSuccessedListener: Array<TTaskSuccessedListener>
	private _taskFailedListener: Array<TTaskFailedListener>
	constructor(maxRetries: number = 1, timeout: number = 5000, intervalDelay: number = 500) {
		this._maxRetries = maxRetries
		this._timeout = timeout
		this._intervalDelay = intervalDelay
		this._taskStartExecListeners = []
		this._taskSuccessedListener = []
		this._taskFailedListener = []
	}

	public addTaskStartExecListener(taskItem: TTaskStartExecListener): void {
		this._taskStartExecListeners.push(taskItem)
	}
	public addTaskSuccessedListener(taskItem: TTaskSuccessedListener): void {
		this._taskSuccessedListener.push(taskItem)
	}
	public addTaskFailedListener(taskItem: TTaskFailedListener): void {
		this._taskFailedListener.push(taskItem)
	}

	public clearTaskStartExecListeners(): void {
		this._taskStartExecListeners = []
	}
	public clearTaskSuccessedListeners(): void {
		this._taskSuccessedListener = []
	}
	public clearTaskFailedListeners(): void {
		this._taskFailedListener = []
	}

	public async exec(fn: () => Promise<any>): Promise<any> {
		let attempt: number = 0
		const nowTimeStamp: number = performance.now()
		for (let taskItem of this._taskStartExecListeners) {
			taskItem({
				attempt,
				timeStamp: nowTimeStamp,
				maxRetries: this._maxRetries,
				timeout: this._timeout,
				intervalDelay: this._intervalDelay,
			})
		}
		while (attempt < this._maxRetries) {
			try {
				const result: any = await Promise.race([
					fn(),
					this.timeoutController().then(() => {
						throw new Error('[delay controller] async task timeout...')
					}),
				])
				for (let taskItem of this._taskSuccessedListener) {
					taskItem(result, {
						attempt,
						timeStamp: nowTimeStamp,
						maxRetries: this._maxRetries,
						timeout: this._timeout,
						intervalDelay: this._intervalDelay,
					})
				}
				return result
			} catch (error) {
				for (let taskItem of this._taskFailedListener) {
					taskItem(error, {
						attempt,
						timeStamp: nowTimeStamp,
						maxRetries: this._maxRetries,
						timeout: this._timeout,
						intervalDelay: this._intervalDelay,
					})
				}
				attempt++
				if (attempt === this._maxRetries) {
					throw error
				}
				await this.delayController()
			}
		}
	}

	private delayController(): Promise<null> {
		return new Promise((resolve): void => {
			window.setTimeout((): void => {
				resolve(null)
			}, this._intervalDelay)
		})
	}

	private timeoutController(): Promise<null> {
		return new Promise((resolve): void => {
			window.setTimeout((): void => {
				resolve(null)
			}, this._timeout)
		})
	}
}
