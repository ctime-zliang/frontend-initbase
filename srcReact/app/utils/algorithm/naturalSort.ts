/**
 * @description 按照自然排序规律重排数组(简单数组或 json)元素
 * @function ven$naturalSort
 * @param {array<string|number|object>} array 被排序数组
 * @param {string} key 当 array 是 json 时, 指定一个排序依据键
 * @return {array<string|number|object>}
 */
export function naturalSort<T extends { [key: string]: any }>(array: Array<T>, key: string = '', desc: boolean = false): Array<T> {
	const indexArray: Array<number> = []
	const itemArray: Array<RegExpMatchArray | null> = []
	const typeArray: Array<Array<number>> = []
	const digit: number = 1
	const letter: number = 2
	for (let i: number = 0; i < array.length; i++) {
		indexArray[i] = i
		const string: string = key ? array[i][key] || '' : array[i]
		itemArray[i] = string.toUpperCase().match(/\D+|\d+(?:\.\d+)?/g)
		typeArray[i] = []
		if (itemArray[i]) {
			for (let j: number = 0; j < (itemArray[i] as RegExpMatchArray).length; j++) {
				typeArray[i][j] = (itemArray[i] as RegExpMatchArray)[j].match(/\d+/) ? digit : letter
			}
		}
	}
	indexArray.sort(naturalCompare(itemArray, typeArray, digit, letter, desc))
	const result: Array<T> = []
	for (let i: number = 0; i < array.length; i++) {
		result[i] = array[indexArray[i]]
	}
	return result
}
function naturalCompare(
	itemArray: Array<RegExpMatchArray | null>,
	typeArray: Array<Array<number>>,
	digit: number,
	lettter: number,
	desc: boolean
): (a: number, b: number) => number {
	return (a: number, b: number): number => {
		const itemA: RegExpMatchArray = itemArray[a]!
		const itemB: RegExpMatchArray = itemArray[b]!
		const typeA: Array<number> = typeArray[a]
		const typeB: Array<number> = typeArray[b]
		if (!itemA || !itemB) {
			if (desc) {
				return itemA === itemB ? 0 : itemB ? -1 : 1
			}
			return itemA === itemB ? 0 : itemA ? 1 : -1
		}
		const len: number = Math.max(itemA.length, itemB.length)
		for (let i: number = 0; i < len; i++) {
			if (desc) {
				if (!itemA[i]) {
					return 1
				}
				if (!itemB[i]) {
					return -1
				}
				if (itemA[i] === itemB[i]) {
					continue
				}
				if (typeA[i] !== typeB[i]) {
					return typeA[i] === digit ? 1 : -1
				}
				if (typeA[i] === digit) {
					return +itemB[i] - +itemA[i]
				}
				return itemA[i] < itemB[i] ? 1 : -1
			}
			if (!itemA[i]) {
				return -1
			}
			if (!itemB[i]) {
				return 1
			}
			if (itemA[i] === itemB[i]) {
				continue
			}
			if (typeA[i] !== typeB[i]) {
				return typeA[i] === digit ? -1 : 1
			}
			if (typeA[i] === digit) {
				return +itemA[i] - +itemB[i]
			}
			return itemA[i] < itemB[i] ? -1 : 1
		}
		return 0
	}
}
