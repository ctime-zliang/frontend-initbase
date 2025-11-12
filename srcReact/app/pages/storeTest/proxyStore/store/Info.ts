import { MainStore } from './Main'

export class InfoStore {
	private parent: MainStore
	private _title: string
	private _name: string
	private _age: number
	constructor(parent: MainStore) {
		this.parent = parent
		this._title = ''
		this._name = ''
		this._age = 0
	}

	public get title(): string {
		return this._title
	}
	public set title(value: string) {
		this._title = value
	}

	public get name(): string {
		return this._name
	}
	public set name(value: string) {
		this._name = value
	}

	public get age(): number {
		return this._age
	}
	public set age(value: number) {
		this._age = value
	}
}
