export enum EChangedType {
	CREATED = 'CREATED',
	UPDATED = 'UPDATED',
	DELETED = 'DELETED',
	UNCHANGED = 'UNCHANGED',
}
export class DiffJSON {
	static TYPE = {
		CREATED: EChangedType.CREATED,
		UPDATED: EChangedType.UPDATED,
		DELETED: EChangedType.DELETED,
		UNCHANGED: EChangedType.UNCHANGED,
	}

	static FEA = {
		KEY_TYPE: '$$TYPE',
		KEY_NEW_DATA: '$$NEW_DATA',
		KEY_OLD_DATA: '$$OLD_DATA',
		KEY_NEW_CLASSOF: '$$KEY_NEW_CLASSOF',
		KEY_OLD_CLASSOF: '$$KEY_OLD_CLASSOF',
		KEY_PATH: '$$KEY_PATH',
	}

	static classOf(target: any): string {
		return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
	}

	static isFunction(target: any): boolean {
		return this.classOf(target) === 'function'
	}

	static isArray(target: any): boolean {
		return this.classOf(target) === 'array'
	}

	static isObject(target: any): boolean {
		return this.classOf(target) === 'object'
	}

	static isDate(target: any): boolean {
		return this.classOf(target) === 'date'
	}

	static isUndefined(target: any): boolean {
		return this.classOf(target) === 'undefined'
	}

	static isNull(target: any): boolean {
		return this.classOf(target) === 'null'
	}

	static isRegexp(target: any): boolean {
		return this.classOf(target) === 'regexp'
	}

	static isError(target: any): boolean {
		return this.classOf(target) === 'error'
	}

	static isMap(target: any): boolean {
		return this.classOf(target) === 'map'
	}

	static isWeakMap(target: any): boolean {
		return this.classOf(target) === 'weakmap'
	}

	static isSet(target: any): boolean {
		return this.classOf(target) === 'set'
	}

	static isWeakSet(target: any): boolean {
		return this.classOf(target) === 'weakset'
	}

	static isSymbol(target: any): boolean {
		return this.classOf(target) === 'symbol'
	}

	static isBigInt(target: any): boolean {
		return this.classOf(target) === 'bigint'
	}

	static isEmpty(target: any): boolean {
		if (this.isMap(target) || this.isWeakMap(target) || this.isSet(target) || this.isWeakSet(target)) {
			return target.size() <= 0
		}
		if (this.isArray(target)) {
			return target.length <= 0
		}
		if (this.isObject(target)) {
			return Object.keys(target).length <= 0
		}
		return true
	}

	static isEmptyArray(target: any): boolean {
		return target.length <= 0
	}

	static isEmptyObject(target: any): boolean {
		return Object.keys(target).length <= 0
	}

	static isSameType(target1: any, target2: any): boolean {
		return this.classOf(target1) === this.classOf(target2)
	}

	static isPrimitiveValue(target: any): boolean {
		return !this.isObject(target) && !this.isArray(target)
	}

	static compareValues(value1: any, value2: any): EChangedType {
		if (value1 === value2) {
			return this.TYPE.UNCHANGED
		}
		if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
			return this.TYPE.UNCHANGED
		}
		if ('undefined' == typeof value1) {
			return this.TYPE.CREATED
		}
		if ('undefined' == typeof value2) {
			return this.TYPE.DELETED
		}
		return this.TYPE.UPDATED
	}

	/**
	 * diff 主函数
	 * 		返回层次化 key-path 返回格式
	 */
	static implementByNested(obj1: any, obj2: any): PlainObject {
		return implementByNested(obj1, obj2)
	}

	/**
	 * @description diff 主函数
	 * 		扁平化化 key-path 返回格式
	 * @function exec2
	 * @param {object|array} obj1 对象 1(基准对象)
	 * @param {object|array} obj2 对象 2(被检查对象)
	 * @return {object}
	 */
	static __flatOutput: PlainObject = {}
	static implementByFlat(obj1: any, obj2: any): PlainObject {
		this.__flatOutput = {}
		implementByFlat(obj1, obj2, '')
		return this.__flatOutput
	}
}

