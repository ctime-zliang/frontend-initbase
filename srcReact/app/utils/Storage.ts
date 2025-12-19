export type TStorageData<T> = {
	value: T
	expire?: number
}

class Storage {
	constructor() {
		/* ... */
	}

	public set<T>(key: string, value: T, expire?: number): void {
		const data: TStorageData<T> = {
			value,
			expire: expire ? Date.now() + expire * 1000 : undefined,
		}
		localStorage.setItem(key, JSON.stringify(data))
	}

	public get<T>(key: string): T | null {
		const item: string | null | void = localStorage.getItem(key)
		if (!item) {
			return null
		}
		try {
			const data: TStorageData<T> = JSON.parse(item)
			if (data.expire && data.expire < Date.now()) {
				this.remove(key)
				return null
			}
			return data.value
		} catch (error: any) {
			console.error('解析存储数据失败:', error)
			return null
		}
	}

	public remove(key: string): void {
		localStorage.removeItem(key)
	}

	public clear(): void {
		localStorage.clear()
	}

	public has(key: string): boolean {
		return this.get(key) !== null
	}
}

export const storage: Storage = new Storage()
