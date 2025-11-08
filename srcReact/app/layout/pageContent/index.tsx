import React from 'react'
import './index.less'
import { TCommonComponentBaseProps } from '../../types/comm.types'

export function PageContentRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageContentRoot ☆☆☆`, props)
	return (
		<main
			className="app-page-content"
			style={{
				height: `calc(100vh - 95px)`,
				minHeight: `calc(100vh - 95px)`,
				overflow: 'auto',
			}}
		>
			{props.children}
		</main>
	)
}
