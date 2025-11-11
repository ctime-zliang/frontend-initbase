import React from 'react'
import { TSimpleDividingLine } from '../types/types'

export function SimpleDividingLine(props: TSimpleDividingLine): React.ReactElement {
	const {
		paddingTop = 10,
		paddingRight = 0,
		paddingBottom = 10,
		paddingLeft = 0,
		lineWidth = 1,
		lineColor = 'rgba(100, 100, 100, 0.8)',
		lineStyle = 'solid',
	} = props
	return (
		<section
			style={{
				padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}`,
			}}
		>
			<div
				style={{
					width: '100%',
					height: 0,
					borderBottom: `${lineWidth}px ${lineStyle} ${lineColor}`,
				}}
			></div>
		</section>
	)
}
