export function createListData(count: number): Array<{ id: number; text: string }> {
	return new Array(count).fill({}).map((_, index): { id: number; text: string } => {
		return {
			id: index + 1,
			text: `Index ${index + 1}`,
		}
	})
}

export function chunkSplitor1(chunkCallback: (isContinue: (timeRemaining: number) => boolean) => void): void {
	window.setTimeout((): void => {
		chunkCallback((timeRemaining: number): boolean => {
			return timeRemaining < 16.667
		})
	}, 50)
}

export function chunkSplitor2(chunkCallback: (isContinue: (timeRemaining: number) => boolean) => void): void {
	window.requestIdleCallback((idle: IdleDeadline): void => {
		chunkCallback((timeRemaining: number): boolean => {
			return idle.timeRemaining() > 0
		})
	})
}

export function taskSplitChunk(
	datas: Array<any>,
	consumer: (itemData: any, index: number) => void,
	chunkSplitor: (chunkCallback: (isContinue: (timeRemaining: number) => boolean) => void) => void
): void {
	let index: number = 0
	const run = (): void => {
		if (index >= datas.length) {
			console.warn('all items have been processed.')
			return
		}
		const chunkCallback = (isContinue: (timeRemaining: number) => boolean): void => {
			const nowTimeStamp: number = performance.now()
			while (isContinue(performance.now() - nowTimeStamp) && index <= datas.length - 1) {
				consumer(datas[index], index)
				index++
			}
			run()
		}
		chunkSplitor(chunkCallback)
	}
	run()
}
