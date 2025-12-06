import { createWebGLProgram, getWebGLVariableLocation } from '@/app/utils/webgl/utils'
import { Col, Row } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { COMMON_FRAGMENT_SHADER, COMMON_VERTEX_SHADER, Program } from './Program'
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
		if (!Program.isInit && canvasElementRef.current) {
			Program.isInit = true
			const gl: WebGLRenderingContext = canvasElementRef.current.getContext('webgl') as WebGLRenderingContext
			Program.setProgramControllerStatus({
				gl,
				canvasWidth: canvasElementRef.current.offsetWidth,
				canvasHeight: canvasElementRef.current.offsetHeight,
				program: createWebGLProgram(gl, COMMON_VERTEX_SHADER, COMMON_FRAGMENT_SHADER)!,
			})
			const { glAttributes, glUniforms } = getWebGLVariableLocation(Program.deviceParams.gl, Program.deviceParams.program, {
				glAttributes: ['a_Normal', 'a_ObjPosition', 'a_Color', 'a_textureCoord'],
				glUniforms: [
					'u_illuType',
					'u_LightColor',
					'u_LightPosition',
					'u_LightDirection',
					'u_AmbientLightColor',
					'u_lightIntensityGain',
					'u_NormalMatrix',
					'u_ModelMatrix',
					'u_ViewMatrix',
					'u_ProjMatrix',
					'u_Clicked',
					'u_EyePosition',
					'u_FogColor',
					'u_FogDist',
					'u_Sampler',
				],
			})
			Program.setProgramControllerStatus({
				glAttributes: glAttributes,
				glUniforms: glUniforms,
			})
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