function implementByNested(obj1: any, obj2: any): PlainObject {
	const result: PlainObject = {}
	let valueOfObj2: any = undefined!
	if (DiffJSON.isFunction(obj1) || DiffJSON.isFunction(obj2)) {
		throw new Error('invalid argument. function given, object expected.')
	}
	if (DiffJSON.isPrimitiveValue(obj1) || DiffJSON.isPrimitiveValue(obj2)) {
		return {
			[DiffJSON.FEA.KEY_TYPE]: DiffJSON.compareValues(obj1, obj2),
			[DiffJSON.FEA.KEY_NEW_DATA]: obj2 || undefined,
			[DiffJSON.FEA.KEY_OLD_DATA]: obj1 || undefined,
			[DiffJSON.FEA.KEY_NEW_CLASSOF]: DiffJSON.classOf(obj2),
			[DiffJSON.FEA.KEY_OLD_CLASSOF]: DiffJSON.classOf(obj1),
		}
	}
	let hasSet: boolean = false
	for (let key in obj1) {
		if (DiffJSON.isFunction(obj1[key])) {
			continue
		}
		valueOfObj2 = undefined
		if ('undefined' !== typeof obj2[key]) {
			valueOfObj2 = obj2[key]
		}
		hasSet = true
		result[key] = implementByNested(obj1[key], valueOfObj2)
	}
	for (let key in obj2) {
		if (DiffJSON.isFunction(obj2[key]) || 'undefined' != typeof result[key]) {
			continue
		}
		hasSet = true
		result[key] = implementByNested(undefined, obj2[key])
	}
	if (!hasSet) {
		return {
			[DiffJSON.FEA.KEY_TYPE]: DiffJSON.isSameType(obj1, obj2) ? DiffJSON.TYPE.UNCHANGED : DiffJSON.TYPE.UPDATED,
			[DiffJSON.FEA.KEY_NEW_DATA]: obj2 || undefined,
			[DiffJSON.FEA.KEY_OLD_DATA]: obj1 || undefined,
			[DiffJSON.FEA.KEY_NEW_CLASSOF]: DiffJSON.classOf(obj2),
			[DiffJSON.FEA.KEY_OLD_CLASSOF]: DiffJSON.classOf(obj1),
		}
	}
	result[DiffJSON.FEA.KEY_TYPE] = DiffJSON.isSameType(obj1, obj2) ? DiffJSON.TYPE.UNCHANGED : DiffJSON.TYPE.UPDATED
	result[DiffJSON.FEA.KEY_NEW_CLASSOF] = DiffJSON.classOf(obj2)
	result[DiffJSON.FEA.KEY_OLD_CLASSOF] = DiffJSON.classOf(obj1)
	return result
}

