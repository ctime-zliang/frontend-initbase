import { Normal } from './Normal'

export class Face {
	private _materialName: string
	private _vIndices: Array<number>
	private _nIndices: Array<number>
	private _normal: Normal
	private _numIndices: number
	constructor(materialName: string) {
		this._materialName = materialName
		if (materialName === null) {
			this._materialName = ''
		}
		this._vIndices = []
		this._nIndices = []
		this._normal = null!
		this._numIndices = 0
	}

	public get materialName(): string {
		return this._materialName
	}
	public set materialName(value: string) {
		this._materialName = value
	}

	public get vIndices(): Array<number> {
		return this._vIndices
	}
	public set vIndices(value: Array<number>) {
		this._vIndices = value
	}

	public get nIndices(): Array<number> {
		return this._nIndices
	}
	public set nIndices(value: Array<number>) {
		this._nIndices = value
	}

	public get normal(): Normal {
		return this._normal
	}
	public set normal(value: Normal) {
		this._normal = value
	}

	public get numIndices(): number {
		return this._numIndices
	}
	public set numIndices(value: number) {
		this._numIndices = value
	}
}
