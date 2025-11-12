export class StepControl {
	private _initialValue: number
	private _stepSize: number
	private _maxValue: number
	private _setValue: number
	private _lastTimeStamp: number
	constructor(initialValue: number, stepSize: number, maxValue: number = Number.MAX_SAFE_INTEGER) {
		this._initialValue = initialValue
		this._setValue = initialValue
		this._stepSize = stepSize
		this._maxValue = maxValue
		this._lastTimeStamp = performance.now()
	}

	public updateLastStamp(): void {
		this._lastTimeStamp = performance.now()
	}

	public getNextValue(): number {
		const now: number = performance.now()
		const elapsed: number = now - this._lastTimeStamp
		this._lastTimeStamp = now
		this._setValue = this._setValue + (this._stepSize * elapsed) / 1000.0
		if (this._setValue > this._maxValue) {
			this._setValue = this._initialValue
		}
		return this._setValue
	}
}
