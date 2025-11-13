import { Color } from './Color'

export class Material {
	private _name: string
	private _color: Color
	constructor(name: string, r: number, g: number, b: number, a: number) {
		this._name = name
		this._color = new Color(r, g, b, a)
	}

	public get name(): string {
		return this._name
	}
	public set name(value: string) {
		this._name = value
	}

	public get color(): Color {
		return this._color
	}
	public set color(value: Color) {
		this._color = value
	}
}
