import { Dispatch } from 'react'

export type TTriggerItemCallback = () => boolean

export type TTriggerItem = {
	setState: Dispatch<number>
	callback?: TTriggerItemCallback
}

export abstract class EdaAbstractStore {
	private _$ticket: number
	private _$triggerIndex: number
	private _$triggerMap: Map<number, TTriggerItem>
	private _$triggering: boolean
	constructor() {
		this._$ticket = 0
		this._$triggerIndex = 0
		this._$triggerMap = new Map()
		this._$triggering = false
	}

	protected notify(): void {
		if (this._$triggering) {
			return
		}
		this._$triggering = true
		Promise.resolve().then((): void => {
			++this._$ticket
			this._$triggerMap.forEach((trigger: TTriggerItem): void => {
				if (trigger.callback) {
					const result: boolean = trigger.callback()
					if (result) {
						trigger.setState(this._$ticket)
					}
					return
				}
				trigger.setState(this._$ticket)
			})
			this._$triggering = false
		})
	}

	public createEffect(setState: Dispatch<number>, callback?: TTriggerItemCallback): () => () => void {
		const idx: number = ++this._$triggerIndex
		return (): (() => void) => {
			this._$triggerMap.set(idx, { setState, callback })
			return (): void => {
				this._$triggerMap.delete(idx)
			}
		}
	}
}
