import { getRandomInArea } from '../../../utils/utils'
import { AsyncTimeout } from '../../../utils/AsyncTimeout'

async function mockAsyncTask(): Promise<{ msg: string }> {
	const delay: number = getRandomInArea(2000, 5000)
	return new Promise((resolve, reject): void => {
		window.setTimeout((): void => {
			if (Math.random() < 0.6) {
				reject({ msg: '模拟异步任务执行失败' })
				return
			}
			resolve({ msg: '模拟异步任务执行成功.' })
		}, delay)
	})
}

export function test01(): void {
	const asyncTimeout: AsyncTimeout = new AsyncTimeout(3, 3000, 1000)
	asyncTimeout.addTaskStartExecListener(
		(optional: { attempt: number; timeStamp: number; maxRetries: number; timeout: number; intervalDelay: number }): void => {
			console.log(`%c >>>>>> task-start-listener`, `color: #ffffff; background-color: green;`)
			console.log(`异步任务开始执行...`, optional.timeStamp)
		}
	)
	asyncTimeout.addTaskEndListener(
		(
			successed: boolean,
			result: any,
			optional: { attempt: number; timeStamp: number; maxRetries: number; isTimeout: boolean; timeout: number; intervalDelay: number }
		) => {
			let message: string = ''
			if (successed) {
				message = `任务执行成功, 已获取到结果, 操作即将退出.`
			} else {
				if (optional.isTimeout) {
					message = `第 ${optional.attempt + 1}/${optional.maxRetries} 次执行任务等待耗时已大于设置的超时时间 ${optional.timeout}ms`
				} else {
					message = `第 ${optional.attempt + 1}/${optional.maxRetries} 次执行任务的获取结果异常`
				}
				if (optional.attempt + 1 < optional.maxRetries) {
					message += `, 操作将在 ${optional.intervalDelay}ms 后再次尝试执行.`
				} else {
					message += `, 操作即将退出.`
				}
			}
			console.log(`%c >>>>>> task-end-listener`, `color: #ffffff; background-color: green;`)
			if (successed) {
				console.log(message)
				console.log(result)
			} else {
				console.warn(message)
				console.warn(result)
			}
		}
	)
	asyncTimeout
		.exec(mockAsyncTask)
		.then((result: any): void => {
			console.log(`%c >>>>>> async-timeout.then`, `color: #ffffff; background-color: green;`)
			console.log(result)
		})
		.catch((error: any): void => {
			console.log(`%c >>>>>> async-timeout.catch`, `color: #ffffff; background-color: green;`)
			console.error(error)
		})
}
