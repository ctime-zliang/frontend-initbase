type TActionData = {
	suspenseElement: HTMLElement
	offsetX: number
	offsetY: number
	downX: number
	downY: number
	moveX: number
	moveY: number
}
export class ListDrag {
	private _isUseMouseSimulation: boolean
	private _listContainer: HTMLElement
	private _handleTargetElement: HTMLElement
	private _isMouseDown: boolean
	private _targetOffsetWidth: number
	private _actionData: TActionData
	private _onDragStartActionDegScopeHandler: (e: DragEvent) => void
	private _onMouseDownActionDegScopeHandler: (e: MouseEvent) => void
	private _onMouseMoveActionDegScopeHandler: (e: MouseEvent) => void
	private _onMouseUpActionDegScopeHandler: (e: MouseEvent) => void
	private _onDragStartActionBrowserScopeHandler: (e: DragEvent) => void
	private _onDragOverActionBrowserScopeHandler: (e: DragEvent) => void
	private _onDragEnterActionBrowserScopeHandler: (e: DragEvent) => void
	private _onDragDropActionBrowserScopeHandler: (e: DragEvent) => void
	private _onDragEndActionBrowserScopeHandler: (e: DragEvent) => void
	private _onDragStartEventListeners: Array<(targetElement: HTMLElement, e: DragEvent | MouseEvent) => void>
	private _onDragEndEventListeners: Array<(targetElement: HTMLElement, e: DragEvent | MouseEvent) => void>
	private _onDragDropEventListeners: Array<(targetElement: HTMLElement, e: DragEvent | MouseEvent) => void>
	private _onDragOverEventListeners: Array<(targetElement: HTMLElement, e: DragEvent | MouseEvent) => void>
	private _onDragEnterEventListeners: Array<(targetElement: HTMLElement, e: DragEvent | MouseEvent) => void>
	constructor(listContainer: HTMLElement, isUseMouseSimulation: boolean = false) {
		this._isUseMouseSimulation = isUseMouseSimulation
		this._listContainer = listContainer
		this._handleTargetElement = null!
		this._isMouseDown = false
		this._targetOffsetWidth = 0
		this._actionData = {
			suspenseElement: null!,
			offsetX: -1,
			offsetY: -1,
			downX: -1,
			downY: -1,
			moveX: -1,
			moveY: -1,
		}
		this._onDragStartActionDegScopeHandler = this.onDragStartActionDeg.bind(this)
		this._onMouseDownActionDegScopeHandler = this.onMouseDownActionDeg.bind(this)
		this._onMouseMoveActionDegScopeHandler = this.onMouseMoveActionDeg.bind(this)
		this._onMouseUpActionDegScopeHandler = this.onMouseUpActionDeg.bind(this)
		this._onDragStartActionBrowserScopeHandler = this.onDragStartActionBrowser.bind(this)
		this._onDragOverActionBrowserScopeHandler = this.onDragOverActionBrowser.bind(this)
		this._onDragEnterActionBrowserScopeHandler = this.onDragEnterActionBrowser.bind(this)
		this._onDragDropActionBrowserScopeHandler = this.onDragDropActionBrowser.bind(this)
		this._onDragEndActionBrowserScopeHandler = this.onDragEndActionBrowser.bind(this)
		this._onDragStartEventListeners = []
		this._onDragEndEventListeners = []
		this._onDragDropEventListeners = []
		this._onDragOverEventListeners = []
		this._onDragEnterEventListeners = []
		this.init()
	}

	private init(): void {
		if (this._isUseMouseSimulation) {
			this.bindEventDeg()
		} else {
			this.bindEventBrowser()
		}
	}

