import React from 'react'
import { Helmet } from 'react-helmet-async'
import { VariableHeightListScrollingMainMemo } from './variableHeightListScrolling/Index'
import { FixedHeightListScrollingMainMemo } from './fixedHeightListScrolling/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'

function VirtualScrollingRoot(props: any): React.ReactElement {
	console.log(`VirtualScrolling ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Virtual Scrolling Component</title>
			</Helmet>
			<VariableHeightListScrollingMainMemo />
			<FixedHeightListScrollingMainMemo />
		</>
	)
}

export const VirtualScrollingRootMemo = React.memo(VirtualScrollingRoot)
