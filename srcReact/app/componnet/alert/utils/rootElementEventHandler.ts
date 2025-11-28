import { RuntimeCache } from '../cache/cache'

export function rootElementMouseDownEventHandler(e: MouseEvent): void {
	e.preventDefault()
	e.stopPropagation()
}

export function unmountContextmenu(rootElement: HTMLElement): void {
	const reactRoot = (rootElement as any).root
	reactRoot.unmount()
	rootElement.addEventListener('mousedown', rootElementMouseDownEventHandler)
	rootElement.remove()
	RuntimeCache.delete(rootElement.id)
}
