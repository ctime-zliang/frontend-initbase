import { ConcurrencyTaskQueue } from '../../../utils/ConcurrencyTaskQueue'
import { getRandomInArea } from '../../../utils/utils'

export function test01(): void {
	const ctq: ConcurrencyTaskQueue = new ConcurrencyTaskQueue(5)
	const TASK_SIZE: number = 20
	for (let i: number = 0; i < TASK_SIZE; i++) {
		const delayTime: number = getRandomInArea(1000, 5000)
		ctq.pushTask((taskIndex: number): Promise<{ type: 'resolved' | 'rejected'; data: any }> => {
			return new Promise((res, rej): any => {
				window.setTimeout((): void => {
					const rdm: number = Math.random()
					if (rdm >= 0.5) {
						res({ type: 'resolved', data: { time: delayTime, random: rdm, taskIndex } })
						return
					}
					rej({ type: 'rejected', data: { time: delayTime, random: rdm, taskIndex } })
				}, delayTime)
			})
		})
	}
	ctq.addTaskStartListener((taskIndex: number): void => {
		console.log(`任务: ${taskIndex} 开始执行...`)
	})
	ctq.addTaskEndListener((result: any): void => {
		console.log(`任务结束执行, 返回结果: `, result)
	})
	ctq.addAllTasksFinishListener((results: Array<any>): void => {
		console.log(`全部任务结束...`, results)
	})
	ctq.next()
}
