/**
 * 获取设备 DPR
 */
export function getDPR(): number {
	return window.devicePixelRatio || 1
}

/**
 * 获取设备 DPI
 */
export function getDPI(): [number, number] {
	const DPI: [number, number] = new Array(2) as [number, number]
	const DPR: number = getDPR()
	const tmpNode: HTMLElement = document.createElement('div')
	tmpNode.style.cssText = `height: 1in; width: 1in; left: -100%; top: -100%; position: absolute;`
	document.body.appendChild(tmpNode)
	DPI[0] = parseInt(String(tmpNode.offsetWidth)) * DPR
	DPI[1] = parseInt(String(tmpNode.offsetHeight)) * DPR
	;(tmpNode.parentNode as HTMLElement).removeChild(tmpNode)
	return DPI
}

/**
 * 获取设备 DPI
 */
export function getAbsoluteDPI(): [number, number] {
	const DPI: [number, number] = new Array(2) as [number, number]
	const tmpNode: HTMLElement = document.createElement('div')
	tmpNode.style.cssText = `height: 1in; width: 1in; left: -100%; top: -100%; position: absolute;`
	document.body.appendChild(tmpNode)
	DPI[0] = parseInt(String(tmpNode.offsetWidth))
	DPI[1] = parseInt(String(tmpNode.offsetHeight))
	;(tmpNode.parentNode as HTMLElement).removeChild(tmpNode)
	return DPI
}
