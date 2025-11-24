import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { DemeCase } from './demoCase/Index'

function GestureCaseRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Gesture`
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<DemeCase />
			</section>
		</>
	)
}

export const GestureCaseRootMemo = React.memo(GestureCaseRoot)
