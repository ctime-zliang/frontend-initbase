import { createDefaultProfile, EPointerDirection, EPointerItemsOperations, EPointerType } from './profile'
import { TListenerExtendPointerEvent, THandleListeners, TPlainDot, TProfile, TExtendPointer } from './types'

export class Gesture {
	private _hostElements: Array<HTMLElement>
	private _profile: TProfile
	private _handleListeners: THandleListeners
	private _handlePointerDownEventScopeHandler: (e: TListenerExtendPointerEvent) => void
	private _handlePointerMoveEventScopeHandler: (e: TListenerExtendPointerEvent) => void
	private _handlePointerUpEventScopeHandler: (e: TListenerExtendPointerEvent) => void
	private _handlePointerCancelEventScopeHandler: (e: TListenerExtendPointerEvent) => void
	private _handleWheelEventScopeHandler: (e: WheelEvent) => void
	private _handleContextMenuEventScopeHandler: (e: MouseEvent) => void
	constructor(hostElements: Array<HTMLElement>) {
		this._hostElements = hostElements
		this._profile = createDefaultProfile()
		this._handleListeners = {
			pointerdown: [],
			pointerup: [],
			pointermove: [],
			pointercancel: [],
			tap: [],
			longtap: [],
			doubletap: [],
			dragmove: [],
			wheel: [],
			swipe: [],
			pinch: [],
			rotate: [],
			contextmenu: [],
		}
		this.init()
	}

	private init(): void {
		this._handlePointerDownEventScopeHandler = this.handlePointerDownEvent.bind(this)
		this._handlePointerMoveEventScopeHandler = this.handlePointerMoveEvent.bind(this)
		this._handlePointerUpEventScopeHandler = this.handlePointerUpEvent.bind(this)
		this._handlePointerCancelEventScopeHandler = this.handlePointerCancelEvent.bind(this)
		this._handleWheelEventScopeHandler = this.handleWheelEvent.bind(this)
		this._handleContextMenuEventScopeHandler = this.handleContextMenuEvent.bind(this)
		this.bindEvent()
	}

	public destory(): void {
		this.unBindEvent()
	}

	public getAllPointers(): Array<TExtendPointer> {
		return this._profile.pointers
	}

