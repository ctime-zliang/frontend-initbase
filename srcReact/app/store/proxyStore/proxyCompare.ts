import { TKeyPath } from './types'
import { isObject } from './utils'

const GET_ORIGINAL_SYMBOL: unique symbol = Symbol()

function getOriginalObject<T extends object>(object: T): PlainObject {
	return (object as { [GET_ORIGINAL_SYMBOL]?: typeof object })[GET_ORIGINAL_SYMBOL] || object
}

export function isChanged(prevObject: PlainObject, nextObject: PlainObject, affected: WeakMap<object, Set<TKeyPath>>): boolean {
	if (Object.is(prevObject, nextObject)) {
		return false
	}
	if (!isObject(prevObject) || !isObject(nextObject)) {
		return true
	}
	const keySet: Set<TKeyPath> = affected.get(getOriginalObject(prevObject)) || (new Set<TKeyPath>() as Set<TKeyPath>)
	const keys: Array<TKeyPath> = Array.from(keySet)
	let changed: boolean = null!
	try {
		for (let i: number = 0; i < keys.length; i++) {
			changed = Reflect.get(prevObject, keys[i]) !== Reflect.get(nextObject, keys[i])
			if (changed) {
				return changed
			}
		}
		return changed === null ? true : !!changed
	} catch (e) {
		return true
	}
}
