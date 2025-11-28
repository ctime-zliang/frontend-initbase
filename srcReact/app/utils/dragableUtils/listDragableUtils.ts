import { TBoundingClientRectResult } from 'srcReact/app/types/comm.types'

export type TListDragProfile = {
	mouseMoveX: number
	mouseMoveY: number
	hostElement: HTMLElement
	movingElement: HTMLElement
	movingElementInitialIndex: number
	movingElementRealTimeIndex: number
	suspensionElement: HTMLElement
	suspensionElementTranslateX: number
	suspensionElementTranslateY: number
	nowTargetElement: HTMLElement
	nowTargetElementRealTimeIndex: number
}
export class ListDragableUtils {
	private _dragProfile: TListDragProfile
	private _bindDragStartEventScopeHandler: (e: DragEvent) => void
	private _bindDragEndEventScopeHandler: (e: DragEvent) => void
	private _bindDragDropEventScopeHandler: (e: Event) => void
	private _bindDragEnterEventScopeHandler: (e: DragEvent) => void
	private _bindDragOverEventEventScopeHandler: (e: DragEvent) => void
	constructor(hostElement: HTMLElement) {
		this.resetProfile()
		this._dragProfile.hostElement = hostElement
		this._bindDragStartEventScopeHandler = this.bindDragStartEvent.bind(this)
		this._bindDragEndEventScopeHandler = this.bindDragEndEvent.bind(this)
		this._bindDragDropEventScopeHandler = this.bindDragDropEvent.bind(this)
		this._bindDragEnterEventScopeHandler = this.bindDragEnterEvent.bind(this)
		this._bindDragOverEventEventScopeHandler = this.bindDragOverEvent.bind(this)
		this.bindEvent()
	}

	public cancel(): void {
		this.unBindEvent()
		this.resetProfile()
	}

	private bindEvent(): void {
		this._dragProfile.hostElement.addEventListener('dragstart', this._bindDragStartEventScopeHandler)
		this._dragProfile.hostElement.addEventListener('dragend', this._bindDragEndEventScopeHandler)
		this._dragProfile.hostElement.addEventListener('dragdrop', this._bindDragDropEventScopeHandler)
		this._dragProfile.hostElement.addEventListener('dragenter', this._bindDragEnterEventScopeHandler)
		this._dragProfile.hostElement.addEventListener('dragover', this._bindDragOverEventEventScopeHandler)
	}

	private unBindEvent(): void {
		this._dragProfile.hostElement.removeEventListener('dragstart', this._bindDragStartEventScopeHandler)
		this._dragProfile.hostElement.removeEventListener('dragend', this._bindDragEndEventScopeHandler)
		this._dragProfile.hostElement.removeEventListener('dragdrop', this._bindDragDropEventScopeHandler)
		this._dragProfile.hostElement.removeEventListener('dragenter', this._bindDragEnterEventScopeHandler)
		this._dragProfile.hostElement.removeEventListener('dragover', this._bindDragOverEventEventScopeHandler)
	}

	private resetProfile(): void {
		this._dragProfile = {
			mouseMoveX: 0,
			mouseMoveY: 0,
			hostElement: null!,
			movingElement: null!,
			movingElementInitialIndex: -1,
			movingElementRealTimeIndex: -1,
			suspensionElement: null!,
			suspensionElementTranslateX: 0,
			suspensionElementTranslateY: 0,
			nowTargetElement: null!,
			nowTargetElementRealTimeIndex: -1,
		}
	}

