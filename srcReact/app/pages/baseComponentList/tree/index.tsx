import React from 'react'
import { Helmet } from 'react-helmet-async'
import { TreeNormal } from './normal/Index'
import { TreeAyncSetData } from './asyncSetData/Index'
import { TreeAutoExpandAllLevel } from './autoExpandAllLevel/Index'
import { TreeLongData } from './longData/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { SimpleDividingLine } from '../../../componnet/simpleDividingLine'

function TreeRoot(props: any): React.ReactElement {
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Tree Component</title>
			</Helmet>
			<TreeNormal />
			<SimpleDividingLine />
			<TreeAyncSetData />
			<SimpleDividingLine />
			<TreeAutoExpandAllLevel />
			<SimpleDividingLine />
			<TreeLongData />
		</>
	)
}

export const TreeRootMemo = React.memo(TreeRoot)
