type TLinkedListNodeKey = any

export class SinglyLinkedListNode<T> {
	private _key: T
	private _next: SinglyLinkedListNode<T>
	constructor(key: TLinkedListNodeKey, next: SinglyLinkedListNode<T> = undefined!) {
		this._key = key === undefined ? undefined! : key
		this._next = next === undefined ? null! : next
	}

	public get key(): T {
		return this._key
	}
	public set key(value: T) {
		this._key = value
	}

	public get next(): SinglyLinkedListNode<T> {
		return this._next
	}
	public set next(value: SinglyLinkedListNode<T>) {
		this._next = value!
	}
}

export class SinglyLinkedList<T> {
	private _size: number
	private _head: SinglyLinkedListNode<T>
	constructor() {
		this._size = 0
		this._head = null!
	}

	public get head(): SinglyLinkedListNode<T> {
		return this._head
	}
	protected set head(value: SinglyLinkedListNode<T>) {
		this._head = value
	}

	public get size(): number {
		return this._size
	}
	protected set size(value: number) {
		this._size = value
	}

	public getItemAt(index: number): SinglyLinkedListNode<T> {
		if (index < 0 || index > this.size - 1) {
			console.warn(`query index out of bounds.`)
			return null!
		}
		let current: SinglyLinkedListNode<T> = this.head
		for (let i: number = 0; i < index; i++) {
			current = current.next!
		}
		return current
	}

	public indexOf(key: TLinkedListNodeKey): number {
		let current: SinglyLinkedListNode<T> = this.head
		for (let i: number = 0; i < this.size; i++) {
			if (current.key === key) {
				return i
			}
			current = current.next!
		}
		return -1
	}

	public hasItem(key: TLinkedListNodeKey): boolean {
		return this.indexOf(key) !== -1
	}

	public clear(): void {
		this.size = 0
		this.head = null!
	}

	public toString(): string {
		let str: string = `linkedlist (`
		let current: SinglyLinkedListNode<T> = this.head
		for (let i: number = 0; i < this.size; i++) {
			str += `${current.key}, `
			current = current.next!
		}
		if (this.size > 0) {
			str = str.slice(0, -2)
		}
		str += `)`
		return str
	}

	public appendItem(key: TLinkedListNodeKey): SinglyLinkedListNode<T> {
		const newItem: SinglyLinkedListNode<T> = new SinglyLinkedListNode<T>(key)
		if (this.head === null) {
			this.head = newItem
			this.size += 1
			return newItem
		}
		let lastItem: SinglyLinkedListNode<T> = this.getItemAt(this.size - 1)
		lastItem.next = newItem
		this.size += 1
		return newItem
	}

	public insertItem(key: TLinkedListNodeKey, index: number): SinglyLinkedListNode<T> {
		if (index < 0 || index > this.size - 1) {
			console.warn(`insert index out of bounds.`)
			return null!
		}
		const newItem: SinglyLinkedListNode<T> = new SinglyLinkedListNode<T>(key)
		if (index === 0) {
			newItem.next = this.head
			this.head = newItem
			this.size += 1
			return newItem
		}
		const prevItem: SinglyLinkedListNode<T> = this.getItemAt(index - 1)
		const current: SinglyLinkedListNode<T> = prevItem.next!
		prevItem.next = newItem
		newItem.next = current
		this.size += 1
		return newItem
	}

	public removeAt(index: number): boolean {
		if (index < 0 || index > this.size - 1) {
			console.warn(`remove index out of bounds.`)
			return false
		}
		if (index === 0) {
			this.head = this.head.next!
			this.size -= 1
			return true
		}
		const prevItem: SinglyLinkedListNode<T> = this.getItemAt(index - 1)
		const current: SinglyLinkedListNode<T> = prevItem.next!
		prevItem.next = current.next!
		this.size -= 1
		return true
	}

	public updateItem(key: TLinkedListNodeKey, index: number): boolean {
		if (index < 0 || index > this.size - 1) {
			console.warn(`update index out of bounds.`)
			return false
		}
		const newItem: SinglyLinkedListNode<T> = new SinglyLinkedListNode(key)
		if (index === 0) {
			newItem.next = this.head.next
			this.head = newItem
			return true
		}
		const prevItem: SinglyLinkedListNode<T> = this.getItemAt(index - 1)
		const current: SinglyLinkedListNode<T> = prevItem.next!
		const nextItem: SinglyLinkedListNode<T> = current.next!
		prevItem.next = newItem
		newItem.next = nextItem
		return true
	}
}

export class DoublyLinkedListNode<T> {
	private _key: T
	private _prev: DoublyLinkedListNode<T>
	private _next: DoublyLinkedListNode<T>
	constructor(key: T, next: DoublyLinkedListNode<T> = undefined!, prev: DoublyLinkedListNode<T> = undefined!) {
		this._key = key === undefined! ? undefined! : key
		this._next = next === undefined ? null! : next
		this._prev = prev === undefined ? null! : prev
	}

	public get key(): TLinkedListNodeKey {
		return this._key
	}
	public set key(value: TLinkedListNodeKey) {
		this._key = value
	}

	public get prev(): DoublyLinkedListNode<T> {
		return this._prev
	}
	public set prev(value: DoublyLinkedListNode<T>) {
		this._prev = value!
	}

