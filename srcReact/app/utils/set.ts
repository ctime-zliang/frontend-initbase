/**
 * 获取两个集合的并集
 */
function getUnionOfSets(setA: Set<any>, setB: Set<any>): Set<any> {
	return new Set([...setA, ...setB])
}

/**
 * 获取两个集合的交集
 */
function getIntersectOfSets(setA: Set<any>, setB: Set<any>): Set<any> {
	return new Set(
		[...setA].filter(item => {
			return setB.has(item)
		})
	)
}

/**
 * 获取两个集合的差集
 */
function getDifferenceOfSets(setA: Set<any>, setB: Set<any>): Set<any> {
	return new Set(
		[...setA].filter(item => {
			return !setB.has(item)
		})
	)
}
