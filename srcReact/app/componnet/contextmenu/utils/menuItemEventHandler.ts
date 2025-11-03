import { ActiveCmdLinkCache, RuntimeCache } from '../cache/cache'
import { CMDLINK_DIVISION_TAG, PADDING_VIEWPORT_BOTTOM, PADDING_VIEWPORT_TOP } from '../config/config'
import { EContextPanelAlignment } from '../config/enum'
import { TBoundingClientRectResultToJSONResult, TCacheValue } from '../types/type'
import { updateActiveCmdLinkCache } from './cacheHandler'
import { isMouseLeaveContainer } from './isMouseLeaveContainer'

export function menuItemElementMouseOverEventHandler(currentElement: HTMLElement): void {
	if (!currentElement) {
		return
	}
	const currentFirstChildElement: HTMLElement = currentElement.firstElementChild as HTMLElement
	if (!currentFirstChildElement || currentFirstChildElement.classList.contains('ctxmenu-item-hover')) {
		return
	}
	updateTargetLiElementClassList(currentElement)
	updateActiveCmdLinkCache(currentElement)
	setSubMenuListShow(currentElement)
}

export function getNowActiveTag(): string {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!activeElement || !activeElement.hasAttribute('contextmenu')) {
		return null!
	}
	const domId: string = activeElement.getAttribute('data-domid') as string
	const cmdTags: Array<string> = ActiveCmdLinkCache.get(domId) || ([] as Array<string>)
	return cmdTags.join(CMDLINK_DIVISION_TAG)
}

export function getNextActiveTag(): string {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!activeElement || !activeElement.hasAttribute('contextmenu')) {
		return null!
	}
	const nowActiveTag: string = getNowActiveTag()
	const targetLiElement: HTMLElement = !nowActiveTag
		? (activeElement.querySelector(`[data-cmdlink]`) as HTMLElement)
		: (activeElement.querySelector(`[data-cmdlink="${nowActiveTag}"]`) as HTMLElement)
	const nextLiElement: HTMLElement = getNextAvailableLiElement(targetLiElement, !nowActiveTag)
	if (!nextLiElement) {
		return null!
	}
	return nextLiElement.getAttribute('data-cmdlink') as string
}

export function getPrevActiveTag(): string {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!activeElement || !activeElement.hasAttribute('contextmenu')) {
		return null!
	}
	const nowActiveTag: string = getNowActiveTag()
	const targetLiElement: HTMLElement = !nowActiveTag
		? (activeElement.querySelector(`[data-cmdlink]`) as HTMLElement)
		: (activeElement.querySelector(`[data-cmdlink="${nowActiveTag}"]`) as HTMLElement)
	const prevLiElement: HTMLElement = getPrevAvailableLiElement(targetLiElement, !nowActiveTag)
	if (!prevLiElement) {
		return null!
	}
	return prevLiElement.getAttribute('data-cmdlink') as string
}

export function setTargetLiElementSelected(cmdTag: string): void {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!cmdTag || !activeElement || !activeElement.hasAttribute('contextmenu')) {
		return
	}
	const targetLiElement: HTMLElement = activeElement.querySelector(`[data-cmdlink="${cmdTag}"]`) as HTMLElement
	if (!targetLiElement) {
		return
	}
	updateTargetLiElementClassList(targetLiElement, true)
	updateActiveCmdLinkCache(targetLiElement)
	setSubMenuListShow(targetLiElement)
}

export function setExpandTargetLiElementSelected(cmdTag: string): void {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!cmdTag || !activeElement || !activeElement.hasAttribute('contextmenu')) {
		return
	}
	const targetLiElement: HTMLElement = activeElement.querySelector(`[data-cmdlink="${cmdTag}"]`) as HTMLElement
	if (!targetLiElement) {
		return
	}
	const ulistElement: HTMLElement = targetLiElement.querySelector(`[data-itemtype="ctxmenu-ulist"]`) as HTMLElement
	if (!ulistElement) {
		return
	}
	const targetChildLiElement: HTMLElement = ulistElement.querySelector(`[data-cmdlink]`) as HTMLElement
	if (!targetChildLiElement) {
		return
	}
	updateTargetLiElementClassList(targetChildLiElement)
	updateActiveCmdLinkCache(targetChildLiElement)
	setSubMenuListShow(targetChildLiElement)
}

