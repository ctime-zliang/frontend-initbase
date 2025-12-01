import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { NormalListGrid } from './normalListGrid/Index'

function ListDragable2Root(props: any): React.ReactElement {
	const MODULE_NAME: string = `Dragable`
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<NormalListGrid />
			</section>
		</>
	)
}

export const ListDragable2RootMemo = React.memo(ListDragable2Root)
