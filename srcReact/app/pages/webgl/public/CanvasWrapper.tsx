import { Col, Row } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { EShaderProfileEnum, Program } from './Program'
import { TComponentDataHandlerFormData } from './FormController'

export type TCanvasWrapperComponentImperativeHandle = {
	applyFormData: (key: string, value: any, formData: TComponentDataHandlerFormData) => void
}

function CanvasWrapper(props: any, ref: any): React.ReactElement {
	const canvasElementRef: { current: HTMLCanvasElement } = useRef<HTMLCanvasElement>(null!)

	useImperativeHandle(ref, () => {
		return {
			applyFormData(key: string, value: any, formData: TComponentDataHandlerFormData): void {
				console.log(`CanvasWrapper.applyFormData: `, key, value, formData)
				Program.objecters = Program.createPresetObjecters(value)
			},
		}
	})

	useEffect((): (() => void) => {
		Program.initProgramControllerStatus()
		if (!Program.isInit && canvasElementRef.current) {
			Program.isInit = true
			Program.initContext(canvasElementRef.current)
			Program.initShaderProfile(EShaderProfileEnum.ComprehensiveCase)
			Program.initCanvasStatus()
			Program.isRender = true
			Program.render()
		}
		return (): void => {
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