export function setSubMenuListExpandShow(cmdTag: string): void {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!cmdTag || !activeElement || !activeElement.hasAttribute('contextmenu')) {
		return
	}
	const targetLiElement: HTMLElement = activeElement.querySelector(`[data-cmdlink="${cmdTag}"]`) as HTMLElement
	if (!targetLiElement) {
		return
	}
	setSubMenuListShow(targetLiElement)
}

export function setSubMenuListExpandHide(cmdTag: string, forceHide: boolean = false): void {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!cmdTag || !activeElement || !activeElement.hasAttribute('contextmenu')) {
		return
	}
	const targetLiElement: HTMLElement = activeElement.querySelector(`[data-cmdlink="${cmdTag}"]`) as HTMLElement
	if (!targetLiElement) {
		return
	}
	setSubMenuListHide(targetLiElement, forceHide)
}

export function isSubMenuListExpandShow(cmdTag: string): boolean {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!cmdTag || !activeElement || !activeElement.hasAttribute('contextmenu')) {
		return false
	}
	const targetLiElement: HTMLElement = activeElement.querySelector(`[data-cmdlink="${cmdTag}"]`) as HTMLElement
	if (!targetLiElement) {
		return false
	}
	const mainElement: HTMLElement = targetLiElement.querySelector('main') as HTMLElement
	if (!mainElement) {
		return false
	}
	return mainElement.classList.contains('ctxmenu-show-menu')
}

function setSubMenuListShow(panelWrapperElement: HTMLElement): void {
	const surveyLeft: number = -1
	const surveyTop: number = -1
	const cacheItem: TCacheValue = RuntimeCache.get(panelWrapperElement.getAttribute('data-domid') as string) as TCacheValue
	const mainElement: HTMLElement = panelWrapperElement.querySelector('main') as HTMLElement
	if (!mainElement || mainElement.classList.contains('ctxmenu-show-menu')) {
		return
	}
	mainElement.classList.remove('ctxmenu-show-menu')
	mainElement.style.display = 'block'
	mainElement.style.visibility = `hidden`
	mainElement.style.opacity = `0`
	mainElement.style.left = `${surveyLeft}px`
	mainElement.style.top = `${surveyTop}px`
	const currentRect: TBoundingClientRectResultToJSONResult = panelWrapperElement.getBoundingClientRect().toJSON()
	const mainRect: TBoundingClientRectResultToJSONResult = mainElement.getBoundingClientRect().toJSON()
	const anchorPointOffsetLeft: number = mainRect.left - surveyLeft
	const anchorPointOffsetTop: number = mainRect.top - surveyTop
	const viewClientHeight: number = document.documentElement.clientHeight
	const viewClientWidth: number = document.documentElement.clientWidth
	mainRect.x = -1
	mainRect.y = -1
	/* ... */
	/**
	 * 修正垂直定位
	 **/
	if (mainRect.height >= viewClientHeight - PADDING_VIEWPORT_TOP - PADDING_VIEWPORT_BOTTOM) {
		mainRect.top = PADDING_VIEWPORT_TOP - anchorPointOffsetTop
		mainRect.height = viewClientHeight - PADDING_VIEWPORT_TOP - PADDING_VIEWPORT_BOTTOM
		mainRect.bottom = mainRect.top + mainRect.height
	} else {
		if (cacheItem && cacheItem.panelAlignment === EContextPanelAlignment.RIGHT_TOP) {
			if (currentRect.top <= PADDING_VIEWPORT_TOP) {
				mainRect.top = PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			}
			if (currentRect.bottom - mainRect.height <= PADDING_VIEWPORT_TOP) {
				mainRect.top = anchorPointOffsetTop - PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			} else {
				mainRect.top = currentRect.bottom - mainRect.height - anchorPointOffsetTop
				mainRect.bottom = mainRect.top + mainRect.height
			}
		} else {
			if (currentRect.top <= PADDING_VIEWPORT_TOP) {
				mainRect.top = PADDING_VIEWPORT_TOP
				mainRect.bottom = mainRect.top + mainRect.height
			}
			if (currentRect.top + mainRect.height >= viewClientHeight) {
				mainRect.top = viewClientHeight - mainRect.height - anchorPointOffsetTop - PADDING_VIEWPORT_BOTTOM
				mainRect.bottom = mainRect.top + mainRect.height
			} else {
				mainRect.top = currentRect.top - anchorPointOffsetTop
				mainRect.bottom = mainRect.top + mainRect.height
			}
		}
	}
	/**
	 * 修正横向定位
	 **/
	if (currentRect.right + mainRect.width >= viewClientWidth) {
		mainRect.left = currentRect.left - mainRect.width - anchorPointOffsetLeft
		mainRect.right = mainRect.left + mainRect.width
	} else {
		mainRect.left = currentRect.right - anchorPointOffsetLeft
		mainRect.right = mainRect.left + mainRect.width
	}

	mainElement.style.left = `${mainRect.left}px`
	mainElement.style.top = `${mainRect.top}px`
	mainElement.style.height = `${mainRect.height}px`
	mainElement.classList.add('ctxmenu-show-menu')
	mainElement.style.visibility = null as unknown as string
	mainElement.style.opacity = null as unknown as string
}

