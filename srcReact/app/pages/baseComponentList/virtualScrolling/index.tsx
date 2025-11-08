import React from 'react'
import { Helmet } from 'react-helmet-async'
import VariableHeightListScrollingRoot from './variableHeightListScrolling'
import FixedHeightListScrollingRoot from './fixedHeightListScrolling'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'

function VirtualScrollingRoot(props: any): React.ReactElement {
	console.log(`VirtualScrolling ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Virtual Scrolling Component</title>
			</Helmet>
			<VariableHeightListScrollingRoot />
			<FixedHeightListScrollingRoot />
		</>
	)
}

export const VirtualScrollingRootMemo = React.memo(VirtualScrollingRoot)
