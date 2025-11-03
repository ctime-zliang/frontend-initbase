import { MarkOperationStructureItem, ProxyStore, snapshot as proxySnapshot, subscribe as proxySubscribe } from '../../../../store/proxyStore'
import { proxy, subscribe as valtioSubscribe, snapshot as valtioSnapshot } from 'valtio'

const data: PlainObject = {
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

export function proxyStoreTest1(): void {
	const proxyStore = new ProxyStore(JSON.parse(JSON.stringify(data)))
	const proxyData = proxyStore.proxyObject

	console.log(proxyStore)

	const proxySubscribeCancel = proxySubscribe(proxyData, (op: Array<MarkOperationStructureItem>): void => {
		console.log(`proxySubscribe.op = `, op)
		const proxySnap = proxySnapshot(proxyData)
		console.log(`proxySubscribe.proxySnap = `, JSON.stringify(proxySnap))
	})

	const proxySnap1 = proxySnapshot(proxyData)
	console.log(`proxySnap1 = `, JSON.stringify(proxySnap1))
	const proxySnap2 = proxySnapshot(proxyData)
	console.log(`proxySnap2 = `, JSON.stringify(proxySnap2))
	console.log(proxySnap1 === proxySnap2)

	proxyData.username = 'zhangsan_updated'
	delete proxyData.level
	proxyData.newKey = 'addKey'
	proxyData.symbolItem.title = 'symbol_updated'
	proxyData.age = 18
	proxyData.list.push({ name: 'name-3', id: '3' })
	proxyData.list[1].name = 'name-2_updated'

	// proxySubscribeCancel()

	// const proxySnap2 = proxySnapshot(proxyData)
	// console.log(`proxySnap2 = `, JSON.stringify(proxySnap2))
}

export function valitoStoreTest1(): void {
	const valtioState = proxy(JSON.parse(JSON.stringify(data)))

	// // const valtioSubscribeCancel = valtioSubscribe(valtioState, (params: any): void => {
	// // 	console.log(`params = `, params)
	// // })

	// const valtioSnap1 = valtioSnapshot(valtioState)
	// console.log(`valtioSnap1 = `, JSON.stringify(valtioSnap1))

	// valtioState.username = 'zhangsan_updated'
	// delete valtioState.level
	// valtioState.newKey = 'addKey'
	// valtioState.symbolItem.title = 'symbol_updated'
	// valtioState.age = 18
	// valtioState.list.push({ name: 'name-3', id: '3' })
	// valtioState.list[1].name = 'name-2_updated'

	// const valtioSnap2 = valtioSnapshot(valtioState)
	// console.log(`valtioSnap2 = `, JSON.stringify(valtioSnap2))

	// // valtioSubscribeCancel()
}
