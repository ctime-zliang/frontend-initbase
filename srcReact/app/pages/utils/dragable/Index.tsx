import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { NormalList } from './normalList/Index'

function ListDragableRoot(props: any): React.ReactElement {
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Dragable Utils</title>
			</Helmet>
			<NormalList />
		</>
	)
}

export const ListDragableRootMemo = React.memo(ListDragableRoot)
