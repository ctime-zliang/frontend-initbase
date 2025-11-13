const timeouts: Array<(...args: Array<any>) => any> = []
const MESSAGE_TOKEN: string = '--@Set-Message-Timeout'

function messageHandler(e: MessageEvent): void {
	if (e.source == window && e.data == MESSAGE_TOKEN) {
		e.stopPropagation()
		if (timeouts.length > 0) {
			const fn: (...args: Array<any>) => any = timeouts.shift()!
			fn()
		}
	}
}

window.addEventListener('message', messageHandler, true)

export function setMessageTimeout(fn: (...args: Array<any>) => any): void {
	timeouts.push(fn)
	window.postMessage(MESSAGE_TOKEN, '*')
}
