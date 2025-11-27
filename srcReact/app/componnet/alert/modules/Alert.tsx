import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { ROOT_PREFIEX_TAG } from '../config/config'
import { TAlertOptions } from '../types/type'
import { AlertRoot } from './AlertRoot'
import { rootElementClickEventHandler, unmountContextmenu } from '../utils/rootElementEventHandler'
import { RuntimeCache } from '../cache/cache'

let id: number = 0

export class Alert {
	static open(params: TAlertOptions): void {
		const documentBody: HTMLElement = document.body
		const rootElement: HTMLElement = document.createElement('div')
		const domId: string = ROOT_PREFIEX_TAG + id++
		rootElement.setAttribute(ROOT_PREFIEX_TAG, domId)
		rootElement.id = domId
		rootElement.style.position = 'absolute'
		rootElement.style.left = '0px'
		rootElement.style.top = '0px'
		rootElement.style.outline = '0'
		rootElement.setAttribute('tabIndex', '0')
		if (!RuntimeCache.has(domId)) {
			RuntimeCache.set(domId, { ...params, id: domId })
		}
		const root = ReactDOMClient.createRoot(rootElement)
		root.render(
			<AlertRoot
				{...params}
				domId={domId}
				unmount={(): void => {
					unmountContextmenu(rootElement)
				}}
			/>
		)
		documentBody.appendChild(rootElement)
		const htmlRoot: HTMLElement = document.getElementById(domId) as HTMLElement
		;(htmlRoot as any).root = root
		if (htmlRoot) {
			htmlRoot.addEventListener('click', rootElementClickEventHandler)
			htmlRoot.focus()
		}
	}
}
