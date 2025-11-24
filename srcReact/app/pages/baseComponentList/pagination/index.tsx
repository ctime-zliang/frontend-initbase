import React from 'react'
import { Helmet } from 'react-helmet-async'
import { PaginationNoramlMemo } from './normal/Index'
import { PaginationSimplifyMemo } from './simplify/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { SimpleDividingLine } from '../../../componnet/simpleDividingLine'

function PaginationRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Pagination Component`
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<PaginationNoramlMemo />
				<SimpleDividingLine />
				<PaginationSimplifyMemo />
			</section>
		</>
	)
}

export const PaginationRootMemo = React.memo(PaginationRoot)
