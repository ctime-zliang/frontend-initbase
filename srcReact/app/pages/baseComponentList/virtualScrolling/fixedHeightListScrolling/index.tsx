import React from 'react'
import { FixedHeightListRowItemStyle, FixedHeightListScrolling } from '../../../../componnet/virtualScrolling'

export function getRandomInArea(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const data: Array<any> = []
const dataLength: number = 10000
for (let id: number = 0; id < dataLength; ++id) {
	data.push({
		id,
		value: (function (): string {
			const len = getRandomInArea(10, 60)
			return Array(len).fill('0').join(' ')
		})(),
	})
}

function RowItem(props: any): React.ReactElement {
	const { index, styleObject, rowHeight } = props as { index: number; styleObject: FixedHeightListRowItemStyle; rowHeight: number }
	const rowItemStyle: React.CSSProperties = {
		...styleObject,
		lineHeight: rowHeight + 'px',
		whiteSpace: 'nowrap',
		height: rowHeight,
	}
	return (
		<div
			key={index}
			style={rowItemStyle}
			data-row-height={rowHeight}
			onClick={(): void => {
				console.log('item-', index)
			}}
		>
			Item: {data[index].id} | Data: {data[index].value}
		</div>
	)
}

function FixedHeightListScrollingRoot(): React.ReactElement {
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 列表各项恒定固定高度({dataLength} 条)</h3>
			<div>
				<div style={{ width: '50%', border: '1px solid #dcdcdc' }}>
					<FixedHeightListScrolling containerHeight={300} countTotal={dataLength}>
						{RowItem}
					</FixedHeightListScrolling>
				</div>
			</div>
		</section>
	)
}

export default React.memo(FixedHeightListScrollingRoot)
