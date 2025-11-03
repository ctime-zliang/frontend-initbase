import { MarkOperationStructureItem, ProxyStore, snapshot as proxySnapshot, subscribe as proxySubscribe } from '../../../../store/proxyStore'
import { proxy, subscribe as valtioSubscribe, snapshot as valtioSnapshot } from 'valtio'

const data: PlainObject = {
	username: 'zhangsan',
	symbolItem: {
		title: 'symbol',
		author: {
			nickname: 'lisi',
		},
	},
}
data.symbolItem.parent = data

export function proxyStoreTest2(): void {
	const proxyStore = new ProxyStore(data)
	const proxyData = proxyStore.proxyObject

	console.log(proxyStore)

	const proxySubscribeCancel = proxySubscribe(proxyData, (op: Array<MarkOperationStructureItem>): void => {
		console.log(`proxySubscribe.op = `, op)
	})

	const proxySnap1 = proxySnapshot(proxyData)
	console.log(`proxySnap1 = `, proxySnap1)

	proxyData.symbolItem.title = 'symbol_updated'
	const proxySnap2 = proxySnapshot(proxyData)
	console.log(`proxySnap2 = `, proxySnap2)

	proxyData.username = 'zhangsan_updated'
	const proxySnap3 = proxySnapshot(proxyData)
	console.log(`proxySnap3 = `, proxySnap3)

	proxyData.symbolItem.parent.username = 'zhangsan_updated2'
	const proxySnap4 = proxySnapshot(proxyData)
	console.log(`proxySnap4 = `, proxySnap4)
}