	public destory(): void {
		if (this._isUseMouseSimulation) {
			this.unBindEventDeg()
		} else {
			this.unBindEventBrowser()
		}
		this._listContainer = null!
		this._isMouseDown = false
		this._actionData = {
			suspenseElement: null!,
			offsetX: -1,
			offsetY: -1,
			downX: -1,
			downY: -1,
			moveX: -1,
			moveY: -1,
		}
		this._handleTargetElement = null!
		this._onDragStartEventListeners = []
		this._onDragEndEventListeners = []
		this._onDragDropEventListeners = []
		this._onDragOverEventListeners = []
		this._onDragEnterEventListeners = []
	}

	public addDragStartEventListener(callback: (targetElement: HTMLElement, e: DragEvent | MouseEvent) => void): void {
		this._onDragStartEventListeners.push(callback)
	}
	public clearDragStartEventListeners(): void {
		this._onDragStartEventListeners = []
	}

	public addDragEndEventListener(callback: (targetElement: HTMLElement, e: DragEvent | MouseEvent) => void): void {
		this._onDragEndEventListeners.push(callback)
	}
	public clearDragEndEventListeners(): void {
		this._onDragEndEventListeners = []
	}

	public addDragDropEventListener(callback: (targetElement: HTMLElement, e: Event | MouseEvent) => void): void {
		this._onDragDropEventListeners.push(callback)
	}
	public clearDragDropEventListeners(): void {
		this._onDragDropEventListeners = []
	}

	public addDragOverEventListener(callback: (targetElement: HTMLElement, e: DragEvent | MouseEvent) => void): void {
		this._onDragOverEventListeners.push(callback)
	}
	public clearDragOverEventListeners(): void {
		this._onDragOverEventListeners = []
	}

	public addDragEnterEventListener(callback: (targetElement: HTMLElement, e: DragEvent | MouseEvent) => void): void {
		this._onDragEnterEventListeners.push(callback)
	}
	public clearDragEnterEventListeners(): void {
		this._onDragEnterEventListeners = []
	}

	private bindEventDeg(): void {
		this._listContainer.addEventListener('dragstart', this._onDragStartActionDegScopeHandler)
		this._listContainer.addEventListener('mousedown', this._onMouseDownActionDegScopeHandler)
		this._listContainer.addEventListener('mouseup', this._onMouseUpActionDegScopeHandler)
	}
	private unBindEventDeg(): void {
		this._listContainer.removeEventListener('dragstart', this._onDragStartActionDegScopeHandler)
		this._listContainer.removeEventListener('mousedown', this._onMouseDownActionDegScopeHandler)
		this._listContainer.removeEventListener('mouseup', this._onMouseUpActionDegScopeHandler)
	}

	private bindEventBrowser(): void {
		this._listContainer.addEventListener('dragstart', this._onDragStartActionBrowserScopeHandler)
		this._listContainer.addEventListener('dragover', this._onDragOverActionBrowserScopeHandler)
		this._listContainer.addEventListener('dragenter', this._onDragEnterActionBrowserScopeHandler)
		this._listContainer.addEventListener('drop', this._onDragDropActionBrowserScopeHandler)
		this._listContainer.addEventListener('dragend', this._onDragEndActionBrowserScopeHandler)
	}
	private unBindEventBrowser(): void {
		this._listContainer.removeEventListener('dragstart', this._onDragStartActionBrowserScopeHandler)
		this._listContainer.removeEventListener('dragover', this._onDragOverActionBrowserScopeHandler)
		this._listContainer.removeEventListener('dragenter', this._onDragEnterActionBrowserScopeHandler)
		this._listContainer.removeEventListener('drop', this._onDragDropActionBrowserScopeHandler)
		this._listContainer.removeEventListener('dragend', this._onDragEndActionBrowserScopeHandler)
	}

