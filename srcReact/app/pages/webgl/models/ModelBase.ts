import { Matrix4 } from '@/app/utils/algorithm/Matrix4'
import { Quaternion } from '@/app/utils/algorithm/Quaternion'

export abstract class BaseModel {
	protected abstract _modelParam: any
	private _vertexData: Float32Array
	private _normalData: Float32Array
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
		this._vertexData = null!
		this._normalData = null!
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

	public get vertexData(): Float32Array {
		return this._vertexData
	}
	public set vertexData(value: Float32Array) {
		this._vertexData = value
	}

	public get normalData(): Float32Array {
		return this._normalData
	}
	public set normalData(value: Float32Array) {
		this._normalData = value
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
}

export class BaseBuffer {
	private _vertexBuffer: WebGLBuffer
	private _normalBuffer: WebGLBuffer
	private _colorBuffer: WebGLBuffer
	private _indexBuffer: WebGLBuffer
	private _texCoordBuffer: WebGLBuffer
	private _modelMatrix: Matrix4
	constructor() {
		this._vertexBuffer = null!
		this._normalBuffer = null!
		this._colorBuffer = null!
		this._indexBuffer = null!
		this._texCoordBuffer = null!
		this._modelMatrix = null!
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

export class Objecter {
	private _model: BaseModel
	private _buffer: BaseBuffer
	private _quaternion: Quaternion
	constructor(model: BaseModel, buffer: BaseBuffer, quaternion: Quaternion = null!) {
		this._model = model
		this._buffer = buffer
		this._quaternion = quaternion
	}

	public get model(): BaseModel {
		return this._model
	}
	public set model(value: BaseModel) {
		this._model = value
	}

	public get buffer(): BaseBuffer {
		return this._buffer
	}
	public set buffer(value: BaseBuffer) {
		this._buffer = value
	}

	public get quaternion(): Quaternion {
		return this._quaternion
	}
	public set quaternion(value: Quaternion) {
		this._quaternion = value
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
