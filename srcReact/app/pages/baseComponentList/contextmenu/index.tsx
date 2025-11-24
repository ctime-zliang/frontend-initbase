import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ContextmenuNoramlMemo } from './normal/Index'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'

function ContextmenuRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Contextmenu Component`
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<ContextmenuNoramlMemo />
			</section>
		</>
	)
}

export const ContextmenuRootMemo = React.memo(ContextmenuRoot)
