import { createWebGLProgram, getWebGLVariableLocation } from '@/app/utils/webgl/utils'
import { Col, Row } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Program } from './Program'

const COMMON_VERTEX_SHADER: string = `
	precision mediump float;
	varying vec4 v_Color;
	// 顶点配置(组)
	attribute vec3 a_Position;
	attribute vec4 a_Color;
	// 变换矩阵(组)
	uniform mat4 u_ModelMatrix;
	uniform mat4 u_ViewMatrix;
	uniform mat4 u_ProjMatrix;
	void main() {
		gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * vec4(a_Position, 1.0);
		v_Color = a_Color;
	}
`
const COMMON_FRAGMENT_SHADER: string = `
	precision mediump float;
	varying vec4 v_Color;
	void main() {
		gl_FragColor = v_Color;
	}
`

type TComponentDataHandler = {
	isInit: boolean
	gl: WebGLRenderingContext
	program: WebGLProgram
	glAttributes: { [key: string]: GLint }
	glUniforms: { [key: string]: WebGLUniformLocation | null }
}

function CanvasWrapper(props: any, ref: any): React.ReactElement {
	const canvasElementRef: { current: HTMLCanvasElement } = useRef<HTMLCanvasElement>(null!)
	const dataHandlerRef: { current: TComponentDataHandler } = useRef<TComponentDataHandler>({
		isInit: false,
		gl: null!,
		program: null!,
		glAttributes: {},
		glUniforms: {},
	})

	useImperativeHandle(ref, () => {
		return {
			test(): void {},
		}
	})

	useEffect((): (() => void) => {
		if (!dataHandlerRef.current.isInit && canvasElementRef.current) {
			dataHandlerRef.current.gl = canvasElementRef.current.getContext('webgl') as WebGLRenderingContext
			dataHandlerRef.current.program = createWebGLProgram(dataHandlerRef.current.gl, COMMON_VERTEX_SHADER, COMMON_FRAGMENT_SHADER)!
			const { glAttributes, glUniforms } = getWebGLVariableLocation(dataHandlerRef.current.gl, dataHandlerRef.current.program, {
				glAttributes: ['a_Position', 'a_Color'],
				glUniforms: ['u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix'],
			})
			dataHandlerRef.current.glAttributes = glAttributes
			dataHandlerRef.current.glUniforms = glUniforms
			Program.initProfile(dataHandlerRef.current.gl)
			dataHandlerRef.current.isInit = true
			console.log(dataHandlerRef.current)
		}
		return (): void => {
			if (dataHandlerRef.current) {
				dataHandlerRef.current = undefined!
			}
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
