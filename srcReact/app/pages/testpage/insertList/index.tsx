import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { chunkSplitor2, createListData, taskSplitChunk } from '../../../utils/timeSplitTask'

function InsertList(): React.ReactElement {
	const containerRef: { current: HTMLDivElement } = React.useRef<HTMLDivElement>(null!)
	const btnClickAction = (): void => {
		taskSplitChunk(
			createListData(3 * 1e5),
			(itemData: any, index: number): void => {
				const itemDiv: HTMLDivElement = document.createElement('div')
				itemDiv.innerText = `ID: ${itemData.id}, Text: ${itemData.text}`
				containerRef.current.appendChild(itemDiv)
			},
			chunkSplitor2
		)
	}
	useEffect((): void => {
		console.log('===>>>> Test Page Common Mounted.')
	}, [])
	return (
		<>
			<button onClick={btnClickAction}>Insert List</button>
			<div ref={containerRef}></div>
		</>
	)
}
export default React.memo(InsertList)
