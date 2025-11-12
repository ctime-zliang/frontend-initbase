/**
 * JSON 深拷贝
 */
export function deepClone(data: any): any {
	const wMap: WeakMap<Object, any> = new WeakMap()
	const traverse = (data: any): any => {
		const result: { [key: string]: any } = {}
		let keys: Array<string> = []
		let item: any = null
		if (wMap.get(data)) {
			return wMap.get(data)
		}
		keys = Object.keys(data)
		wMap.set(data, result)
		for (let i: number = 0; i < keys.length; i++) {
			item = data[keys[i]]
			if (Object.prototype.toString.call(item).slice(8, -1) === 'Object') {
				result[keys[i]] = traverse(item)
				continue
			}
			result[keys[i]] = item
		}
		return result
	}
	return traverse(data)
}

/**
 * JSON 深拷贝
 */
export function deepClone2(data: any): any {
	const traverse = (data: { [key: string]: any } | Array<any>): { [key: string]: any } | Array<any> => {
		if (
			typeof data !== 'object' ||
			data === null ||
			data instanceof Date ||
			data instanceof ArrayBuffer ||
			data instanceof Uint8ClampedArray ||
			data instanceof Uint8Array ||
			data instanceof Uint16Array ||
			data instanceof Uint32Array
		) {
			return data
		}
		if (Array.isArray(data)) {
			return data.map(traverse)
		}
		const obj: { [key: string]: any } = {}
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				obj[key] = traverse(data[key])
			}
		}
		return obj
	}
	return traverse(data)
}

/**
 * JSON 深拷贝
 */
export function deepCloneByMessageChannel(json: any): Promise<any> {
	return new Promise((resolve): any => {
		try {
			const { port1, port2 } = new MessageChannel()
			port2.onmessage = function (e: MessageEvent): void {
				resolve(e.data)
			}
			port1.postMessage(json)
		} catch (e: any) {
			resolve(null!)
		}
	})
}
