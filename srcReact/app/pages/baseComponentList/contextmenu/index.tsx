import React from 'react'
import { Helmet } from 'react-helmet-async'
import ContextmenuNoraml from './normal'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'

function ContextmenuRoot(props: any): React.ReactElement {
	console.log(`ContextmenuRoot ☆☆☆`, props)
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Contextmenu Component</title>
			</Helmet>
			<ContextmenuNoraml />
		</>
	)
}

export default React.memo(ContextmenuRoot)
