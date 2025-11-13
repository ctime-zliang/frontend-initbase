import { Material } from './Material'
import { StringParser } from './StringParser'

export class MTLDoc {
	private _complete: boolean
	private _materials: Array<Material>
	constructor() {
		this._complete = false
		this._materials = []
	}

	public get complete(): boolean {
		return this._complete
	}
	public set complete(value: boolean) {
		this._complete = value
	}

	public get materials(): Array<Material> {
		return this._materials
	}
	public set materials(value: Array<Material>) {
		this._materials = value
	}

	public parseNewMTL(sp: StringParser): string {
		return sp.getWord()
	}

	public parseRGB(sp: StringParser, name: string): Material {
		const r: number = sp.getFloatTranslatedWord()
		const g: number = sp.getFloatTranslatedWord()
		const b: number = sp.getFloatTranslatedWord()
		return new Material(name, r, g, b, 1)
	}
}
