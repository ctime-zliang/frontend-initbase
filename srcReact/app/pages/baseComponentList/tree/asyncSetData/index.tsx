import React, { useEffect, useState } from 'react'
import { dataLine } from './data'
import { TTreeDataItem } from 'srcReact/app/componnet/tree'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TreeAyncSetData(props: any): React.ReactElement {
	const [data2, setData2] = useState<Array<TTreeDataItem>>([])
	useEffect((): void => {
		window.setTimeout((): void => {
			setData2(dataLine as Array<TTreeDataItem>)
		}, 2000)
	}, [])
	if (data2.length <= 0) {
		return (
			<section style={{ padding: `5px 5px 15px 5px` }}>
				<h3>$. 异步设置数据</h3>
				<div>loading...</div>
			</section>
		)
	}
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 异步设置数据</h3>
			<ReactTree
				selectedIds={['002']}
				contentUnderline={true}
				showExpandBtn={false}
				onExpand={expandAction}
				onClick={clickAction}
				data={data2}
			></ReactTree>
		</section>
	)
}

export default TreeAyncSetData
