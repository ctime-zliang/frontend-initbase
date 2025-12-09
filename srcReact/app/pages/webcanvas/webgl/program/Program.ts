import { createWebGLProgram, initAttributeVariable } from '@/app/utils/webgl/utils'
import { Objecter } from '../../public/models/ModelBase'
import { BaseShaderProfile } from '../../public/shader/ShaderProfile'
import { ELightIlluType, EProjectionType, ERotationCalculationType } from '../../public/config/config'
import { createObjecters, createShaderProfile, EPresetModelType, EShaderProfileEnum } from '../utils/creator'

export type TProgramShaderParams = {
	presetModelType: string
	rotationCalculationType: ERotationCalculationType
	lookEyePositionX: number
	lookEyePositionY: number
	lookEyePositionZ: number
	lookAtPositionX: number
	lookAtPositionY: number
	lookAtPositionZ: number
	lightColorR: number
	lightColorG: number
	lightColorB: number
	lightColorA: number
	lightIntensityGain: number
	lightIlluType: ELightIlluType
	lightPositionX: number
	lightPositionY: number
	lightPositionZ: number
	lightDirectX: number
	lightDirectY: number
	lightDirectZ: number
	ambientLightColorR: number
	ambientLightColorG: number
	ambientLightColorB: number
	ambientLightColorA: number
	projectionType: EProjectionType
	orthoProjectionLeft: number
	orthoProjectionRight: number
	orthoProjectionBottom: number
	orthoProjectionTop: number
	orthoProjectionNear: number
	orthoProjectionFar: number
	perspectiveProjectionFovy: number
	perspectiveProjectionAspect: number
	perspectiveProjectionNear: number
	perspectiveProjectionFar: number
}

export class Program {
	static isInit: boolean = false
	static isRender: boolean = false
	static deviceParams: {
		gl: WebGLRenderingContext
		program: WebGLProgram
		canvasWidth: number
		canvasHeight: number
	} = null!
	static objecters: Array<Objecter> = []
	static glCount: number = 0
	static shaderParams: TProgramShaderParams = null!
	static shaderProfileInstance: BaseShaderProfile

	static initProgramControllerStatus(): void {
		Program.deviceParams = {
			gl: null!,
			program: null!,
			canvasWidth: 0,
			canvasHeight: 0,
		}
		Program.shaderParams = {
			presetModelType: EPresetModelType.Triangles,
			/**
			 * 模型旋转类型
			 */
			rotationCalculationType: ERotationCalculationType.UseMatrix,
			/**
			 * 视点参数
			 */
			lookEyePositionX: 0,
			lookEyePositionY: 0,
			lookEyePositionZ: 120,
			lookAtPositionX: 0,
			lookAtPositionY: 0,
			lookAtPositionZ: 0,
			/**
			 * 光照参数
			 */
			lightColorR: 1.0,
			lightColorG: 1.0,
			lightColorB: 1.0,
			lightColorA: 1.0,
			lightIntensityGain: 1.0,
			lightIlluType: ELightIlluType.ParallelLight,
			lightPositionX: 25,
			lightPositionY: 30,
			lightPositionZ: 65,
			lightDirectX: -1.0,
			lightDirectY: -3.0,
			lightDirectZ: -4.0,
			ambientLightColorR: 0.1,
			ambientLightColorG: 0.1,
			ambientLightColorB: 0.1,
			ambientLightColorA: 1.0,
			/**
			 * 透视参数
			 */
			projectionType: EProjectionType.PerspectiveProjection,
			orthoProjectionLeft: -1,
			orthoProjectionRight: 1,
			orthoProjectionBottom: -1,
			orthoProjectionTop: 1,
			orthoProjectionNear: -100,
			orthoProjectionFar: 100,
			perspectiveProjectionFovy: 30,
			perspectiveProjectionAspect: 1,
			perspectiveProjectionNear: 1,
			perspectiveProjectionFar: 1000,
		}
		Program.objecters = []
		Program.glCount = 0
	}

	static clearProgramControllerStatus(): void {
		Program.isInit = false
		Program.isRender = false
		Program.deviceParams = null!
		Program.objecters = []
		Program.glCount = 0
		Program.shaderParams = null!
		Program.shaderProfileInstance = null!
	}

	static initContext(canvasElement: HTMLCanvasElement): void {
		const gl: WebGLRenderingContext = canvasElement.getContext('webgl') as WebGLRenderingContext
		Program.deviceParams.gl = gl
		Program.deviceParams.canvasWidth = canvasElement.offsetWidth
		Program.deviceParams.canvasHeight = canvasElement.offsetHeight
	}

