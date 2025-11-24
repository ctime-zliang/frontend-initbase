export function bubbleSortOptimi<T>(arr: Array<T>): Array<T> {
	const arrCopy: Array<T> = arr.slice(0)
	const len: number = arrCopy.length
	let swap: T = undefined!
	let isChange: boolean = false
	for (let i: number = 0; i < len; i++) {
		isChange = false
		for (let j: number = len - 1; j > i; j--) {
			if (arrCopy[j - 1] > arrCopy[j]) {
				swap = arrCopy[j - 1]
				arrCopy[j - 1] = arrCopy[j]
				arrCopy[j] = swap
				isChange = true
			}
		}
		/**
		 * 如果某一轮遍历未发生值对换, 则表示该数组已排序完成
		 */
		if (!isChange) {
			break
		}
	}
	return arrCopy
}

export function selectionSort<T>(arr: Array<T>): Array<T> {
	const arrCopy: Array<T> = arr.slice(0)
	const len: number = arrCopy.length
	let minIndexPos: number = 0
	let swap: T = undefined!
	for (let i: number = 0; i < len - 1; i++) {
		minIndexPos = i
		/**
		 * 内层遍历, 查找最小值
		 */
		for (let j: number = i + 1; j < len; j++) {
			if (arrCopy[j] < arrCopy[minIndexPos]) {
				minIndexPos = j
			}
		}
		/**
		 * 交换当前遍历段第一个元素与最小值元素的位置
		 */
		swap = arrCopy[minIndexPos]
		arrCopy[minIndexPos] = arrCopy[i]
		arrCopy[i] = swap
	}
	return arrCopy
}

export function quickSeqSort<T>(arr: Array<T>): Array<T> {
	return recursion(arr.slice(0))

	function recursion<T>(arr: Array<T>): Array<T> {
		if (arr.length <= 1) {
			return arr
		}
		const leftArr: Array<T> = []
		const rightArr: Array<T> = []
		let middleIndex: number = Math.floor(arr.length / 2)
		let middleValue: T = arr.splice(middleIndex, 1)[0]
		/**
		 * 遍历数组
		 * 按照大小归类
		 * 左侧数组存储大于等于中间值的元素项
		 * 右侧数组存储小于中间值的元素项
		 */
		for (let i: number = 0; i < arr.length; i++) {
			arr[i] < middleValue ? leftArr.push(arr[i]) : rightArr.push(arr[i])
		}
		return recursion(leftArr).concat([middleValue], recursion(rightArr))
	}
}

export function quickInvSort<T>(arr: Array<T>): Array<T> {
	return recursion(arr.slice(0))

	function recursion<T>(arr: Array<T>): Array<T> {
		if (arr.length <= 1) {
			return arr
		}
		const leftArr: Array<T> = []
		const rightArr: Array<T> = []
		let middleIndex: number = Math.floor(arr.length / 2)
		let middleValue: T = arr.splice(middleIndex, 1)[0]
		/**
		 * 遍历数组
		 * 按照大小归类
		 * 左侧数组存储大于等于中间值的元素项
		 * 右侧数组存储小于中间值的元素项
		 */
		for (let i: number = 0; i < arr.length; i++) {
			arr[i] >= middleValue ? leftArr.push(arr[i]) : rightArr.push(arr[i])
		}
		return recursion(leftArr).concat([middleValue], recursion(rightArr))
	}
}

export function insertSort<T>(arr: Array<T>): Array<T> {
	const arrCopy: Array<T> = arr.slice(0)
	const len: number = arrCopy.length
	let tagValue: T = undefined!
	let tagIndex: number = 0
	for (let i = 1; i < len; i++) {
		/**
		 * 缓存 标记值 & 标记索引
		 */
		tagValue = arrCopy[((tagIndex = i), tagIndex)]
		/**
		 * 依次判断内层遍历各项与标记值得大小
		 * 从标记索引开始 向前遍历
		 */
		while (tagIndex > 0) {
			/**
			 * 如果
			 *      遍历中某项的值大于标记值, 则将其后移一位, 依次进行
			 * 否则
			 *      退出内层遍历
			 */
			if (tagValue < arrCopy[tagIndex - 1]) {
				arrCopy[tagIndex] = arrCopy[tagIndex - 1]
				tagIndex--
			} else {
				break
			}
		}
		/**
		 * 内层遍历结束后, 将标记值写入到新的索引位置(tagIndex的值可能没有变化)
		 */
		arrCopy[tagIndex] = tagValue
	}
	return arrCopy
}

export function mergeSort<T>(arr: Array<T>): Array<T> {
	return groupRecursion(arr.slice(0))

	function groupRecursion<T>(arr: Array<T>): Array<T> {
		if (arr.length <= 1) {
			return arr
		}
		/**
		 * 获取数组中间项索引
		 * 并按照索引分割数组
		 */
		const middleIndex: number = Math.floor(arr.length / 2)
		const leftArr: Array<T> = arr.slice(0, middleIndex)
		const rightArr: Array<T> = arr.slice(middleIndex)
		return merge(groupRecursion(leftArr), groupRecursion(rightArr))
	}

	function merge<T>(leftArr: Array<T>, rightArr: Array<T>): Array<T> {
		const array: Array<T> = []
		/**
		 * 遍历并对比左数组和右数组
		 */
		while (leftArr.length && rightArr.length) {
			if (leftArr[0] <= rightArr[0]) {
				array.push(leftArr.shift()!)
			} else {
				array.push(rightArr.shift()!)
			}
		}
		/**
		 * 将左数组剩余项压入结果集
		 */
		while (leftArr.length) {
			array.push(leftArr.shift()!)
		}
		/**
		 * 将右数组剩余项压入结果集
		 */
		while (rightArr.length) {
			array.push(rightArr.shift()!)
		}
		return array
	}
}
