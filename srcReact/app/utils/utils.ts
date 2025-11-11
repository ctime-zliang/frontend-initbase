// ;(window as any).__globalIndex = Math.random()

// Object.defineProperty(Array.prototype, 'sum', {
// 	value: function () {
// 		return this.reduce((sum: number, num: number): number => (sum += num), 0)
// 	},
// })

export async function sleep(delay: number = 500, ...args: any): Promise<any> {
	return new Promise((_): void => {
		window.setTimeout((): void => {
			_(args)
		}, +delay)
	})
}

export function getRandomInArea(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
