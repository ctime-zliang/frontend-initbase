import { Face } from './Face'

export class OBJObject {
	private _name: string
	private _faces: Array<Face>
	private _numIndices: number
	constructor(name: string) {
		this._name = name
		this._faces = []
		this._numIndices = 0
	}

	public get name(): string {
		return this._name
	}
	public set name(value: string) {
		this._name = value
	}

	public get faces(): Array<Face> {
		return this._faces
	}
	public set faces(value: Array<Face>) {
		this._faces = value
	}

	public get numIndices(): number {
		return this._numIndices
	}
	public set numIndices(value: number) {
		this._numIndices = value
	}

	public addFace(face: Face): void {
		this.faces.push(face)
		this.numIndices += face.numIndices
	}
}
