import { EdaAbstractStore } from '../../../../store/edaStore/EdaAbstractStore'
import { MainStore } from './Main'

export class InfoStore extends EdaAbstractStore {
	private parent: MainStore
	private _title: string
	private _name: string
	private _age: number
	constructor(parent: MainStore) {
		super()
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
		this.notify()
	}

	public get name(): string {
		return this._name
	}
	public set name(value: string) {
		this._name = value
		this.notify()
	}

	public get age(): number {
		return this._age
	}
	public set age(value: number) {
		this._age = value
		this.notify()
	}
}
