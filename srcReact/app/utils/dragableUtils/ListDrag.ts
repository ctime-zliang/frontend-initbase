export class ListDrag {
	private _listContainer: HTMLElement
	private _handleTargetElement: HTMLElement
	private _targetOffsetWidth: number
	private _onDragStartActionScopeHandler: (e: DragEvent) => void
	private _onDragOverActionScopeHandler: (e: DragEvent) => void
	private _onDragEnterActionScopeHandler: (e: DragEvent) => void
	private _onDragDropActionScopeHandler: (e: Event) => void
	private _onDragEndActionScopeHandler: (e: DragEvent) => void
	private _onDragStartEventListeners: Array<(targetElement: HTMLElement, e: DragEvent) => void>
	private _onDragEndEventListeners: Array<(targetElement: HTMLElement, e: DragEvent) => void>
	private _onDragDropEventListeners: Array<(targetElement: HTMLElement, e: Event) => void>
	private _onDragOverEventListeners: Array<(targetElement: HTMLElement, e: DragEvent) => void>
	private _onDragEnterEventListeners: Array<(targetElement: HTMLElement, e: DragEvent) => void>
	constructor(listContainer: HTMLElement) {
		this._listContainer = listContainer
		this._handleTargetElement = null!
		this._targetOffsetWidth = 0
		this._onDragStartActionScopeHandler = this.onDragStartAction.bind(this)
		this._onDragOverActionScopeHandler = this.onDragOverAction.bind(this)
		this._onDragEnterActionScopeHandler = this.onDragEnterAction.bind(this)
		this._onDragDropActionScopeHandler = this.onDragDropAction.bind(this)
		this._onDragEndActionScopeHandler = this.onDragEndAction.bind(this)
		this._onDragStartEventListeners = []
		this._onDragEndEventListeners = []
		this._onDragDropEventListeners = []
		this._onDragOverEventListeners = []
		this._onDragEnterEventListeners = []
		this.init()
	}

	private init(): void {
		this.bindEvent()
	}

	public destory(): void {
		this.unBindEvent()
		this._listContainer = null!
		this._handleTargetElement = null!
		this._onDragStartEventListeners = []
		this._onDragEndEventListeners = []
		this._onDragDropEventListeners = []
		this._onDragOverEventListeners = []
		this._onDragEnterEventListeners = []
	}

	public addDragStartEventListener(callback: (targetElement: HTMLElement, e: DragEvent) => void): void {
		this._onDragStartEventListeners.push(callback)
	}
	public clearDragStartEventListeners(): void {
		this._onDragStartEventListeners = []
	}

	public addDragEndEventListener(callback: (targetElement: HTMLElement, e: DragEvent) => void): void {
		this._onDragEndEventListeners.push(callback)
	}
	public clearDragEndEventListeners(): void {
		this._onDragEndEventListeners = []
	}

	public addDragDropEventListener(callback: (targetElement: HTMLElement, e: Event) => void): void {
		this._onDragDropEventListeners.push(callback)
	}
	public clearDragDropEventListeners(): void {
		this._onDragDropEventListeners = []
	}

	public addDragOverEventListener(callback: (targetElement: HTMLElement, e: DragEvent) => void): void {
		this._onDragOverEventListeners.push(callback)
	}
	public clearDragOverEventListeners(): void {
		this._onDragOverEventListeners = []
	}

	public addDragEnterEventListener(callback: (targetElement: HTMLElement, e: DragEvent) => void): void {
		this._onDragEnterEventListeners.push(callback)
	}
	public clearDragEnterEventListeners(): void {
		this._onDragEnterEventListeners = []
	}

	private bindEvent(): void {
		this._listContainer.addEventListener('dragstart', this._onDragStartActionScopeHandler)
		this._listContainer.addEventListener('dragover', this._onDragOverActionScopeHandler)
		this._listContainer.addEventListener('dragenter', this._onDragEnterActionScopeHandler)
		this._listContainer.addEventListener('dragdrop', this._onDragDropActionScopeHandler)
		this._listContainer.addEventListener('dragend', this._onDragEndActionScopeHandler)
	}

	private unBindEvent(): void {
		this._listContainer.removeEventListener('dragstart', this._onDragStartActionScopeHandler)
		this._listContainer.removeEventListener('dragover', this._onDragOverActionScopeHandler)
		this._listContainer.removeEventListener('dragenter', this._onDragEnterActionScopeHandler)
		this._listContainer.removeEventListener('dragdrop', this._onDragDropActionScopeHandler)
		this._listContainer.removeEventListener('dragend', this._onDragEndActionScopeHandler)
	}

	private onDragStartAction(e: DragEvent): void {
		// if (e.dataTransfer) {
		// 	e.dataTransfer.setData('cache', String(Math.random()))
		// }
		this._handleTargetElement = e.target as HTMLElement
		for (let callback of this._onDragStartEventListeners) {
			callback(this._handleTargetElement, e)
		}
	}

	private onDragOverAction(e: DragEvent): void {
		e.preventDefault()
		const draggableTargetElement: HTMLElement = this.findDraggableElement(e.target as HTMLElement)
		if (!draggableTargetElement) {
			return
		}
		if (draggableTargetElement !== this._handleTargetElement) {
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

	private onDragEnterAction(e: DragEvent): void {
		for (let callback of this._onDragEnterEventListeners) {
			callback(this._handleTargetElement, e)
		}
	}

	private onDragDropAction(e: Event): void {
		for (let callback of this._onDragDropEventListeners) {
			callback(this._handleTargetElement, e)
		}
		this._handleTargetElement = null!
	}

	private onDragEndAction(e: DragEvent): void {
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
}