	private onDragStartActionDeg(e: DragEvent): void {
		e.preventDefault()
	}
	private onMouseDownActionDeg(e: MouseEvent): void {
		const targetElement: HTMLElement = this.findDraggableElement(e.target as HTMLElement)
		if (!targetElement) {
			return
		}
		this._isMouseDown = true
		const domRect: DOMRect = targetElement.getBoundingClientRect()
		this._actionData.offsetX = e.clientX - domRect.left
		this._actionData.offsetY = e.clientY - domRect.top
		this._actionData.suspenseElement = this.createSuspenseElement(domRect)
		document.body.appendChild(this._actionData.suspenseElement)
		document.addEventListener('mousemove', this._onMouseMoveActionDegScopeHandler)
		document.addEventListener('mouseup', this._onMouseUpActionDegScopeHandler)
		this.handleDragStartAction(targetElement as HTMLElement, e)
	}
	private onMouseMoveActionDeg(e: MouseEvent): void {
		e.preventDefault()
		if (!this._isMouseDown) {
			return
		}
		if (this._actionData.suspenseElement) {
			const leftX: number = e.clientX - this._actionData.offsetX
			const leftY: number = e.clientY - this._actionData.offsetY
			this._actionData.suspenseElement.style.transform = `translate3d(${leftX}px, ${leftY}px, 5px)`
			this._actionData.suspenseElement.style.opacity = '1'
		}
		const draggableTargetElement: HTMLElement = this.findDraggableElement(e.target as HTMLElement)
		if (!draggableTargetElement) {
			return
		}
		this.handleDragOverAction(draggableTargetElement, e)
	}
	private onMouseUpActionDeg(e: MouseEvent): void {
		e.preventDefault()
		this._isMouseDown = false
		document.removeEventListener('mousemove', this._onMouseMoveActionDegScopeHandler)
		document.removeEventListener('mouseup', this._onMouseUpActionDegScopeHandler)
		this.handleDragEndAction(e)
		if (this._actionData.suspenseElement) {
			this._actionData.suspenseElement.remove()
		}
	}

	private onDragStartActionBrowser(e: DragEvent): void {
		this.handleDragStartAction(e.target as HTMLElement, e)
	}
	private onDragOverActionBrowser(e: DragEvent): void {
		e.preventDefault()
		const draggableTargetElement: HTMLElement = this.findDraggableElement(e.target as HTMLElement)
		if (!draggableTargetElement) {
			return
		}
		this.handleDragOverAction(draggableTargetElement, e)
	}
	private onDragEnterActionBrowser(e: DragEvent): void {
		e.preventDefault()
		this.handleDragEnterAction(e)
	}
	private onDragDropActionBrowser(e: DragEvent): void {
		e.preventDefault()
		this.handleDragDropAction(e)
	}
	private onDragEndActionBrowser(e: DragEvent): void {
		e.preventDefault()
		this.handleDragEndAction(e)
	}

	private handleDragStartAction(handleTargetElement: HTMLElement, e: DragEvent | MouseEvent): void {
		this._handleTargetElement = handleTargetElement as HTMLElement
		for (let callback of this._onDragStartEventListeners) {
			callback(this._handleTargetElement, e)
		}
	}
	private handleDragOverAction(draggableTargetElement: HTMLElement, e: DragEvent | MouseEvent): void {
		if (this._handleTargetElement && draggableTargetElement !== this._handleTargetElement) {
			const targetRect = draggableTargetElement.getBoundingClientRect()
			const dragingRect = this._handleTargetElement.getBoundingClientRect()
			if (draggableTargetElement) {
				if ((draggableTargetElement as any).animated) {
					return
				}
			}
			if (this.getIndexOfSibling(this._handleTargetElement) < this.getIndexOfSibling(draggableTargetElement)) {
				;(draggableTargetElement.parentElement as HTMLElement).insertBefore(
					this._handleTargetElement,
					draggableTargetElement.nextElementSibling
				)
			} else {
				;(draggableTargetElement.parentElement as HTMLElement).insertBefore(this._handleTargetElement, draggableTargetElement)
			}
			this.handleTransition(dragingRect, this._handleTargetElement)
			this.handleTransition(targetRect, draggableTargetElement)
			for (let callback of this._onDragOverEventListeners) {
				callback(draggableTargetElement, e)
			}
		}
	}
	private handleDragEnterAction(e: DragEvent | MouseEvent): void {
		for (let callback of this._onDragEnterEventListeners) {
			callback(this._handleTargetElement, e)
		}
	}
	private handleDragDropAction(e: DragEvent | MouseEvent): void {
		for (let callback of this._onDragDropEventListeners) {
			callback(this._handleTargetElement, e)
		}
		this._handleTargetElement = null!
	}
	private handleDragEndAction(e: DragEvent | MouseEvent): void {
		for (let callback of this._onDragEndEventListeners) {
			callback(this._handleTargetElement, e)
		}
		this._handleTargetElement = null!
	}

