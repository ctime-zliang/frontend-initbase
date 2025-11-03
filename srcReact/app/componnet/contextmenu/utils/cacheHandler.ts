import { ActiveCmdLinkCache } from '../cache/cache'
import { CMDLINK_DIVISION_TAG } from '../config/config'

export function updateActiveCmdLinkCache(panelWrapperElement: HTMLElement): void {
	const cmdLink: string = panelWrapperElement.getAttribute('data-cmdlink') as string
	const domId: string = panelWrapperElement.getAttribute('data-domid') as string
	if (!domId || !cmdLink) {
		return
	}
	ActiveCmdLinkCache.set(domId, cmdLink.split(CMDLINK_DIVISION_TAG))
}

export function setActiveCmdLinkCacheToPrev(): void {
	const activeElement: HTMLElement = document.activeElement as HTMLElement
	if (!activeElement || !activeElement.hasAttribute('contextmenu')) {
		return
	}
	const domId: string = activeElement.getAttribute('data-domid') as string
	const cmdTagArr: Array<string> = ActiveCmdLinkCache.get(domId) || []
	if (cmdTagArr.length <= 1) {
		return
	}
	ActiveCmdLinkCache.set(domId, (cmdTagArr.splice(cmdTagArr.length - 1), cmdTagArr))
}
