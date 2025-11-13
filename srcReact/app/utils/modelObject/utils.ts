import { STRING_TAG_BLANK, STRING_TAG_LEFT_BRACKETS, STRING_TAG_QUOT, STRING_TAG_RIGHT_BRACKETS, STRING_TAG_T } from './profile'
import { Vector3 } from './Vector3'

/**
 * 获取两个相邻分隔符之间的内容字符串的长度
 */
export function getContentWordLength(str: string, start: number): number {
	let idx: number = 0
	for (idx = start; idx < str.length; idx++) {
		const c: string = str.charAt(idx)
		if (
			c === STRING_TAG_T ||
			c === STRING_TAG_BLANK ||
			c === STRING_TAG_LEFT_BRACKETS ||
			c === STRING_TAG_RIGHT_BRACKETS ||
			c === STRING_TAG_QUOT
		) {
			break
		}
	}
	return idx - start
}

/**
 * 计算三个坐标点组成的平面的法向量
 */
export function calcNormal(p0: [number, number, number], p1: [number, number, number], p2: [number, number, number]): [number, number, number] {
	const v0: Array<number> = []
	const v1: Array<number> = []
	for (let i: number = 0; i < 3; i++) {
		v0[i] = p0[i] - p1[i]
		v1[i] = p2[i] - p1[i]
	}
	const c: Array<number> = []
	c[0] = v0[1] * v1[2] - v0[2] * v1[1]
	c[1] = v0[2] * v1[0] - v0[0] * v1[2]
	c[2] = v0[0] * v1[1] - v0[1] * v1[0]
	const v: Vector3 = new Vector3(c[0], c[1], c[2])
	v.normalize()
	return [v.x, v.y, v.z]
}
