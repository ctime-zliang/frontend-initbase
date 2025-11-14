import { ProxyState } from '../../../utils/proxyState/ProxyState'
import { xProxy } from '../../../utils/proxyState'

export function test01() {
	const data: any = {
		username: 'zhangsan',
		level: '1',
		symbolItem: {
			title: 'symbol',
			author: {
				nickname: 'lisi',
			},
			id: 's-1',
		},
		footprintItem: {
			title: 'footprint',
			project: {
				projectName: 'test',
				belong: 'wangwu',
			},
			id: 'f-1',
		},
		list: [
			{ name: 'name-1', id: '1' },
			{ name: 'name-2', id: '2' },
		],
	}
	data.symbolItem.parent = data
	data.footprintItem.parent = data

	const proxyState: ProxyState = new xProxy.ProxyState(data)
	console.log(proxyState)

	const proxyInstance: any = proxyState.getProxyInstance()

	const subscribeCancel = xProxy.subscribe(proxyInstance, op => {
		console.log(`subscribe.op = `, op)
		const snapItem = xProxy.snapshot(proxyInstance)
		console.log(`subscribe.snapshot = `, snapItem)
	})

	const snapItem1 = xProxy.snapshot(proxyInstance)
	console.log(`snapItem1 = `, snapItem1)

	proxyInstance.username = 'zhangsan_updated'
	delete proxyInstance.level
	proxyInstance.newKey = 'addKey'
	proxyInstance.symbolItem.title = 'symbol_updated'
	proxyInstance.age = 18
	proxyInstance.list.push({ name: 'name-3', id: '3' })
	proxyInstance.list[1].name = 'name-2_updated'

	// subscribeCancel()

	const snapItem2 = xProxy.snapshot(proxyInstance)
	console.log(`snapItem2 = `, snapItem2)
}
