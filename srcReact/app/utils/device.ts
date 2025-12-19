export function getDPR(): number {
	return window.devicePixelRatio || 1
}

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

export function isMobile(): boolean {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isIOS(): boolean {
	return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isAndroid(): boolean {
	return /Android/.test(navigator.userAgent)
}

export function isWeChat(): boolean {
	return /MicroMessenger/i.test(navigator.userAgent)
}

export type TDeviceInfo = {
	isMobile: boolean
	isIOS: boolean
	isAndroid: boolean
	isWeChat: boolean
	userAgent: string
	screenWidth: number
	screenHeight: number
}
export function getDeviceInfo(): TDeviceInfo {
	return {
		isMobile: isMobile(),
		isIOS: isIOS(),
		isAndroid: isAndroid(),
		isWeChat: isWeChat(),
		userAgent: navigator.userAgent,
		screenWidth: window.screen.width,
		screenHeight: window.screen.height,
	}
}
