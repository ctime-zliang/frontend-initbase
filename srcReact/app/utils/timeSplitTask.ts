export function chunkSplitorTimeout(chunkCallback: (isContinue: (timeRemaining: number) => boolean) => void): void {
	window.setTimeout((): void => {
		chunkCallback((timeRemaining: number): boolean => {
			return timeRemaining < 16.667
		})
	}, 50)
}

export function chunkSplitorRIC(chunkCallback: (isContinue: (timeRemaining: number) => boolean) => void): void {
	window.requestIdleCallback((idle: IdleDeadline): void => {
		chunkCallback((timeRemaining: number): boolean => {
			return idle.timeRemaining() > 0
		})
	})
}

export function taskSplitChunk(
	datas: Array<any>,
	consumer: (itemData: any, index: number) => void,
	chunkSplitor: (chunkCallback: (isContinue: (timeRemaining: number) => boolean) => void) => void = chunkSplitorRIC
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