	static setShaderProfile(type: EShaderProfileEnum): void {
		Program.shaderProfileInstance = createShaderProfile(type)
		Program.deviceParams.program = createWebGLProgram(
			Program.deviceParams.gl,
			Program.shaderProfileInstance.createVertexShader(),
			Program.shaderProfileInstance.createFragmentShader()
		)!
		Program.shaderProfileInstance.initWebGLProfile(Program.deviceParams.gl, Program.deviceParams.program)
	}

	static setPresetObjecters(type: EPresetModelType): void {
		const objecters: Array<Objecter> = createObjecters(type)
		Program.glCount = Program.getVertexSize(objecters)
		Program.objecters = objecters
	}

	static setWebGLCanvasStatus(): void {
		const { gl } = Program.deviceParams
		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		gl.enable(gl.BLEND)
		gl.enable(gl.CULL_FACE)
		gl.enable(gl.DEPTH_TEST)
		gl.enable(gl.POLYGON_OFFSET_FILL)
		gl.polygonOffset(1.0, 1.0)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
	}

	static setShaderParams(key: keyof TProgramShaderParams, value: any): void {
		if (typeof Program.shaderParams[key] !== 'undefined') {
			;(Program.shaderParams as any)[key] = value
		}
	}

	static setObjecterParams(key: string, value: any): void {
		const objecters: Array<Objecter> = Program.objecters
		switch (key) {
			case 'modelRotationX': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelRatation.x = value
				}
				break
			}
			case 'modelRotationY': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelRatation.y = value
				}
				break
			}
			case 'modelRotationZ': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelRatation.z = value
				}
				break
			}
			case 'modelOffsetX': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelOffset.x = value
				}
				break
			}
			case 'modelOffsetY': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelOffset.y = value
				}
				break
			}
			case 'modelOffsetZ': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelOffset.z = value
				}
				break
			}
			case 'modelScale': {
				for (let i: number = 0; i < objecters.length; i++) {
					objecters[i].model.modelScale.x = objecters[i].model.modelScale.y = objecters[i].model.modelScale.z = value
				}
				break
			}
		}
	}

	static applyShaderParams(): void {
		const { gl } = Program.deviceParams
		Program.shaderProfileInstance.applyShaderParams(gl, {
			projectionType: Program.shaderParams.projectionType,
			perspective: {
				fovy: Program.shaderParams.perspectiveProjectionFovy,
				aspect: Program.shaderParams.perspectiveProjectionAspect,
				near: Program.shaderParams.perspectiveProjectionNear,
				far: Program.shaderParams.perspectiveProjectionFar,
			},
			ortho: {
				left: Program.shaderParams.orthoProjectionLeft,
				right: Program.shaderParams.orthoProjectionRight,
				bottom: Program.shaderParams.orthoProjectionBottom,
				top: Program.shaderParams.orthoProjectionTop,
				near: Program.shaderParams.orthoProjectionNear,
				far: Program.shaderParams.orthoProjectionFar,
			},
			lookEyePosition: {
				x: Program.shaderParams.lookEyePositionX,
				y: Program.shaderParams.lookEyePositionY,
				z: Program.shaderParams.lookEyePositionZ,
			},
			lootAtPosition: {
				x: Program.shaderParams.lookAtPositionX,
				y: Program.shaderParams.lookAtPositionY,
				z: Program.shaderParams.lookAtPositionZ,
			},
			lightIlluType: Program.shaderParams.lightIlluType,
			lightPosition: {
				x: Program.shaderParams.lightPositionX,
				y: Program.shaderParams.lightPositionY,
				z: Program.shaderParams.lightPositionZ,
			},
			lightDirect: {
				x: Program.shaderParams.lightDirectX,
				y: Program.shaderParams.lightDirectY,
				z: Program.shaderParams.lightDirectZ,
			},
			lightColor: {
				r: Program.shaderParams.lightColorR,
				g: Program.shaderParams.lightColorG,
				b: Program.shaderParams.lightColorB,
				a: Program.shaderParams.lightColorA,
			},
			lightIntensityGain: Program.shaderParams.lightIntensityGain,
			ambientLightColor: {
				r: Program.shaderParams.ambientLightColorR,
				g: Program.shaderParams.ambientLightColorG,
				b: Program.shaderParams.ambientLightColorB,
				a: Program.shaderParams.ambientLightColorA,
			},
		})
	}

	static applyObjecterMatrix(objecter: Objecter): void {
		const { gl } = Program.deviceParams
		const { rotationCalculationType } = Program.shaderParams
		Program.shaderProfileInstance.applyMatrixParams(gl, {
			rotationCalculationType: rotationCalculationType,
			modelRatation: {
				x: objecter.model.modelRatation.x,
				y: objecter.model.modelRatation.y,
				z: objecter.model.modelRatation.z,
			},
			modeControl: {
				currentMatrixData: objecter.model.modeControl.currentMatrixData,
			},
			modelOffset: {
				x: objecter.model.modelOffset.x,
				y: objecter.model.modelOffset.y,
				z: objecter.model.modelOffset.z,
			},
			modelScale: {
				x: objecter.model.modelScale.x,
				y: objecter.model.modelScale.y,
				z: objecter.model.modelScale.z,
			},
		})
	}

	static drawObjecters(objecters: Array<Objecter>, glCount: number): void {
		const { gl } = Program.deviceParams
		for (let i: number = 0; i < objecters.length; i++) {
			const objecter: Objecter = objecters[i]
			Program.applyObjecterMatrix(objecter)
			Program.drawBuffer(glCount, {
				vertexProfile: {
					data: objecter.model.vertexData,
					buffer: objecter.buffer.vertexBuffer,
				},
				normalProfile: {
					data: objecter.model.normalData,
					buffer: objecter.buffer.normalBuffer,
				},
			})
			// gl.drawArrays(gl.POINTS, 0, 1)
		}
	}

	static drawBuffer(
		glCount: number,
		profile: {
			vertexProfile?: {
				data: ArrayBuffer
				buffer: WebGLBuffer
			}
			normalProfile?: {
				data: ArrayBuffer
				buffer: WebGLBuffer
			}
			texCoordProfile?: {
				data: ArrayBuffer
				buffer: WebGLBuffer
			}
		}
	): void {
		const { gl } = Program.deviceParams
		const { vertexProfile, normalProfile, texCoordProfile } = profile
		const glAttributes: {
			[key: string]: GLint
		} = Program.shaderProfileInstance.getGLAttributes()
		if (normalProfile) {
			initAttributeVariable(
				gl,
				glAttributes.a_Normal,
				normalProfile.buffer,
				{
					size: 3,
				},
				{
					data: normalProfile.data,
				}
			)
		}
		if (texCoordProfile) {
			initAttributeVariable(
				gl,
				glAttributes.a_textureCoord,
				texCoordProfile.buffer,
				{
					size: 2,
				},
				{
					data: texCoordProfile.data,
				}
			)
		}
		if (vertexProfile) {
			initAttributeVariable(gl, glAttributes.a_ObjPosition, vertexProfile.buffer, {
				size: 3,
				stride: 28,
			})
			initAttributeVariable(gl, glAttributes.a_Color, vertexProfile.buffer, {
				size: 4,
				stride: 28,
				offset: 12,
			})
			gl.bufferData(gl.ARRAY_BUFFER, vertexProfile.data, gl.STATIC_DRAW)
		}
		gl.drawArrays(gl.TRIANGLES, 0, glCount)
	}

	static clearCanvas(): void {
		const { gl, canvasWidth, canvasHeight } = Program.deviceParams
		gl.viewport(0, 0, canvasWidth, canvasHeight)
		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	}

	static render(): void {
		if (!Program.isRender) {
			return
		}
		const glAttributes: {
			[key: string]: GLint
		} = Program.shaderProfileInstance.getGLAttributes()
		const glUniforms: {
			[key: string]: WebGLUniformLocation | null
		} = Program.shaderProfileInstance.getGLUniforms()
		const { gl, program } = Program.deviceParams
		if (!Program.objecters.length) {
			window.requestAnimationFrame((timeStamp: number): void => {
				Program.render()
			})
			return
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.useProgram(program)
		Program.clearCanvas()
		Program.applyShaderParams()
		Program.drawObjecters(Program.objecters, Program.glCount / 7)
		window.requestAnimationFrame((timeStamp: number): void => {
			Program.render()
		})
	}

	static getVertexSize(objecters: Array<Objecter>) {
		let len: number = 0
		for (let i: number = 0; i < objecters.length; i++) {
			len += objecters[i].model.vertexData.length
		}
		return len
	}
}
