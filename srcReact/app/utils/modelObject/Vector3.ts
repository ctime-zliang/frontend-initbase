export class Vector3 {
	private _x: number
	private _y: number
	private _z: number
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this._x = x
		this._y = y
		this._z = z
	}

	public get x(): number {
		return this._x
	}
	public set x(value: number) {
		this._x = value
	}

	public get y(): number {
		return this._y
	}
	public set y(value: number) {
		this._y = value
	}

	public get z(): number {
		return this._z
	}
	public set z(value: number) {
		this._z = value
	}

	public get length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	}

	public normalize(): Vector3 {
		if (this.x === 0 && this.y === 0 && this.z === 0) {
			return new Vector3(0, 0, 0)
		}
		const sx: number = this.x / this.length
		const sy: number = this.y / this.length
		const sz: number = this.z / this.length
		return new Vector3(sx, sy, sz)
	}
}
