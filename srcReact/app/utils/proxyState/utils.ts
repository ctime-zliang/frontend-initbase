export function isObject(val: any): boolean {
	return typeof val === 'object' && val !== null
}

export function canProxy(val: any): boolean {
	return (
		isObject(val) &&
		(Array.isArray(val) || !(Symbol.iterator in val)) &&
		!(val instanceof WeakMap) &&
		!(val instanceof WeakSet) &&
		!(val instanceof Error) &&
		!(val instanceof Number) &&
		!(val instanceof Date) &&
		!(val instanceof String) &&
		!(val instanceof RegExp) &&
		!(val instanceof ArrayBuffer)
	)
}
