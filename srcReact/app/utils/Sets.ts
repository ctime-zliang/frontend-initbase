export class Sets {
	/**
	 * 获取两个集合的并集
	 */
	static getUnion(setA: Set<any>, setB: Set<any>): Set<any> {
		return new Set([...setA, ...setB])
	}

	/**
	 * 获取两个集合的交集
	 */
	static getIntersect(setA: Set<any>, setB: Set<any>): Set<any> {
		return new Set(
			[...setA].filter((item: any): boolean => {
				return setB.has(item)
			})
		)
	}

	/**
	 * 获取两个集合的差集
	 */
	static getDifference(setA: Set<any>, setB: Set<any>): Set<any> {
		return new Set(
			[...setA].filter((item: any): boolean => {
				return !setB.has(item)
			})
		)
	}
}
