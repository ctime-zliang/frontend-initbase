import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormControllerForward, TComponentDataHandlerFormData, TFormControllerComponentImperativeHandle } from '../public/FormController'
import { CanvasWrapperForward, TCanvasWrapperComponentImperativeHandle } from '../public/CanvasWrapper'
import { nextFrameTick } from '@/app/utils/utils'
import { Program } from '../public/Program'

function ProjectionTest(): React.ReactElement {
	const MODULE_NAME: string = `WebGL View`
	const formControllerComponentRef: { current: TFormControllerComponentImperativeHandle } = useRef<TFormControllerComponentImperativeHandle>(null!)
	const canvasWrapperComponentRef: { current: TCanvasWrapperComponentImperativeHandle } = useRef<TCanvasWrapperComponentImperativeHandle>(null!)
	const onFormControllerChangeAction = (key: string, value: any): void => {
		if (formControllerComponentRef.current && canvasWrapperComponentRef.current) {
			canvasWrapperComponentRef.current.applyFormData(key, value, formControllerComponentRef.current.getFormData())
		}
	}
	useEffect((): void => {
		nextFrameTick((): void => {
			if (formControllerComponentRef.current && canvasWrapperComponentRef.current) {
				const formData: TComponentDataHandlerFormData = formControllerComponentRef.current.getFormData()
				canvasWrapperComponentRef.current.applyFormData(
					'presetModelType',
					formData.presetModelType,
					formControllerComponentRef.current.getFormData()
				)
			}
		})
	}, [])
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
					<FormControllerForward
						ref={formControllerComponentRef}
						formData={{
							...Program.shaderParams,
						}}
						onChangeAction={onFormControllerChangeAction}
					/>
					<CanvasWrapperForward ref={canvasWrapperComponentRef} />
				</div>
			</section>
		</>
	)
}

export const ProjectionTestMemo = React.memo(ProjectionTest)