function implementByFlat(obj1: any, obj2: any, path: string = ''): PlainObject {
	const result: PlainObject = {}
	let valueOfObj2: any = undefined!
	if (DiffJSON.isFunction(obj1) || DiffJSON.isFunction(obj2)) {
		throw new Error('invalid argument. function given, object expected.')
	}
	if (DiffJSON.isPrimitiveValue(obj1) || DiffJSON.isPrimitiveValue(obj2)) {
		return {
			[DiffJSON.FEA.KEY_TYPE]: DiffJSON.compareValues(obj1, obj2),
			[DiffJSON.FEA.KEY_NEW_DATA]: obj2 || undefined,
			[DiffJSON.FEA.KEY_OLD_DATA]: obj1 || undefined,
			[DiffJSON.FEA.KEY_NEW_CLASSOF]: DiffJSON.classOf(obj2),
			[DiffJSON.FEA.KEY_OLD_CLASSOF]: DiffJSON.classOf(obj1),
			[DiffJSON.FEA.KEY_PATH]: path,
		}
	}
	let hasSet: boolean = false
	let iPath: string = path
	if (DiffJSON.isArray(obj1) && DiffJSON.isArray(obj2)) {
		if (obj1.length === 1 && obj2.length === 1 && obj1[0] === obj2[0]) {
			return {
				[DiffJSON.FEA.KEY_TYPE]: DiffJSON.TYPE.UNCHANGED,
				[DiffJSON.FEA.KEY_NEW_DATA]: obj2 || undefined,
				[DiffJSON.FEA.KEY_OLD_DATA]: obj1 || undefined,
				[DiffJSON.FEA.KEY_NEW_CLASSOF]: DiffJSON.classOf(obj2),
				[DiffJSON.FEA.KEY_OLD_CLASSOF]: DiffJSON.classOf(obj1),
				[DiffJSON.FEA.KEY_PATH]: path,
			}
		}
		if (DiffJSON.isEmptyArray(obj1) && DiffJSON.isEmptyArray(obj2)) {
			return {
				[DiffJSON.FEA.KEY_TYPE]: DiffJSON.TYPE.UNCHANGED,
				[DiffJSON.FEA.KEY_NEW_DATA]: obj2 || undefined,
				[DiffJSON.FEA.KEY_OLD_DATA]: obj1 || undefined,
				[DiffJSON.FEA.KEY_NEW_CLASSOF]: DiffJSON.classOf(obj2),
				[DiffJSON.FEA.KEY_OLD_CLASSOF]: DiffJSON.classOf(obj1),
				[DiffJSON.FEA.KEY_PATH]: path,
			}
		}
	}
	for (let key in obj1) {
		if (DiffJSON.isFunction(obj1[key])) {
			continue
		}
		valueOfObj2 = undefined
		if ('undefined' !== typeof obj2[key]) {
			valueOfObj2 = obj2[key]
		}
		hasSet = true
		iPath = path + '/' + key
		result[key] = implementByFlat(obj1[key], valueOfObj2, iPath)
		if (result[key][DiffJSON.FEA.KEY_PATH]) {
			DiffJSON.__flatOutput[result[key][DiffJSON.FEA.KEY_PATH]] = result[key]
		}
	}
	for (let key in obj2) {
		if (DiffJSON.isFunction(obj2[key]) || 'undefined' != typeof result[key]) {
			continue
		}
		hasSet = true
		iPath = path + '/' + key
		result[key] = implementByFlat(undefined, obj2[key])
		if (result[key][DiffJSON.FEA.KEY_PATH]) {
			DiffJSON.__flatOutput[result[key][DiffJSON.FEA.KEY_PATH]] = result[key]
		}
	}
	if (!hasSet) {
		return {
			[DiffJSON.FEA.KEY_TYPE]: DiffJSON.isSameType(obj1, obj2) ? DiffJSON.TYPE.UNCHANGED : DiffJSON.TYPE.UPDATED,
			[DiffJSON.FEA.KEY_NEW_DATA]: obj2 || undefined,
			[DiffJSON.FEA.KEY_OLD_DATA]: obj1 || undefined,
			[DiffJSON.FEA.KEY_NEW_CLASSOF]: DiffJSON.classOf(obj2),
			[DiffJSON.FEA.KEY_OLD_CLASSOF]: DiffJSON.classOf(obj1),
			[DiffJSON.FEA.KEY_PATH]: path,
		}
	}
	result[DiffJSON.FEA.KEY_TYPE] = DiffJSON.isSameType(obj1, obj2) ? DiffJSON.TYPE.UNCHANGED : DiffJSON.TYPE.UPDATED
	result[DiffJSON.FEA.KEY_NEW_CLASSOF] = DiffJSON.classOf(obj2)
	result[DiffJSON.FEA.KEY_OLD_CLASSOF] = DiffJSON.classOf(obj1)
	return result
}
