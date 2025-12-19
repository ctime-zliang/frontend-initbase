export class IdleController {
	private _timeout: number
	private _events: Array<string>
	private _timer: number
	private _target: Window
	private _isIdle: boolean
	private _lastActiveTime: number
	private _idleTaskList: Array<() => void>
	private _activeTaskList: Array<() => void>
	private _handleActivityScopeHandler: () => void
	constructor(timeout: number = 5 * 60 * 1000) {
		this._timeout = timeout
		this._events = [
			'mousemove',
			'mousedown',
			'mouseup',
			'keydown',
			'touchstart',
			'touchend',
			'scroll',
			'keyup',
			'pointerdown',
			'pointermove',
			'pointerup',
		]
		this._target = window
		this._timer = null!
		this._isIdle = false
		this._lastActiveTime = Date.now()
		this._idleTaskList = []
		this._activeTaskList = []
		this._handleActivityScopeHandler = this.handleActivity.bind(this)
	}

	public start(): void {
		this.bindEvent()
		this.scheduleIdleCheck()
	}

	public stop(): void {
		this.unBindEvent()
		this.clearTimer()
	}

	public reset(): void {
		this._isIdle = false
		this._lastActiveTime = Date.now()
		this.scheduleIdleCheck()
	}

	public addIdleTaskItem(taskItem: () => void): void {
		this._idleTaskList.push(taskItem)
	}
	public clearAllIdleTaskList(): void {
		this._idleTaskList.length = 0
	}

	public addActiveTaskItem(taskItem: () => void): void {
		this._activeTaskList.push(taskItem)
	}
	public clearActiveIdleTaskList(): void {
		this._activeTaskList.length = 0
	}

	private bindEvent(): void {
		this._events.forEach((event: string): void => this._target.addEventListener(event, this._handleActivityScopeHandler, { passive: true }))
	}

	private unBindEvent(): void {
		this._events.forEach((event: string): void => this._target.removeEventListener(event, this._handleActivityScopeHandler))
	}

	private handleActivity(): void {
		this._lastActiveTime = Date.now()
		if (this._isIdle) {
			this._isIdle = false
			this._activeTaskList.forEach((taskItem: () => void): void => {
				taskItem()
			})
		}
		this.scheduleIdleCheck()
	}

	private scheduleIdleCheck(): void {
		this.clearTimer()
		this._timer = this._target.setTimeout((): void => {
			const now: number = Date.now()
			const idleTime: number = now - this._lastActiveTime
			if (idleTime >= this._timeout && !this._isIdle) {
				this._isIdle = true
				this._idleTaskList.forEach((taskItem: () => void): void => {
					taskItem()
				})
			}
		}, this._timeout)
	}

	private clearTimer(): void {
		if (this._timer) {
			this._target.clearTimeout(this._timer)
			this._timer = null!
		}
	}
}