function setSubMenuListHide(panelWrapperElement: HTMLElement, forceHide: boolean = false): void {
	const mainElement: HTMLElement = panelWrapperElement.querySelector('main') as HTMLElement
	if (!mainElement) {
		return
	}
	if (forceHide) {
		mainElement.classList.remove('ctxmenu-show-menu')
		mainElement.style.display = 'none'
		return
	}
	if (isMouseLeaveContainer(mainElement)) {
		return
	}
	mainElement.classList.remove('ctxmenu-show-menu')
	mainElement.style.display = 'none'
}

function getNextAvailableLiElement(referenceLiElement: HTMLElement, useSelf: boolean = false): HTMLElement {
	if (!referenceLiElement) {
		return null!
	}
	const parentElement: HTMLElement = referenceLiElement.parentElement as HTMLElement
	let nextLiElement: HTMLElement = useSelf ? referenceLiElement : (referenceLiElement.nextElementSibling as HTMLElement)
	while (nextLiElement) {
		const itemType: string = nextLiElement.getAttribute('data-itemtype') as string
		if (itemType === 'ctxmenu-separator' || itemType === 'ctxmenu-item-disabled') {
			nextLiElement = nextLiElement.nextElementSibling as HTMLElement
			continue
		}
		return nextLiElement
	}
	return !nextLiElement ? (parentElement.firstElementChild as HTMLElement) : nextLiElement
}

function getPrevAvailableLiElement(referenceLiElement: HTMLElement, useSelf: boolean = false): HTMLElement {
	if (!referenceLiElement) {
		return null!
	}
	const parentElement: HTMLElement = referenceLiElement.parentElement as HTMLElement
	let prevLiElement: HTMLElement = useSelf ? referenceLiElement : (referenceLiElement.previousElementSibling as HTMLElement)
	while (prevLiElement) {
		const itemType: string = prevLiElement.getAttribute('data-itemtype') as string
		if (itemType === 'ctxmenu-separator' || itemType === 'ctxmenu-item-disabled') {
			prevLiElement = prevLiElement.previousElementSibling as HTMLElement
			continue
		}
		return prevLiElement
	}
	return !prevLiElement ? (parentElement.lastElementChild as HTMLElement) : prevLiElement
}

function updateTargetLiElementClassList(targetLiElement: HTMLElement, forceHide: boolean = false): void {
	const ctxmenuItems: Array<HTMLElement> = Array.from(
		(targetLiElement.parentElement as HTMLElement).querySelectorAll('.ctxmenu-item')
	) as Array<HTMLElement>
	ctxmenuItems.forEach((item: HTMLElement): void => {
		item.firstElementChild?.classList.remove('ctxmenu-item-hover')
		setSubMenuListHide(item, forceHide)
	})
	targetLiElement.firstElementChild?.classList.add('ctxmenu-item-hover')
}