	public clearListeners(
		namespace?:
			| 'pointerdown'
			| 'pointerup'
			| 'pointermove'
			| 'pointercancel'
			| 'tap'
			| 'longtap'
			| 'doubletap'
			| 'dragmove'
			| 'wheel'
			| 'swipe'
			| 'pinch'
			| 'rotate'
			| 'contextmenu'
	): void {
		if (typeof namespace === 'undefined') {
			this._handleListeners.pointerdown.length = 0
			this._handleListeners.pointerup.length = 0
			this._handleListeners.pointermove.length = 0
			this._handleListeners.pointercancel.length = 0
			this._handleListeners.tap.length = 0
			this._handleListeners.longtap.length = 0
			this._handleListeners.doubletap.length = 0
			this._handleListeners.dragmove.length = 0
			this._handleListeners.wheel.length = 0
			this._handleListeners.swipe.length = 0
			this._handleListeners.pinch.length = 0
			this._handleListeners.rotate.length = 0
			this._handleListeners.contextmenu.length = 0
			return
		}
		const callbacks: Array<any> = this._handleListeners[namespace]
		if (callbacks) {
			callbacks.length = 0
		}
	}
	public addPointerDownListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.pointerdown.push(callback)
	}
	public addPointerUpListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.pointerup.push(callback)
	}
	public addPointerMoveListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.pointermove.push(callback)
	}
	public addPointerCancelListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.pointercancel.push(callback)
	}
	public addTapListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.tap.push(callback)
	}
	public addLongTapListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.longtap.push(callback)
	}
	public addDoubleTapListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.doubletap.push(callback)
	}
	public addDragMoveListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				movePosition: string
				moveDirection: string
				distX: number
				distY: number
				diffX: number
				diffY: number
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.dragmove.push(callback)
	}
	public addWheelListener(
		callback: (
			evte: WheelEvent,
			data: {
				scale: number
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.wheel.push(callback)
	}
	public addSwipeListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				direction: EPointerDirection
				distX: number
				distY: number
				releaseX: number
				releaseY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.swipe.push(callback)
	}
	public addPinchListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				scale: number
				centerX: number
				centerY: number
				lastCenterX: number
				lastCenterY: number
				pointA: { x: number; y: number }
				pointB: { x: number; y: number }
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.pinch.push(callback)
	}
	public addRotateListener(
		callback: (
			evte: TListenerExtendPointerEvent,
			data: {
				rotate: number
				centerX: number
				centerY: number
				lastCenterX: number
				lastCenterY: number
				pointA: { x: number; y: number }
				pointB: { x: number; y: number }
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.rotate.push(callback)
	}
	public addContextMenuListener(
		callback: (
			evte: MouseEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	): void {
		this._handleListeners.contextmenu.push(callback)
	}

	private bindEvent(): void {
		for (let i: number = 0; i < this._hostElements.length; i++) {
			const itemElement: HTMLElement = this._hostElements[i]
			itemElement.addEventListener('touchstart', this._handlePointerDownEventScopeHandler)
			itemElement.addEventListener('touchmove', this._handlePointerMoveEventScopeHandler)
			itemElement.addEventListener('touchend', this._handlePointerUpEventScopeHandler)
			itemElement.addEventListener('touchcancel', this._handlePointerCancelEventScopeHandler)
			itemElement.addEventListener('mousedown', this._handlePointerDownEventScopeHandler)
			itemElement.addEventListener('wheel', this._handleWheelEventScopeHandler)
			itemElement.addEventListener('contextmenu', this._handleContextMenuEventScopeHandler)
		}
	}

	private unBindEvent(): void {
		for (let i: number = 0; i < this._hostElements.length; i++) {
			const itemElement: HTMLElement = this._hostElements[i]
			itemElement.removeEventListener('touchstart', this._handlePointerDownEventScopeHandler)
			itemElement.removeEventListener('touchmove', this._handlePointerMoveEventScopeHandler)
			itemElement.removeEventListener('touchend', this._handlePointerUpEventScopeHandler)
			itemElement.removeEventListener('touchcancel', this._handlePointerCancelEventScopeHandler)
			itemElement.removeEventListener('mousedown', this._handlePointerDownEventScopeHandler)
			itemElement.removeEventListener('wheel', this._handleWheelEventScopeHandler)
			itemElement.removeEventListener('contextmenu', this._handleContextMenuEventScopeHandler)
		}
	}

	private getLastOnePointerEvent(): TExtendPointer {
		if (this._profile.pointers.length) {
			return this._profile.pointers[this._profile.pointers.length - 1]
		}
		return {
			clientX: -1,
			clientY: -1,
			pageX: -1,
			pageY: -1,
			radiusX: -1,
			radiusY: -1,
			screenX: -1,
			screenY: -1,
			rotationAngle: 0,
			identifier: -1,
		} as any
	}

	private getCenter(pointA: TPlainDot, pointB: TPlainDot): TPlainDot {
		return { x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2 }
	}

	private getDistance(pointA: TPlainDot, pointB: TPlainDot): number {
		return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)
	}

	private getAngle(pointA: TPlainDot, pointB: TPlainDot): number {
		return (Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x) * 180) / Math.PI
	}

	private updatePointers(evte: TListenerExtendPointerEvent, type: EPointerItemsOperations): void {
		const touches: TouchList = (evte as TouchEvent).touches || []
		const changedTouches: TouchList = (evte as TouchEvent).changedTouches || []
		evte.pointerId = typeof evte.pointerId === 'undefined' && touches.length <= 0 && changedTouches.length <= 0 ? 1 : evte.pointerId
		if (type === EPointerItemsOperations.ADD) {
			if (evte instanceof PointerEvent || evte instanceof MouseEvent) {
				this._profile.pointers.push(evte)
				return
			}
			this._profile.pointers.length = 0
			for (let i: number = 0; i < touches.length; i++) {
				this._profile.pointers.push(touches[i])
			}
			return
		}
		if (type === EPointerItemsOperations.UPDATE) {
			for (let i: number = 0; i < this._profile.pointers.length; i++) {
				if (evte instanceof PointerEvent || evte instanceof MouseEvent) {
					if (this._profile.pointers[i].pointerId === evte.pointerId) {
						this._profile.pointers[i] = evte
						break
					}
					continue
				}
				this._profile.pointers[i] = touches[i]
			}
			return
		}
		if (type === EPointerItemsOperations.DELETE) {
			for (let i: number = this._profile.pointers.length - 1; i >= 0; i--) {
				if (evte instanceof PointerEvent || evte instanceof MouseEvent) {
					if (this._profile.pointers[i].pointerId === evte.pointerId) {
						this._profile.pointers.splice(i, 1)
						break
					}
					continue
				}
				for (let j: number = 0; j < changedTouches.length; j++) {
					if (this._profile.pointers[i].identifier === changedTouches[j].identifier) {
						this._profile.pointers.splice(i, 1)
					}
				}
			}
			return
		}
	}

	private getMovePositionRange(): EPointerDirection {
		if (Math.abs(this._profile.offsetRectAtPointerdown.x) > Math.abs(this._profile.offsetRectAtPointerdown.y)) {
			return this._profile.offsetRectAtPointerdown.x > 0 ? EPointerDirection.RIGHT : EPointerDirection.LEFT
		}
		return this._profile.offsetRectAtPointerdown.y > 0 ? EPointerDirection.DOWN : EPointerDirection.UP
	}

	private getMoveDirection(): EPointerDirection {
		const diffX: number = (this._profile.pointers[0] as Touch).clientX - this._profile.pointerPositionCache.x
		const diffY: number = (this._profile.pointers[0] as Touch).clientY - this._profile.pointerPositionCache.y
		if (Math.abs(diffX) > Math.abs(diffY)) {
			return diffX > 0 ? EPointerDirection.RIGHT : EPointerDirection.LEFT
		}
		return diffY > 0 ? EPointerDirection.DOWN : EPointerDirection.UP
	}

	private handleSwipe(evte: TListenerExtendPointerEvent, lastOnePointerEvent: TExtendPointer): void {
		const MIN_SWIPE_DISTANCE: number = 20
		const MAX_TIME_INTERVAL: number = 200
		let x: number = 0
		let y: number = 0
		let swipeDirection: EPointerDirection = undefined!
		/**
		 * 指针抬起时, 查找与此刻的时间间隔在 ${MAX_TIME_INTERVAL} 以内的"最早"的坐标记录 PA
		 * 并获取此刻指针坐标与 PA 点的距离
		 */
		let i: number = 0
		while (
			i <= this._profile.dotsRecordInPointermove.length - 1 &&
			evte.timeStamp - this._profile.dotsRecordInPointermove[i].timeStamp < MAX_TIME_INTERVAL
		) {
			x = lastOnePointerEvent.clientX - this._profile.dotsRecordInPointermove[i].x
			y = lastOnePointerEvent.clientY - this._profile.dotsRecordInPointermove[i].y
			i++
		}
		if (Math.abs(x) > MIN_SWIPE_DISTANCE || Math.abs(y) > MIN_SWIPE_DISTANCE) {
			if (Math.abs(x) > Math.abs(y)) {
				swipeDirection = x > 0 ? EPointerDirection.RIGHT : EPointerDirection.LEFT
			} else {
				swipeDirection = y > 0 ? EPointerDirection.DOWN : EPointerDirection.UP
			}
			for (let i: number = 0; i < this._handleListeners.swipe.length; i++) {
				this._handleListeners.swipe[i].call(
					undefined,
					evte,
					{
						direction: swipeDirection,
						distX: x,
						distY: y,
						releaseX: lastOnePointerEvent.clientX,
						releaseY: lastOnePointerEvent.clientY,
					},
					this
				)
			}
		}
	}

	private handlePointerDownEvent(evte: TListenerExtendPointerEvent): void {
		if (this._profile.preventDefaultOnPointerdown) {
			evte.preventDefault()
		}
		if (!this._profile.triggerEventType && (evte as TouchEvent).touches) {
			this._profile.triggerEventType = EPointerType.TOUCH_EVENT
		}
		if ((evte.type === 'mousedown' && (evte as MouseEvent).button !== 0) || (this._profile.triggerEventType && evte.type[0] === 'm')) {
			return
		}
		this.updatePointers(evte, EPointerItemsOperations.ADD)
		this._profile.isPointerdown = true
		if (this._profile.pointers.length === 1) {
			document.addEventListener('mousemove', this._handlePointerMoveEventScopeHandler)
			document.addEventListener('mouseup', this._handlePointerUpEventScopeHandler)
			window.clearTimeout(this._profile.tapCountRestTimer)
			const lastOnePointerEvent: TExtendPointer = this.getLastOnePointerEvent()
			this._profile.dotsRecordInPointerdown[0] = {
				x: lastOnePointerEvent.clientX,
				y: lastOnePointerEvent.clientY,
			}
			this._profile.lastDotsRecordInPointerdown[0] = {
				x: lastOnePointerEvent.clientX,
				y: lastOnePointerEvent.clientY,
			}
			const pointer1: TExtendPointer = this._profile.pointers[0]
			const dotRecordInPointerdown1: TPlainDot = this._profile.dotsRecordInPointerdown[0]
			const lastDotRecordInPointerdown1: TPlainDot = this._profile.lastDotsRecordInPointerdown[0]
			this._profile.tapCount++
			this._profile.movePositionRange = ''
			this._profile.moveDirection = ''
			this._profile.dotsRecordInPointermove.length = 0
			this._profile.offsetRectAtPointerdown.x = 0
			this._profile.offsetRectAtPointerdown.y = 0
			this._profile.lastOffsetRectAtPointerdown.x = 0
			this._profile.lastOffsetRectAtPointerdown.y = 0
			this._profile.pointerPositionCache.x = pointer1.clientX
			this._profile.pointerPositionCache.y = pointer1.clientY
			if (this._profile.tapCount > 1) {
				if (
					Math.abs(dotRecordInPointerdown1.x - lastDotRecordInPointerdown1.x) > 30 ||
					Math.abs(dotRecordInPointerdown1.y - lastDotRecordInPointerdown1.y) > 30
				) {
					this._profile.tapCount = 1
				}
			}
			if (this._profile.tapCount === 1) {
				this._profile.longTapTimeout = window.setTimeout((): void => {
					this._profile.tapCount = 0
					for (let i: number = 0; i < this._handleListeners.longtap.length; i++) {
						this._handleListeners.longtap[i].call(
							undefined,
							evte,
							{
								clientX: dotRecordInPointerdown1.x,
								clientY: dotRecordInPointerdown1.y,
							},
							this
						)
					}
				}, this._profile.delayOfLongTapDispatch)
			}
			this._profile.lastDotsRecordInPointerdown[0] = {
				x: this._profile.pointers[0].clientX,
				y: this._profile.pointers[0].clientY,
			}
		}
		if (this._profile.pointers.length === 2) {
			if (this._profile.preventDefaultOnDoublePointersdown) {
				evte.preventDefault()
			}
			window.clearTimeout(this._profile.longTapTimeout)
			const lastOnePointerEvent: TExtendPointer = this.getLastOnePointerEvent()
			this._profile.dotsRecordInPointerdown[1] = {
				x: lastOnePointerEvent.clientX,
				y: lastOnePointerEvent.clientY,
			}
			this._profile.lastDotsRecordInPointerdown[1] = {
				x: lastOnePointerEvent.clientX,
				y: lastOnePointerEvent.clientY,
			}
			const pointer1: TExtendPointer = this._profile.pointers[0]
			const pointer2: TExtendPointer = this._profile.pointers[1]
			const dotRecordInPointerdown1: TPlainDot = this._profile.dotsRecordInPointerdown[0]
			const dotRecordInPointerdown2: TPlainDot = this._profile.dotsRecordInPointerdown[1]
			const lastDotRecordInPointerdown1: TPlainDot = this._profile.lastDotsRecordInPointerdown[0]
			const lastDotRecordInPointerdown2: TPlainDot = this._profile.lastDotsRecordInPointerdown[1]
			this._profile.tapCount = 0
			this._profile.lastOffsetRectAtPointerdown.x = this._profile.offsetRectAtPointerdown.x
			this._profile.lastOffsetRectAtPointerdown.y = this._profile.offsetRectAtPointerdown.y
			const center: TPlainDot = this.getCenter(dotRecordInPointerdown1, dotRecordInPointerdown2)
			this._profile.centerPositionCacheOfMultiPointers.x = center.x
			this._profile.centerPositionCacheOfMultiPointers.y = center.y
			this._profile.lastDotsRecordInPointerdown[0] = {
				x: this._profile.pointers[0].clientX,
				y: this._profile.pointers[0].clientY,
			}
			this._profile.lastDotsRecordInPointerdown[1] = {
				x: this._profile.pointers[1].clientX,
				y: this._profile.pointers[1].clientY,
			}
		}
		const lastOnePointerEvent: TExtendPointer = this.getLastOnePointerEvent()
		for (let i: number = 0; i < this._handleListeners.pointerdown.length; i++) {
			this._handleListeners.pointerdown[i].call(
				undefined,
				evte,
				{
					clientX: lastOnePointerEvent.clientX,
					clientY: lastOnePointerEvent.clientY,
				},
				this
			)
		}
	}

	private handlePointerMoveEvent(evte: TListenerExtendPointerEvent): void {
		if (!this._profile.isPointerdown) {
			return
		}
		this.updatePointers(evte, EPointerItemsOperations.UPDATE)
		if (this._profile.pointers.length === 1) {
			const pointer1: TExtendPointer = this._profile.pointers[0]
			const dotRecordInPointerdown1: TPlainDot = this._profile.dotsRecordInPointerdown[0]
			const lastDotRecordInPointerdown1: TPlainDot = this._profile.lastDotsRecordInPointerdown[0]
			this._profile.offsetRectAtPointerdown.x = pointer1.clientX - dotRecordInPointerdown1.x + this._profile.lastOffsetRectAtPointerdown.x
			this._profile.offsetRectAtPointerdown.y = pointer1.clientY - dotRecordInPointerdown1.y + this._profile.lastOffsetRectAtPointerdown.y
			this._profile.dotsRecordInPointermove.unshift({
				x: pointer1.clientX,
				y: pointer1.clientY,
				timeStamp: evte.timeStamp,
			})
			if (this._profile.dotsRecordInPointermove.length > this._profile.maxLengthDotsRecordInPointermove) {
				this._profile.dotsRecordInPointermove.pop()
			}
			if (Math.abs(this._profile.offsetRectAtPointerdown.x) >= 3 || Math.abs(this._profile.offsetRectAtPointerdown.y) >= 3) {
				window.clearTimeout(this._profile.longTapTimeout)
				this._profile.tapCount = 0
				this._profile.movePositionRange = this.getMovePositionRange()
			}
			this._profile.moveDirection = this.getMoveDirection()
			for (let i: number = 0; i < this._handleListeners.dragmove.length; i++) {
				this._handleListeners.dragmove[i].call(
					undefined,
					evte,
					{
						movePosition: this._profile.movePositionRange,
						moveDirection: this._profile.moveDirection,
						distX: this._profile.offsetRectAtPointerdown.x,
						distY: this._profile.offsetRectAtPointerdown.y,
						diffX: pointer1.clientX - this._profile.pointerPositionCache.x,
						diffY: pointer1.clientY - this._profile.pointerPositionCache.y,
						clientX: pointer1.clientX,
						clientY: pointer1.clientY,
					},
					this
				)
			}
			this._profile.pointerPositionCache.x = pointer1.clientX
			this._profile.pointerPositionCache.y = pointer1.clientY
		}
		if (this._profile.pointers.length === 2) {
			const pointer1: TExtendPointer = this._profile.pointers[0]
			const pointer2: TExtendPointer = this._profile.pointers[1]
			const dotRecordInPointerdown1: TPlainDot = this._profile.dotsRecordInPointerdown[0]
			const dotRecordInPointerdown2: TPlainDot = this._profile.dotsRecordInPointerdown[1]
			const lastDotRecordInPointerdown1: TPlainDot = this._profile.lastDotsRecordInPointerdown[0]
			const lastDotRecordInPointerdown2: TPlainDot = this._profile.lastDotsRecordInPointerdown[1]
			const center: TPlainDot = this.getCenter({ x: pointer1.clientX, y: pointer1.clientY }, { x: pointer2.clientX, y: pointer2.clientY })
			const rotate: number =
				this.getAngle({ x: pointer1.clientX, y: pointer1.clientY }, { x: pointer2.clientX, y: pointer2.clientY }) -
				this.getAngle(lastDotRecordInPointerdown1, lastDotRecordInPointerdown2)
			for (let i: number = 0; i < this._handleListeners.rotate.length; i++) {
				this._handleListeners.rotate[i].call(
					undefined,
					evte,
					{
						rotate,
						centerX: center.x,
						centerY: center.y,
						lastCenterX: this._profile.centerPositionCacheOfMultiPointers.x,
						lastCenterY: this._profile.centerPositionCacheOfMultiPointers.y,
						pointA: { x: pointer1.clientX, y: pointer1.clientY },
						pointB: { x: pointer2.clientX, y: pointer2.clientY },
					},
					this
				)
			}
			const scale: number =
				this.getDistance({ x: pointer1.clientX, y: pointer1.clientY }, { x: pointer2.clientX, y: pointer2.clientY }) /
				this.getDistance(lastDotRecordInPointerdown1, lastDotRecordInPointerdown2)
			for (let i: number = 0; i < this._handleListeners.pinch.length; i++) {
				this._handleListeners.pinch[i].call(
					undefined,
					evte,
					{
						scale,
						centerX: center.x,
						centerY: center.y,
						lastCenterX: this._profile.centerPositionCacheOfMultiPointers.x,
						lastCenterY: this._profile.centerPositionCacheOfMultiPointers.y,
						pointA: { x: pointer1.clientX, y: pointer1.clientY },
						pointB: { x: pointer2.clientX, y: pointer2.clientY },
					},
					this
				)
			}
			this._profile.centerPositionCacheOfMultiPointers.x = center.x
			this._profile.centerPositionCacheOfMultiPointers.y = center.y
			lastDotRecordInPointerdown1.x = pointer1.clientX
			lastDotRecordInPointerdown1.y = pointer1.clientY
			lastDotRecordInPointerdown2.x = pointer2.clientX
			lastDotRecordInPointerdown2.y = pointer2.clientY
		}
		const lastOnePointerEvent: TExtendPointer = this.getLastOnePointerEvent()
		for (let i: number = 0; i < this._handleListeners.pointermove.length; i++) {
			this._handleListeners.pointermove[i].call(
				undefined,
				evte,
				{
					clientX: lastOnePointerEvent.clientX,
					clientY: lastOnePointerEvent.clientY,
				},
				this
			)
		}
	}

	private handlePointerUpEvent(evte: TListenerExtendPointerEvent): void {
		if (!this._profile.isPointerdown) {
			return
		}
		const lastOnePointerEvent: TExtendPointer = this.getLastOnePointerEvent()
		this.updatePointers(evte, EPointerItemsOperations.DELETE)
		if (this._profile.pointers.length === 0) {
			window.clearTimeout(this._profile.longTapTimeout)
			this._profile.isPointerdown = false
			this._profile.movePositionRange = ''
			this._profile.moveDirection = ''
			if (this._profile.tapCount === 0) {
				this.handleSwipe(evte, lastOnePointerEvent)
			} else {
				for (let i: number = 0; i < this._handleListeners.tap.length; i++) {
					this._handleListeners.tap[i].call(
						undefined,
						evte,
						{
							clientX: lastOnePointerEvent.clientX,
							clientY: lastOnePointerEvent.clientY,
						},
						this
					)
				}
				if (this._profile.tapCount >= 2) {
					this._profile.tapCount = 0
					for (let i: number = 0; i < this._handleListeners.pointerup.length; i++) {
						this._handleListeners.pointerup[i].call(
							undefined,
							evte,
							{
								clientX: lastOnePointerEvent.clientX,
								clientY: lastOnePointerEvent.clientY,
							},
							this
						)
					}
				}
				this._profile.tapCountRestTimer = window.setTimeout(() => {
					this._profile.tapCount = 0
				}, 400)
			}
		} else if (this._profile.pointers.length === 1) {
			const pointer1: TExtendPointer = this._profile.pointers[0]
			const dotRecordInPointerdown1: TPlainDot = this._profile.dotsRecordInPointerdown[0]
			const lastDotRecordInPointerdown1: TPlainDot = this._profile.lastDotsRecordInPointerdown[0]
			dotRecordInPointerdown1.x = pointer1.clientX
			dotRecordInPointerdown1.y = pointer1.clientY
			this._profile.pointerPositionCache.x = pointer1.clientX
			this._profile.pointerPositionCache.y = pointer1.clientY
		}
		if (this._profile.pointers.length <= 1) {
			/**
			 * 少于两指的情形下
			 *      重置多指几何中心坐标
			 */
			this._profile.centerPositionCacheOfMultiPointers.x = 0
			this._profile.centerPositionCacheOfMultiPointers.y = 0
		}
		for (let i: number = 0; i < this._handleListeners.pointerup.length; i++) {
			this._handleListeners.pointerup[i].call(
				undefined,
				evte,
				{
					clientX: lastOnePointerEvent.clientX,
					clientY: lastOnePointerEvent.clientY,
				},
				this
			)
		}
		if (this._profile.pointers.length <= 0) {
			document.removeEventListener('mousemove', this._handlePointerMoveEventScopeHandler)
			document.removeEventListener('mouseup', this._handlePointerUpEventScopeHandler)
		}
	}

	private handlePointerCancelEvent(evte: TListenerExtendPointerEvent): void {
		const lastOnePointerEvent: TExtendPointer = this.getLastOnePointerEvent()
		window.clearTimeout(this._profile.longTapTimeout)
		this._profile.isPointerdown = false
		this._profile.tapCount = 0
		this.updatePointers(evte, EPointerItemsOperations.DELETE)
		for (let i: number = 0; i < this._handleListeners.pointercancel.length; i++) {
			this._handleListeners.pointercancel[i].call(
				undefined,
				evte,
				{
					clientX: lastOnePointerEvent.clientX,
					clientY: lastOnePointerEvent.clientY,
				},
				this
			)
		}
		if (this._profile.pointers.length <= 0) {
			document.removeEventListener('mousemove', this._handlePointerMoveEventScopeHandler)
			document.removeEventListener('mouseup', this._handlePointerUpEventScopeHandler)
		}
	}

	private handleWheelEvent(evte: WheelEvent): void {
		const scale: number = evte.deltaY > 0 ? this._profile.zoomOutWheelRatio : this._profile.zoomInWheelRatio
		for (let i: number = 0; i < this._handleListeners.wheel.length; i++) {
			this._handleListeners.wheel[i].call(
				undefined,
				evte,
				{
					scale,
					clientX: evte.clientX,
					clientY: evte.clientY,
				},
				this
			)
		}
	}

	private handleContextMenuEvent(evte: MouseEvent): void {
		for (let i: number = 0; i < this._handleListeners.contextmenu.length; i++) {
			this._handleListeners.contextmenu[i].call(
				undefined,
				evte,
				{
					clientX: evte.clientX,
					clientY: evte.clientY,
				},
				this
			)
		}
	}
}
