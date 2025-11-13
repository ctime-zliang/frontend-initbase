export class Color {
	private _r: number
	private _g: number
	private _b: number
	private _a: number
	constructor(r: number, g: number, b: number, a: number) {
		this._r = r
		this._g = g
		this._b = b
		this._a = a
	}

	public get r(): number {
		return this._r
	}
	public set r(value: number) {
		this._r = value
	}

	public get g(): number {
		return this._g
	}
	public set g(value: number) {
		this._g = value
	}

	public get b(): number {
		return this._b
	}
	public set b(value: number) {
		this._b = value
	}

	public get a(): number {
		return this._a
	}
	public set a(value: number) {
		this._a = value
	}
}
