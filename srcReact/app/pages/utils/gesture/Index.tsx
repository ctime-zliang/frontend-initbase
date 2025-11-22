import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { DemeCase } from './demoCase/Index'

function GestureCaseRoot(props: any): React.ReactElement {
	useContentBgColor('rgba(255, 255, 255, 1)')
	return (
		<>
			<Helmet>
				<title>Gesture</title>
			</Helmet>
			<DemeCase />
		</>
	)
}

export const GestureCaseRootMemo = React.memo(GestureCaseRoot)
