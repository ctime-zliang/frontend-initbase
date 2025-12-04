import { Matrix4 } from '@/app/utils/algorithm/Matrix4'

export class BaseModel {
	private _vertexDatas: Float32Array
	private _modelParam: any
	private _modeControl: any
	private _modelRatation: {
		x: number
		y: number
		z: number
	}
	private _modelOffset: {
		x: number
		y: number
		z: number
	}
	private _modelScale: {
		x: number
		y: number
		z: number
	}
	constructor() {
		this._vertexDatas = null!
		this._modelParam = null
		this._modeControl = {}
		this._modelRatation = {
			x: 0,
			y: 0,
			z: 0,
		}
		this._modelOffset = {
			x: 0,
			y: 0,
			z: 0,
		}
		this._modelScale = {
			x: 1,
			y: 1,
			z: 1,
		}
	}

	public get modelParam(): any {
		return this._modelParam
	}
	public set modelParam(value: any) {
		this._modelParam = value
	}

	public get modeControl(): any {
		return this._modeControl
	}

	public get modelRatation(): {
		x: number
		y: number
		z: number
	} {
		return this._modelRatation
	}

	public get modelOffset(): {
		x: number
		y: number
		z: number
	} {
		return this._modelOffset
	}

	public get modelScale(): {
		x: number
		y: number
		z: number
	} {
		return this._modelScale
	}

	public get vertexDatas(): Float32Array {
		return this._vertexDatas
	}
	public set vertexDatas(value: Float32Array) {
		this._vertexDatas = value
	}
}

export class BaseBuffer {
	private _featureBuffer: WebGLBuffer
	private _vertexBuffer: WebGLBuffer
	private _normalBuffer: WebGLBuffer
	private _colorBuffer: WebGLBuffer
	private _indexBuffer: WebGLBuffer
	private _texCoordBuffer: WebGLBuffer
	private _modelMatrix: Matrix4
	constructor() {
		this._featureBuffer = null!
		this._vertexBuffer = null!
		this._normalBuffer = null!
		this._colorBuffer = null!
		this._indexBuffer = null!
		this._texCoordBuffer = null!
		this._modelMatrix = null!
	}

	public get featureBuffer(): WebGLBuffer {
		return this._featureBuffer
	}
	public set featureBuffer(value: WebGLBuffer) {
		this._featureBuffer = value
	}

	public get vertexBuffer(): WebGLBuffer {
		return this._vertexBuffer
	}
	public set vertexBuffer(value: WebGLBuffer) {
		this._vertexBuffer = value
	}

	public get normalBuffer(): WebGLBuffer {
		return this._normalBuffer
	}
	public set normalBuffer(value: WebGLBuffer) {
		this._normalBuffer = value
	}

	public get colorBuffer(): WebGLBuffer {
		return this._colorBuffer
	}
	public set colorBuffer(value: WebGLBuffer) {
		this._colorBuffer = value
	}

	public get indexBuffer(): WebGLBuffer {
		return this._indexBuffer
	}
	public set indexBuffer(value: WebGLBuffer) {
		this._indexBuffer = value
	}

	public get texCoordBuffer(): WebGLBuffer {
		return this._texCoordBuffer
	}
	public set texCoordBuffer(value: WebGLBuffer) {
		this._texCoordBuffer = value
	}

	public get modelMatrix(): Matrix4 {
		return this._modelMatrix
	}
	public set modelMatrix(value: Matrix4) {
		this._modelMatrix = value
	}
}

export class Manager {
	private _items: Map<string, { model: BaseModel; setting: BaseBuffer }>
	constructor() {
		this._items = new Map()
	}

	public addItem(id: string, model: BaseModel, setting: BaseBuffer): void {
		this._items.set(id, { model, setting })
	}

	public removeItem(id: string): void {
		this._items.delete(id)
	}

	public getItem(id: string): { model: BaseModel; setting: BaseBuffer } | null {
		return this._items.get(id) || null!
	}
}
