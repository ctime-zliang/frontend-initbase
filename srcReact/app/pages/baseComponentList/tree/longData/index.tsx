import React, { useEffect, useState } from 'react'
import { createLongData } from './data'
import { Tree } from '../../../../componnet/tree'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

const dataLine = createLongData()

export function TreeLongData(props: any): React.ReactElement {
	const isVirtualList: boolean = true
	const tips: string = isVirtualList ? `(已启用虚拟滚动)` : ''
	const containerHeight: number = 200
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 大数据展示{tips}</h3>
			<div style={{ height: `${containerHeight}px`, overflow: 'auto' }}>
				<Tree
					isVirtualList={isVirtualList}
					containerHeight={`${containerHeight}px`}
					contentUnderline={false}
					multiSelect={false}
					showTagLine={true}
					showExpandBtn={true}
					onExpand={expandAction}
					onClick={clickAction}
					data={dataLine}
				></Tree>
			</div>
		</section>
	)
}
