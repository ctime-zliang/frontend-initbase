export function arrayEquals<T>(a1: Array<T>, a2: Array<T>): boolean {
	const len1: number = a1.length
	const len2: number = a2.length
	if (len1 !== len2) {
		return false
	}
	for (let k1: number = 0; k1 < len1; k1++) {
		for (let k2: number = 0; k2 < len2; k2++) {
			if (a1[k1] !== a2[k2]) {
				return false
			}
		}
	}
	return true
}

export function createArray<T extends string>(length: number, value: T = undefined!): Array<string> {
	return new Array(length + 1).join(value).split('')
}

export function arrayCopy<T>(sourceArray: Array<T>, sourceIndex: number, resultArray: Array<T>, resultIndex: number, copyLength: number): void {
	if (sourceArray.length >= sourceIndex + copyLength && resultArray.length >= resultIndex + copyLength) {
		while (copyLength-- > 0) {
			resultArray[resultIndex++] = sourceArray[sourceIndex++]
		}
		return
	}
	throw new Error('cannot read array out of range.')
}
