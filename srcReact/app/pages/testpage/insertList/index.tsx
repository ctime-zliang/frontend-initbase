import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { chunkSplitorRIC, taskSplitChunk } from '../../../utils/timeSplitTask'
import { createListData } from './utils'

function InsertList(): React.ReactElement {
	const containerRef: { current: HTMLDivElement } = React.useRef<HTMLDivElement>(null!)
	const btnClickAction = (): void => {
		taskSplitChunk(
			createListData(3 * 1e5),
			(itemData: any, index: number): void => {
				const itemDiv: HTMLDivElement = document.createElement('div')
				itemDiv.innerText = `ID: ${itemData.id}, Text: ${itemData.text}`
				if (containerRef.current) {
					containerRef.current.appendChild(itemDiv)
				}
			},
			chunkSplitorRIC
		)
	}
	useEffect((): void => {
		console.log('===>>>> Test Page Common Mounted.')
	}, [])
	return (
		<section style={{ padding: `10px 10px` }}>
			<button onClick={btnClickAction}>Insert List</button>
			<div ref={containerRef}></div>
		</section>
	)
}
export default React.memo(InsertList)
