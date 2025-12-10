import { BaseModel } from './ModelBase'

export type TSinglePlaneModelParam = {
	offsetX: number
	offsetY: number
	offsetZ: number
}
export class Triangles extends BaseModel {
	protected _modelParam: TSinglePlaneModelParam
	constructor(offsetX: number = 0, offsetY: number = 0, offsetZ: number = 0) {
		super()
		this._modelParam = {
			offsetX,
			offsetY,
			offsetZ,
		}
		this.vertexData = this.createVertexData()
		this.normalData = this.createNormalData()
	}

	public get modelParam(): TSinglePlaneModelParam {
		return this._modelParam
	}
	public set modelParam(value: TSinglePlaneModelParam) {
		this._modelParam = value
	}

	private createVertexData(): Float32Array {
		// prettier-ignore
		return new Float32Array([
			/**
			 * 右侧三角
			 */
			/* 绿色 */
			7.5, 10, -40, 0.4, 1.0, 0.4, 1.0, 
			2.5, -10, -40, 0.4, 1.0, 0.4, 1.0, 
			12.5, -10, -40, 1.0, 0.4, 0.4, 1.0,
			/* 黄色 */
			7.5, 10, -20, 1.0, 1.0, 0.4, 1.0, 
			2.5, -10, -20, 1.0, 1.0, 0.4, 1.0, 
			12.5, -10, -20, 1.0, 0.4, 0.4, 1.0,
			/* 蓝色 */
			7.5, 10, 0.0, 0.4, 0.4, 1.0, 1.0, 
			2.5, -10, 0.0, 0.4, 0.4, 1.0, 1.0, 
			12.5, -10, 0.0, 1.0, 0.4, 0.4, 1.0,
			/**
			 * 左侧三角
			 */ 
			-7.5, 10, -40, 0.4, 1.0, 0.4, 1.0, 
			-12.5, -10, -40, 0.4, 1.0, 0.4, 1.0, 
			-2.5, -10, -40, 1.0, 0.4, 0.4, 1.0,
			/* 黄色 */
			-7.5, 10, -20, 1.0, 1.0, 0.4, 1.0, 
			-12.5, -10, -20, 1.0, 1.0, 0.4, 1.0, 
			-2.5, -10, -20, 1.0, 0.4, 0.4, 1.0,
			/* 蓝色 */
			-7.5, 10, 0.0, 0.4, 0.4, 1.0, 1.0, 
			-12.5, -10, 0.0, 0.4, 0.4, 1.0, 1.0, 
			-2.5, -10, 0.0, 1.0, 0.4, 0.4, 1.0,
		])
	}

	private createNormalData(): Float32Array {
		// prettier-ignore
		return new Float32Array([
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
        ])
	}
}
