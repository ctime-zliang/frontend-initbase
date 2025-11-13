import { STRING_TAG_BLANK, STRING_TAG_LEFT_BRACKETS, STRING_TAG_QUOT, STRING_TAG_RIGHT_BRACKETS, STRING_TAG_T } from './profile'
import { getContentWordLength } from './utils'

export class StringParser {
	private _str: string
	private _index: number
	constructor(str: string) {
		this._str = str
		this._index = 0
	}

	public get str(): string {
		return this._str
	}
	public set str(value: string) {
		this._str = value
	}

	public get index(): number {
		return this._index
	}
	public set index(value: number) {
		this._index = value
	}

	public reset(str: string): void {
		this._str = str
		this._index = 0
	}

	public skipToNextWord(): void {
		this.skipDelimiters()
		const len: number = getContentWordLength(this.str, this.index)
		this.index += len + 1
	}

	public getWord(): string {
		this.skipDelimiters()
		const len: number = getContentWordLength(this.str, this.index)
		if (len === 0) {
			return null!
		}
		const word: string = this.str.substr(this.index, len)
		this.index += len + 1
		return word
	}

	public getIntTranslatedWord(): number {
		return parseInt(this.getWord())
	}

	public getFloatTranslatedWord(): number {
		return parseFloat(this.getWord())
	}

	private skipDelimiters(): void {
		let idx: number = this.index
		for (; idx < this.str.length; idx++) {
			const c: string = this.str.charAt(idx)
			if (
				c === STRING_TAG_T ||
				c === STRING_TAG_BLANK ||
				c === STRING_TAG_LEFT_BRACKETS ||
				c === STRING_TAG_RIGHT_BRACKETS ||
				c === STRING_TAG_QUOT
			) {
				continue
			}
			break
		}
		this.index = idx
	}
}