	private bindDragStartEvent(e: DragEvent): void {
		const targetElement: HTMLElement = e.target as HTMLElement
		if (!targetElement) {
			return
		}
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.setDragImage(new Image(), 0, 0)
		}
		targetElement.classList.add('dragmoving')
		this._dragProfile.mouseMoveX = e.clientX
		this._dragProfile.mouseMoveY = e.clientY
		this._dragProfile.movingElement = targetElement
		const allSiblingElements: Array<HTMLElement> = this.getAllSiblingElements(this._dragProfile.movingElement)
		this._dragProfile.movingElementInitialIndex = allSiblingElements.indexOf(this._dragProfile.movingElement)
		this._dragProfile.suspensionElement = this.createSuspensionContainerElement(this._dragProfile.movingElement)
		this._dragProfile.suspensionElement.style.transform = `translate3d(${this._dragProfile.suspensionElementTranslateX}px, ${this._dragProfile.suspensionElementTranslateY}px, 5px)`
	}

	private bindDragEndEvent(e: DragEvent): void {
		const targetElement: HTMLElement = e.target as HTMLElement
		if (!targetElement) {
			return
		}
		targetElement.classList.remove('dragmoving')
		this._dragProfile.movingElement = null!
		this._dragProfile.nowTargetElement = null!
		this._dragProfile.suspensionElementTranslateX = this._dragProfile.suspensionElementTranslateY = 0
		this._dragProfile.suspensionElement.remove()
		this._dragProfile.suspensionElement = null!
	}

	private bindDragDropEvent(e: Event): void {
		const targetElement: HTMLElement = e.target as HTMLElement
		if (!targetElement) {
			return
		}
	}

	private bindDragEnterEvent(e: DragEvent): void {
		e.preventDefault()
		const targetElement: HTMLElement = e.target as HTMLElement
		if (!targetElement) {
			return
		}
		const targetMoveElement: HTMLElement = this.getClosestDraggableItemElement(targetElement)
		if (!targetMoveElement || targetMoveElement === this._dragProfile.movingElement) {
			return
		}
		this._dragProfile.nowTargetElement = targetMoveElement
		const allSiblingElements: Array<HTMLElement> = this.getAllSiblingElements(this._dragProfile.movingElement)
		this._dragProfile.movingElementRealTimeIndex = allSiblingElements.indexOf(this._dragProfile.movingElement)
		this._dragProfile.nowTargetElementRealTimeIndex = allSiblingElements.indexOf(this._dragProfile.nowTargetElement)
		if (this._dragProfile.movingElementRealTimeIndex < this._dragProfile.nowTargetElementRealTimeIndex) {
			this._dragProfile.hostElement.insertBefore(this._dragProfile.movingElement, this._dragProfile.nowTargetElement.nextElementSibling)
		} else {
			this._dragProfile.hostElement.insertBefore(this._dragProfile.movingElement, this._dragProfile.nowTargetElement)
		}
	}

	private bindDragOverEvent(e: DragEvent): void {
		e.preventDefault()
		const targetElement: HTMLElement = e.target as HTMLElement
		if (!targetElement) {
			return
		}
		this._dragProfile.suspensionElementTranslateX += e.clientX - this._dragProfile.mouseMoveX
		this._dragProfile.suspensionElementTranslateY += e.clientY - this._dragProfile.mouseMoveY
		this._dragProfile.suspensionElement.style.transform = `translate3d(${this._dragProfile.suspensionElementTranslateX}px, ${this._dragProfile.suspensionElementTranslateY}px, 5px)`
		this._dragProfile.mouseMoveX = e.clientX
		this._dragProfile.mouseMoveY = e.clientY
	}

	private createSuspensionContainerElement(sourceTargetElement: HTMLElement): HTMLElement {
		const boundingClientRect: TBoundingClientRectResult = sourceTargetElement.getBoundingClientRect().toJSON()
		const parentElement: HTMLElement = sourceTargetElement.parentElement as HTMLElement
		const copyTargetElement: HTMLElement = this._dragProfile.movingElement.cloneNode(true) as HTMLElement
		const parentNodeName: string = parentElement.nodeName.toLocaleLowerCase()
		const htmlStrArr: Array<string> = []
		htmlStrArr.push(
			`<${parentNodeName} class="${Array.from(parentElement.classList).join(
				' '
			)}" style="pointer-events: none; position: fixed; width: fit-content; height: fit-content; left: ${boundingClientRect.left}px; top: ${
				boundingClientRect.top
			}px;">`
		)
		htmlStrArr.push(`</${parentNodeName}>`)
		const fragmentElement: DocumentFragment = document.createRange().createContextualFragment(htmlStrArr.join('\n'))
		const suspensionContainerElement: HTMLElement = fragmentElement.querySelector(`${parentNodeName}`) as HTMLElement
		suspensionContainerElement.appendChild(copyTargetElement)
		copyTargetElement.classList = Array.from(sourceTargetElement.classList).join(' ')
		copyTargetElement.style.width = `${boundingClientRect.width}px`
		copyTargetElement.style.height = `${boundingClientRect.height}px`
		copyTargetElement.style.margin = `0`
		copyTargetElement.style.outline = `0`
		copyTargetElement.style.fontSize = `14px`
		document.body.appendChild(fragmentElement)
		return suspensionContainerElement
	}

	private getClosestDraggableItemElement(startElement: HTMLElement): HTMLElement {
		let itemElement: HTMLElement = startElement
		while (itemElement) {
			if (itemElement.getAttribute('draggable') === 'true') {
				return itemElement
			}
			itemElement = itemElement.parentElement as HTMLElement
		}
		return null!
	}

	private getAllSiblingElements(itemElement: HTMLElement): Array<HTMLElement> {
		return Array.from((itemElement.parentElement as HTMLElement).children) as Array<HTMLElement>
	}
}
