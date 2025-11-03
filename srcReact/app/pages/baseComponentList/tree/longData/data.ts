export function createLongData(size: number = 6000): any {
	const array: Array<any> = []
	for (let i: number = 0; i < size; i++) {
		array.push({ id: i, title: i })
	}
	return array
}
