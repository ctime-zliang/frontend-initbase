export function powerValue(x: number, n: number = 2): number | null {
	if (typeof x !== 'number' || typeof n !== 'number') {
		// throw new Error(`Illegal parameter`)
		return null
	}
	return x ** n
}
