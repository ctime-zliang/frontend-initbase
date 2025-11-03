export type FreeObject<U = any> = { [key: string]: U }
export type TClassNameItem = string | FreeObject<any> | Array<string | FreeObject<any>>
export type TClassNameList = Array<TClassNameItem>
export function classNames(...args: TClassNameList): string {
	const hasOwn = {}.hasOwnProperty
	const classes: Array<string> = []
	for (let i: number = 0; i < args.length; i++) {
		var arg = args[i]
		if (!args[i]) {
			continue
		}
		if (typeof args[i] === 'string' || typeof args[i] === 'number') {
			classes.push(args[i] as string)
			continue
		}
		if (Array.isArray(args[i]) && args[i].length) {
			const inner: string = classNames.apply(null, args[i] as TClassNameList)
			if (inner) {
				classes.push(inner)
			}
			continue
		}
		if (typeof args[i] === 'object') {
			for (let key in args[i] as FreeObject) {
				//@ts-ignore
				if (hasOwn.call(args[i], key) && args[i][key]) {
					classes.push(key)
				}
			}
		}
	}
	return classes.join(' ')
}
