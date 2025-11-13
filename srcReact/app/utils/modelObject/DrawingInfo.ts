export class DrawingInfo {
	private _vertices: Float32Array
	private _normals: Float32Array
	private _colors: Float32Array
	private _indices: Uint16Array
	constructor(vertices: Float32Array, normals: Float32Array, colors: Float32Array, indices: Uint16Array) {
		this._vertices = vertices
		this._normals = normals
		this._colors = colors
		this._indices = indices
	}

	public get vertices(): Float32Array {
		return this._vertices
	}
	public set vertices(value: Float32Array) {
		this._vertices = value
	}

	public get normals(): Float32Array {
		return this._normals
	}
	public set normals(value: Float32Array) {
		this._normals = value
	}

	public get colors(): Float32Array {
		return this._colors
	}
	public set colors(value: Float32Array) {
		this._colors = value
	}

	public get indices(): Uint16Array {
		return this._indices
	}
	public set indices(value: Uint16Array) {
		this._indices = value
	}
}
