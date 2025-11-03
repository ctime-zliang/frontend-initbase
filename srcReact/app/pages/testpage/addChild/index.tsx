import React, { useEffect, useState } from 'react'
import { TCommonComponentBaseProps } from 'srcReact/app/types/comm.types'

let count: number = 0
export function AddLongChild(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Component: ClickAddLongChild`)

	const [list, setList] = useState<Array<string>>([])
	const modifyList = (): void => {
		const array: Array<string> = []
		const random = Math.random() + ''
		++count
		for (let i = 0; i < 30000; i++) {
			array.push(random)
		}
		// console.log('modifyList - count: ', count)
		setList(array)
	}
	return (
		<div style={{ border: '1px solid red' }}>
			<button onClick={modifyList}>Modify List {String(list.length)}</button>
			<ul>
				{list.map((item: string, index: number) => {
					return (
						<li key={index}>
							{item}-{count}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
