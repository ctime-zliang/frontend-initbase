import React from 'react'
import { Helmet } from 'react-helmet-async'
import { PaginationNoramlMemo } from './normal/Index'
import { PaginationSimplifyMemo } from './simplify/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'

function PaginationRoot(props: any): React.ReactElement {
	console.log(`PaginationRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Pagination Component</title>
			</Helmet>
			<PaginationNoramlMemo />
			<PaginationSimplifyMemo />
		</>
	)
}

export const PaginationRootMemo = React.memo(PaginationRoot)
