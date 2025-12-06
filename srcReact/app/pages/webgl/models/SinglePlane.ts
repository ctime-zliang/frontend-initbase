import { BaseModel } from './ModelBase'

export type TSinglePlaneModelParam = {
	width: number
	length: number
	zDist: number
	rgbaColor: {
		r: number
		g: number
		b: number
		a: number
	}
	offsetX: number
	offsetY: number
	offsetZ: number
}
export class SinglePlane extends BaseModel {
	protected _modelParam: TSinglePlaneModelParam
	constructor(
		width: number,
		length: number,
		zDist: number,
		rgbaColor: {
			r: number
			g: number
			b: number
			a: number
		} = {
			r: 1,
			g: 1,
			b: 1,
			a: 1,
		},
		offsetX: number = 0,
		offsetY: number = 0,
		offsetZ: number = 0
	) {
		super()
		this._modelParam = {
			width,
			length,
			zDist,
			rgbaColor,
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
			-this.modelParam.width / 2 + this.modelParam.offsetX,
			this.modelParam.zDist + this.modelParam.offsetY,
			-this.modelParam.length / 2 + this.modelParam.offsetZ,
			this.modelParam.rgbaColor.r,
			this.modelParam.rgbaColor.g,
			this.modelParam.rgbaColor.b,
			1.0,
			-this.modelParam.width / 2 + this.modelParam.offsetX,
			this.modelParam.zDist + this.modelParam.offsetY,
			this.modelParam.length / 2 + this.modelParam.offsetZ,
			this.modelParam.rgbaColor.r,
			this.modelParam.rgbaColor.g,
			this.modelParam.rgbaColor.b,
			1.0,
			this.modelParam.width / 2 + this.modelParam.offsetX,
			this.modelParam.zDist + this.modelParam.offsetY,
			this.modelParam.length / 2 + this.modelParam.offsetZ,
			this.modelParam.rgbaColor.r,
			this.modelParam.rgbaColor.g,
			this.modelParam.rgbaColor.b,
			1.0,
			-this.modelParam.width / 2 + this.modelParam.offsetX,
			this.modelParam.zDist + this.modelParam.offsetY,
			-this.modelParam.length / 2 + this.modelParam.offsetZ,
			this.modelParam.rgbaColor.r,
			this.modelParam.rgbaColor.g,
			this.modelParam.rgbaColor.b,
			1.0,
			this.modelParam.width / 2 + this.modelParam.offsetX,
			this.modelParam.zDist + this.modelParam.offsetY,
			this.modelParam.length / 2 + this.modelParam.offsetZ,
			this.modelParam.rgbaColor.r,
			this.modelParam.rgbaColor.g,
			this.modelParam.rgbaColor.b,
			1.0,
			this.modelParam.width / 2 + this.modelParam.offsetX,
			this.modelParam.zDist + this.modelParam.offsetY,
			-this.modelParam.length / 2 + this.modelParam.offsetZ,
			this.modelParam.rgbaColor.r,
			this.modelParam.rgbaColor.g,
			this.modelParam.rgbaColor.b,
			1.0,
		])
	}

	private createNormalData(): Float32Array {
		// prettier-ignore
		return new Float32Array([
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
        ])
	}
}
