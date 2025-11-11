import React, { useEffect, useState } from 'react'
import { dataLine } from './data'
import { Tree } from '../../../../componnet/tree'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

export function TreeAutoExpandAllLevel(props: any): React.ReactElement {
	return (
		<section style={{ padding: `10px 10px` }}>
			<h3>$. 初始化时展开所有层级</h3>
			<Tree selectedIds={[]} contentUnderline={true} expandAll={true} onExpand={expandAction} onClick={clickAction} data={dataLine}></Tree>
		</section>
	)
}
