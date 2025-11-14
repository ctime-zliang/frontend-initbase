import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ContextmenuNoramlMemo } from './normal/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'

function ContextmenuRoot(props: any): React.ReactElement {
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Contextmenu Component</title>
			</Helmet>
			<ContextmenuNoramlMemo />
		</>
	)
}

export const ContextmenuRootMemo = React.memo(ContextmenuRoot)
