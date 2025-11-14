import React from 'react'
import { Helmet } from 'react-helmet-async'
import { PaginationNoramlMemo } from './normal/Index'
import { PaginationSimplifyMemo } from './simplify/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { SimpleDividingLine } from '../../../componnet/simpleDividingLine'

function PaginationRoot(props: any): React.ReactElement {
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Pagination Component</title>
			</Helmet>
			<PaginationNoramlMemo />
			<SimpleDividingLine />
			<PaginationSimplifyMemo />
		</>
	)
}

export const PaginationRootMemo = React.memo(PaginationRoot)
