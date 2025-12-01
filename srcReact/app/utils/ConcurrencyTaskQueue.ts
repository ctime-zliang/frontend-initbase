/**
 * 批量任务 窗口化执行队列控制器
 */
export class ConcurrencyTaskQueue {
	private _runingCount: number
	private _handleCount: number
	private _queue: Array<(taskIndex: number) => Promise<void>>
	private _results: Array<{ code: number; data: any; msg: string }>
	private _windowSize: number
	private _taskItemStartListeners: Array<(taskIndex: number) => void>
	private _taskItemEndListeners: Array<(result: any) => void>
	private _allTasksFinishListeners: Array<(results: Array<any>) => void>
	constructor(windowSize: number = 5) {
		this._runingCount = 0
		this._handleCount = 0
		this._queue = []
		this._results = []
		this._windowSize = windowSize
		this._taskItemStartListeners = []
		this._taskItemEndListeners = []
		this._allTasksFinishListeners = []
	}

	public resetStatus(): void {
		if (this._runingCount > 0) {
			return
		}
		this._runingCount = 0
		this._handleCount = 0
		this._queue = []
		this._results = []
	}

	public getTaskSize(): number {
		return this._queue.length
	}

	public pushTask(taskItem: (taskIndex: number) => Promise<any>): void {
		this._queue.push(taskItem)
	}

	public addTaskStartListener(callback: (taskIndex: number) => void): void {
		this._taskItemStartListeners.push(callback)
	}
	public clearTaskStartListeners(): void {
		this._taskItemStartListeners.length = 0
	}

	public addTaskEndListener(callback: (result: any) => void): void {
		this._taskItemEndListeners.push(callback)
	}
	public clearTaskEndListeners(): void {
		this._taskItemEndListeners.length = 0
	}

	public addAllTasksFinishListener(callback: (results: Array<any>) => void): void {
		this._allTasksFinishListeners.push(callback)
	}
	public clearAllTasksFinishListeners(): void {
		this._allTasksFinishListeners.length = 0
	}

	public next(): void {
		while (this._runingCount < this._windowSize && this._queue.length > 0) {
			this._runingCount += 1
			this._handleCount += 1
			const taskIndex: number = this._handleCount - 1
			for (let taskItem of this._taskItemStartListeners) {
				taskItem(taskIndex)
			}
			const taskItem: (taskIndex: number) => Promise<any> = this._queue.shift()!
			taskItem(taskIndex)
				.then((result: any): void => {
					this._results.push(result)
					for (let taskItem of this._taskItemEndListeners) {
						taskItem(result)
					}
				})
				.catch((err: any): void => {
					this._results.push(err)
					for (let taskItem of this._taskItemEndListeners) {
						taskItem(err)
					}
				})
				.finally((): void => {
					this._runingCount -= 1
					this.next()
				})
		}
		if (this._runingCount <= 0) {
			for (let taskItem of this._allTasksFinishListeners) {
				taskItem(this._results)
			}
		}
	}
}
