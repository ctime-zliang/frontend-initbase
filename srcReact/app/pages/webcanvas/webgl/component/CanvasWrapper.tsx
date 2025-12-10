import { Col, Row } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Program, TProgramShaderParams } from '../program/Program'
import { TComponentDataHandlerFormData } from '../../public/component/FormController'
import { EShaderProfileEnum } from '../utils/creator'
import { Interaction } from '../program/Interaction'

export type TCanvasWrapperComponentImperativeHandle = {
	applyFormData: (key: keyof TProgramShaderParams, value: any, formData: TComponentDataHandlerFormData) => void
}

type TProps = {
	onComponentInited?: () => void
}
function CanvasWrapper(props: TProps, ref: any): React.ReactElement {
	const { onComponentInited } = props
	const canvasElementRef: { current: HTMLCanvasElement } = useRef<HTMLCanvasElement>(null!)
	useImperativeHandle(ref, (): TCanvasWrapperComponentImperativeHandle => {
		return {
			applyFormData(key: keyof TProgramShaderParams, value: any, formData: TComponentDataHandlerFormData): void {
				if (['presetModelType'].includes(key)) {
					Program.setPresetObjecters(value)
					Program.render()
					return
				}
				if (['rotationCalculationType'].includes(key)) {
					Program.resetObjecterRotationControl()
					Program.render()
					return
				}
				if (
					['modelRotationX', 'modelRotationY', 'modelRotationZ', 'modelOffsetX', 'modelOffsetY', 'modelOffsetZ', 'modelScale'].includes(key)
				) {
					Program.setObjecterParams(key, value)
					Program.render()
					return
				}
				Program.setShaderParams(key, value)
				Program.render()
			},
		}
	})
	useEffect((): (() => void) => {
		if (!Program.isInit && canvasElementRef.current) {
			Interaction.initInteractionControllerStatus(canvasElementRef.current.getBoundingClientRect())
			// Interaction.bindEvent(canvasElementRef.current)
			// Interaction.mouseMoveAction = Program.onCanvasElementMouseDownMoveAction.bind(Program)
			// Interaction.mouseUpAction = Program.onCanvasElementMouseDownUpAction.bind(Program)
			Program.isInit = true
			Program.initProgramControllerStatus()
			Program.initContext(canvasElementRef.current)
			Program.setShaderProfile(EShaderProfileEnum.ComprehensiveCase)
			Program.setWebGLCanvasStatus()
			Program.isRender = true
			Program.render()
			onComponentInited && onComponentInited()
		}
		return (): void => {
			Interaction.clearInteractionControllerStatus()
			// Interaction.unBindEvent(canvasElementRef.current)
			Program.clearProgramControllerStatus()
		}
	}, [])
	return (
		<Row style={{ border: '1px dashed #666666', margin: '0 30px' }}>
			<Col span={24}>
				<canvas ref={canvasElementRef} width={600} height={400} style={{ display: 'block' }}></canvas>
			</Col>
		</Row>
	)
}

export const CanvasWrapperForward = forwardRef(CanvasWrapper)
