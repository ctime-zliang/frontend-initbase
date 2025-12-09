import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormControllerForward, TComponentDataHandlerFormData, TFormControllerComponentImperativeHandle } from '../../public/component/FormController'
import { CanvasWrapperForward, TCanvasWrapperComponentImperativeHandle } from '../component/CanvasWrapper'
import { nextFrameTick } from '@/app/utils/utils'
import { Program, TProgramShaderParams } from '../program/Program'
import { EPresetModelType } from '../utils/creator'

function ComprehensiveTest(): React.ReactElement {
	const MODULE_NAME: string = `WebGL View`
	const formControllerComponentRef: { current: TFormControllerComponentImperativeHandle } = useRef<TFormControllerComponentImperativeHandle>(null!)
	const canvasWrapperComponentRef: { current: TCanvasWrapperComponentImperativeHandle } = useRef<TCanvasWrapperComponentImperativeHandle>(null!)
	const onFormControllerChangeAction = (key: keyof TProgramShaderParams, value: any): void => {
		if (formControllerComponentRef.current && canvasWrapperComponentRef.current) {
			canvasWrapperComponentRef.current.applyFormData(key, value, formControllerComponentRef.current.getFormData())
		}
	}
	const modelTypeList: Array<{ label: string; value: string }> = [
		{ label: 'Triangles', value: EPresetModelType.Triangles },
		{ label: 'Single Plane', value: EPresetModelType.SinglePlane },
	]
	const onComponentInitedAction = (): void => {
		formControllerComponentRef.current.updateFormData({
			...Program.shaderParams,
			modelRotationX: 0,
			modelRotationY: 0,
			modelRotationZ: 0,
			modelOffsetX: 0,
			modelOffsetY: 0,
			modelOffsetZ: 0,
			modelScale: 1,
		})
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
						modelTypeList={modelTypeList}
						onChangeAction={onFormControllerChangeAction}
						ref={formControllerComponentRef}
					/>
					<CanvasWrapperForward onComponentInited={onComponentInitedAction} ref={canvasWrapperComponentRef} />
				</div>
			</section>
		</>
	)
}

export const ComprehensiveTestMemo = React.memo(ComprehensiveTest)
