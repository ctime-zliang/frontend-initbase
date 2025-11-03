import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { ActiveCmdLinkCache, RuntimeCache } from '../cache/cache'
import { ROOT_PREFIEX_TAG, PADDING_VIEWPORT_TOP, PADDING_VIEWPORT_BOTTOM } from '../config/config'
import { TOpenContextMenu } from '../types/type'
import {
	rootElementBlurEventHandler,
	rootElementKeydownEventHandler,
	rootElementKeyupEventHandler,
	unmountContextmenu,
} from '../utils/rootElementEventHandler'
import ContextMenuRoot from './ContextMenuRoot'

let id: number = 0

export class ContextMenu {
	static open(params: TOpenContextMenu): void {
		const { panelMaxHeight = document.documentElement.clientHeight - PADDING_VIEWPORT_TOP - PADDING_VIEWPORT_BOTTOM } = params
		const documentRoot: HTMLElement = document.documentElement
		const documentBody: HTMLElement = document.body
		const docScrollTop: number = documentRoot.scrollTop
		const docScrollLeft: number = documentRoot.scrollLeft
		const rootElement: HTMLElement = document.createElement('div')
		const domId: string = ROOT_PREFIEX_TAG + id++
		rootElement.setAttribute('contextmenu', domId)
		rootElement.setAttribute('data-domid', domId)
		rootElement.id = domId
		rootElement.style.position = 'absolute'
		rootElement.style.left = docScrollLeft + 'px'
		rootElement.style.top = docScrollTop + 'px'
		rootElement.style.outline = '0'
		rootElement.setAttribute('tabIndex', '0')
		if (!RuntimeCache.has(domId)) {
			RuntimeCache.set(domId, { ...params, id: domId })
			ActiveCmdLinkCache.set(domId, [])
		}
		const root = ReactDOMClient.createRoot(rootElement)
		root.render(
			<ContextMenuRoot
				{...params}
				domId={domId}
				panelMaxHeight={panelMaxHeight}
				unmount={(): void => {
					unmountContextmenu(rootElement)
				}}
			/>
		)
		documentBody.appendChild(rootElement)
		const htmlRoot: HTMLElement = document.getElementById(domId) as HTMLElement
		;(htmlRoot as any).root = root
		if (htmlRoot) {
			htmlRoot.addEventListener('blur', rootElementBlurEventHandler)
			htmlRoot.addEventListener('keydown', rootElementKeydownEventHandler)
			htmlRoot.addEventListener('keyup', rootElementKeyupEventHandler)
			htmlRoot.focus()
		}
	}

	static closeActive(): void {
		const activeElement: HTMLElement = document.activeElement as HTMLElement
		if (!activeElement || !activeElement.hasAttribute('contextmenu')) {
			return
		}
		unmountContextmenu(activeElement)
	}

	static isContextMenuOfNowActive(): boolean {
		const activeElement: HTMLElement = document.activeElement as HTMLElement
		if (!activeElement) {
			return false
		}
		return activeElement.hasAttribute('contextmenu')
	}
}