	public get next(): DoublyLinkedListNode<T> {
		return this._next
	}
	public set next(value: DoublyLinkedListNode<T>) {
		this._next = value!
	}
}

export class DoublyLinkedList<T> {
	private _size: number
	private _head: DoublyLinkedListNode<T>
	private _tail: DoublyLinkedListNode<T>
	constructor() {
		this._size = 0
		this._head = null!
		this._tail = undefined!
	}

	public get head(): DoublyLinkedListNode<T> {
		return this._head
	}
	protected set head(value: DoublyLinkedListNode<T>) {
		this._head = value
	}

	public get tail(): DoublyLinkedListNode<T> {
		return this._tail
	}
	protected set tail(value: DoublyLinkedListNode<T>) {
		this._tail = value
	}

	public get size(): number {
		return this._size
	}
	protected set size(value: number) {
		this._size = value
	}

	public indexOf(key: TLinkedListNodeKey): number {
		let current: DoublyLinkedListNode<T> = this.head
		for (let i: number = 0; i < this.size; i++) {
			if (current.key === key) {
				return i
			}
			current = current.next
		}
		return -1
	}

	public hasItem(key: TLinkedListNodeKey): boolean {
		return this.indexOf(key) !== -1
	}

	public toString(): string {
		let str: string = `linkedlist (`
		let current: DoublyLinkedListNode<T> = this.head
		for (let i: number = 0; i < this.size; i++) {
			str += `${current.key}, `
			current = current.next
		}
		if (this.size > 0) {
			str = str.slice(0, -2)
		}
		str += `)`
		return str
	}

	public getItemAt(index: number): DoublyLinkedListNode<T> {
		if (index < 0 || index > this.size - 1) {
			console.warn(`query index out of bounds.`)
			return null!
		}
		if (index >= Math.floor(this.size / 2)) {
			let current: DoublyLinkedListNode<T> = this.tail
			for (let i: number = this.size - 1; i > index; i--) {
				current = current.prev!
			}
			return current
		}
		let current: DoublyLinkedListNode<T> = this.head
		for (let i: number = 0; i < index; i++) {
			current = current.next
		}
		return current
	}

	public appendItem(key: TLinkedListNodeKey): DoublyLinkedListNode<T> {
		const newItem: DoublyLinkedListNode<T> = new DoublyLinkedListNode(key)
		if (this.head === null) {
			this.head = newItem
			this.tail = newItem
			this.size += 1
			return newItem
		}
		this.tail.next = newItem
		newItem.prev = this.tail
		this.tail = newItem
		this.size += 1
		return newItem
	}

	public insertItem(key: TLinkedListNodeKey, index: number): DoublyLinkedListNode<T> {
		if (index < 0 || index > this.size - 1) {
			console.warn(`insert index out of bounds.`)
			return null!
		}
		const newItem: DoublyLinkedListNode<T> = new DoublyLinkedListNode(key)
		if (index === 0) {
			this.head.prev = newItem
			newItem.next = this.head
			this.head = newItem
			this.size += 1
			return newItem
		}
		if (index === this.size - 1) {
			this.tail.prev.next = newItem
			newItem.prev = this.tail.prev
			this.tail.prev = newItem
			newItem.next = this.tail
			this.size += 1
			return newItem
		}
		const current: DoublyLinkedListNode<T> = this.getItemAt(index)
		const prevItem: DoublyLinkedListNode<T> = current.prev
		newItem.next = current
		current.prev = newItem
		newItem.prev = prevItem
		prevItem.next = newItem
		this.size -= 1
		return newItem
	}

	public removeAt(index: number): boolean {
		if (index < 0 || index > this.size - 1) {
			console.warn(`remove index out of bounds.`)
			return null!
		}
		if (index === 0) {
			this.head = this.head.next
			if (this.head.next) {
				this.head.next.prev = this.head
			}
			this.size -= 1
			return true
		}
		if (index === this.size - 1) {
			this.tail.prev.next = null!
			this.tail = this.tail.prev
			this.size -= 1
			return true
		}
		const current: DoublyLinkedListNode<T> = this.getItemAt(index)
		const prevItem: DoublyLinkedListNode<T> = current.prev
		prevItem.next = current.next
		current.next.prev = prevItem
		this.size -= 1
		return true
	}

	public updateItem(key: TLinkedListNodeKey, index: number) {
		if (index < 0 || index > this.size - 1) {
			console.warn(`update index out of bounds.`)
			return false
		}
		const newItem: DoublyLinkedListNode<T> = new DoublyLinkedListNode<T>(key)
		if (index === 0) {
			if (this.head.next) {
				this.head.next.prev = newItem
				newItem.next = this.head.next
			}
			this.head = newItem
			return true
		}
		if (index === this.size - 1) {
			if (this.tail.prev) {
				this.tail.prev.next = newItem
				newItem.prev = this.tail.prev
			}
			this.tail = newItem
			return true
		}
		const current: DoublyLinkedListNode<T> = this.getItemAt(index)
		const prevItem = current.prev
		const nextItem = current.next
		prevItem.next = newItem
		newItem.prev = prevItem
		nextItem.prev = newItem
		newItem.next = nextItem
		return true
	}

	public clear(): void {
		this.size = 0
		this.head = null!
		this.tail = null!
	}
}
