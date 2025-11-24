import React from 'react'
import { Helmet } from 'react-helmet-async'
import { VariableHeightListScrollingMainMemo } from './variableHeightListScrolling/Index'
import { FixedHeightListScrollingMainMemo } from './fixedHeightListScrolling/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { SimpleDividingLine } from '../../../componnet/simpleDividingLine'

function VirtualScrollingRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Virtual Scrolling Component`
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<VariableHeightListScrollingMainMemo />
				<SimpleDividingLine />
				<FixedHeightListScrollingMainMemo />
			</section>
		</>
	)
}

export const VirtualScrollingRootMemo = React.memo(VirtualScrollingRoot)
