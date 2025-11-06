import React, { useEffect, useState } from 'react'
import { dataLine } from './data'
import { Tree } from '../../../../componnet/tree'

const clickAction = (a: any, b: any, c: any) => {
	console.log(a, b, c)
}
const expandAction = (a: any, b: any) => {
	console.log(a, b)
}

function TreeNormal(props: any): React.ReactElement {
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 常规模式</h3>
			<Tree
				contentUnderline={false}
				multiSelect={true}
				showTagLine={true}
				showExpandBtn={true}
				onExpand={expandAction}
				onClick={clickAction}
				data={dataLine}
			></Tree>
		</section>
	)
}

export default TreeNormal
