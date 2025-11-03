import { ActiveCmdLinkCache, RuntimeCache } from '../cache/cache'
import { CMDLINK_DIVISION_TAG } from '../config/config'
import { TContextMenu } from '../types/type'
import { setActiveCmdLinkCacheToPrev } from './cacheHandler'
import {
	getNextActiveTag,
	getNowActiveTag,
	getPrevActiveTag,
	isSubMenuListExpandShow,
	setExpandTargetLiElementSelected,
	setSubMenuListExpandHide,
	setSubMenuListExpandShow,
	setTargetLiElementSelected,
} from './menuItemEventHandler'

export function rootElementBlurEventHandler(e: FocusEvent): void {
	const targetElement: HTMLElement = e.currentTarget as HTMLElement
	try {
		unmountContextmenu(targetElement)
	} catch (e: any) {
		console.error(`contextmenu root element removed error.`, e)
	}
}

export function rootElementKeydownEventHandler(e: KeyboardEvent): void {
	const rootElement: HTMLElement = e.target as HTMLElement
	const itemData: TContextMenu = RuntimeCache.get(rootElement.id) as TContextMenu
	if (!itemData) {
		return
	}
	const unmount: () => void = (): void => {
		unmountContextmenu(rootElement)
	}
	switch (e.keyCode) {
		case 27: {
			unmount()
			break
		}
		case 13: {
			const cmdTag: string = getNowActiveTag()
			if (isSubMenuListExpandShow(cmdTag)) {
				break
			}
			itemData.onEnterConfirm && itemData.onEnterConfirm(cmdTag.split(CMDLINK_DIVISION_TAG))
			window.setTimeout((): void => {
				unmount()
			})
			break
		}
		case 38: {
			e.stopPropagation()
			/**
			 * up
			 */
			const cmdTag: string = getPrevActiveTag()
			setTargetLiElementSelected(cmdTag)
			break
		}
		case 40: {
			e.stopPropagation()
			/**
			 * down
			 */
			const cmdTag: string = getNextActiveTag()
			setTargetLiElementSelected(cmdTag)
			break
		}
		case 37: {
			e.stopPropagation()
			/**
			 * left
			 */
			setActiveCmdLinkCacheToPrev()
			const cmdTag: string = getNowActiveTag()
			setSubMenuListExpandHide(cmdTag, true)
			break
		}
		case 39: {
			e.stopPropagation()
			/**
			 * right
			 */
			const cmdTag: string = getNowActiveTag()
			setSubMenuListExpandShow(cmdTag)
			setExpandTargetLiElementSelected(cmdTag)
			break
		}
	}
	itemData.onKeydown && itemData.onKeydown(e, unmount)
}

export function rootElementKeyupEventHandler(e: KeyboardEvent): void {
	const rootElement: HTMLElement = e.target as HTMLElement
	const itemData: TContextMenu = RuntimeCache.get(rootElement.id) as TContextMenu
	if (!itemData) {
		return
	}
	const unmount: () => void = (): void => {
		unmountContextmenu(rootElement)
	}
	itemData.onKeyup && itemData.onKeyup(e, unmount)
}

export function unmountContextmenu(rootElement: HTMLElement): void {
	const reactRoot = (rootElement as any).root
	rootElement.removeEventListener('blur', rootElementBlurEventHandler)
	rootElement.removeEventListener('keydown', rootElementKeydownEventHandler)
	rootElement.removeEventListener('keyup', rootElementKeyupEventHandler)
	reactRoot.unmount()
	rootElement.remove()
	RuntimeCache.delete(rootElement.id)
	ActiveCmdLinkCache.delete(rootElement.id)
}
