import React from 'react'
import { Helmet } from 'react-helmet-async'
import { FormControllerForward } from '../public/FormController'
import { CanvasWrapperForward } from '../public/CanvasWrapper'

function ProjectionTest(): React.ReactElement {
	const MODULE_NAME: string = `WebGL Projection`
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<div
					style={{
						display: 'flex',
						flexWrap: 'nowrap',
						alignItems: 'center',
						alignContent: 'center',
						height: '450px',
						overflow: 'hidden',
						padding: '10px 10px',
						border: '1px dashed #666666',
						borderRadius: '8px',
						width: 'fit-content',
					}}
				>
					<FormControllerForward />
					<CanvasWrapperForward />
				</div>
			</section>
		</>
	)
}

export const ProjectionTestMemo = React.memo(ProjectionTest)