	private getIndexOfSibling(targetElement: HTMLElement): number {
		let index: number = 0
		if (!targetElement || !targetElement.parentNode) {
			return -1
		}
		while (targetElement && (targetElement = targetElement.previousElementSibling as HTMLElement)) {
			index++
		}
		return index
	}

	private findDraggableElement(startElement: HTMLElement): HTMLElement {
		while (startElement) {
			if (startElement.getAttribute('draggable') === 'true') {
				return startElement
			}
			startElement = startElement.parentElement!
		}
		return null!
	}

	private handleTransition(prevRect: DOMRect, target: HTMLElement): void {
		const delay: number = 300
		const currentRect: DOMRect = target.getBoundingClientRect()
		this.css(target, 'transition', 'none')
		this.css(target, 'transform', 'translate3d(' + (prevRect.left - currentRect.left) + 'px, ' + (prevRect.top - currentRect.top) + 'px, 5px)')
		/**
		 * 此语句主要是为了触发浏览器强制同步布局
		 */
		this._targetOffsetWidth = target.offsetWidth
		this.css(target, 'transition', 'all ' + delay + 'ms')
		this.css(target, 'transform', 'translate3d(0, 0, 0)')
		window.clearTimeout((target as any).animated)
		;(target as any).animated = window.setTimeout((): void => {
			this.css(target, 'transition', '')
			this.css(target, 'transform', '')
			;(target as any).animated = false
		}, delay)
	}

	private css(element: HTMLElement, prop: string, val: any): void {
		const style: PlainObject = element && element.style
		if (!style) {
			return
		}
		if (val === void 0) {
			if (document.defaultView && document.defaultView.getComputedStyle) {
				val = document.defaultView.getComputedStyle(element, '')
			} else if ((element as any).currentStyle) {
				val = (element as any).currentStyle
			}
			return prop === void 0 ? val : val[prop]
		}
		style[prop] = val + (typeof val === 'string' ? '' : 'px')
	}

	private createSuspenseElement(initRect: DOMRect): HTMLElement {
		const divElement: HTMLElement = document.createElement('div')
		divElement.style.left = `0px`
		divElement.style.top = `0px`
		divElement.style.width = `${initRect.width}px`
		divElement.style.height = `${initRect.height}px`
		divElement.style.position = 'absolute'
		divElement.style.zIndex = '999999'
		divElement.style.border = `1px solid #efefef`
		divElement.style.borderRadius = '8px'
		divElement.style.boxShadow = `rgba(155, 155, 155, 0.35) 0 0 20px`
		divElement.style.transform = `translate3d(${initRect.left}pxpx, ${initRect.top}px, 5px)`
		divElement.style.pointerEvents = 'none'
		divElement.style.overflow = 'hidden'
		divElement.style.backgroundColor = 'rgba(245, 245, 245, 0.8)'
		divElement.style.backgroundRepeat = 'no-repeat'
		divElement.style.backgroundSize = 'cover'
		divElement.style.backgroundPosition = 'center center'
		divElement.style.opacity = '0'
		return divElement
	}
}
