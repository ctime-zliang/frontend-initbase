import { CanvasMatrix4 } from '@/app/utils/algorithm/CanvasMatrix4'
import { Matrix4 } from '@/app/utils/algorithm/Matrix4'
import { Vector3 } from '@/app/utils/algorithm/Vector3'
import { initAttributeVariable } from '@/app/utils/webgl/utils'
import { Objecter } from '../models/ModelBase'
import { ObjecterManager } from './ObjecterManager'
import { Angles } from '@/app/utils/algorithm/Angles'

export enum ERotationCalculationType {
	UseMatrix = 'UseMatrix',
	UseQuaternion = 'UseQuaternion',
}

export enum ELightIlluType {
	ParallelLight = 'ParallelLight',
	SpotLight = 'SpotLight',
}

export enum EProjectionType {
	PerspectiveProjection = 'PerspectiveProjection',
	OrthographicProjection = 'OrthographicProjection',
}

export type TShaderParams = {
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

export const COMMON_VERTEX_SHADER: string = `
	precision mediump float;
	varying vec4 v_Color;
	varying vec3 v_Normal;
	varying vec3 v_ObjPosition;
	varying float v_Dist;
	varying vec2 v_textureCoord;
	// 顶点配置(组)
	attribute vec3 a_ObjPosition;
	attribute vec4 a_Color;
	attribute vec3 a_Normal;
	attribute vec2 a_textureCoord;
	// 变换矩阵(组)
	uniform mat4 u_NormalMatrix;
	uniform mat4 u_ModelMatrix;
	uniform mat4 u_ViewMatrix;
	uniform mat4 u_ProjMatrix;
	// 参数(组)
	uniform vec3 u_EyePosition;
	void main() {
		gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * vec4(a_ObjPosition, 1.0);
		gl_PointSize = 10.0;
		// 计算顶点的世界坐标
		v_ObjPosition = vec3(u_ModelMatrix * vec4(a_ObjPosition, 1.0));
		// 根据法线变换矩阵更新法线坐标
		// 即计算法线的世界坐标
		v_Normal = vec3(u_NormalMatrix * vec4(a_Normal, 1.0));
		v_Color = a_Color;
		// 计算顶点(世界坐标系)到视点的距离
		// v_Dist = distance(u_ModelMatrix * vec4(a_ObjPosition, 1.0), vec4(u_EyePosition, 1.0));
		v_Dist = gl_Position.w;
		v_textureCoord = a_textureCoord;
	}
`
export const COMMON_FRAGMENT_SHADER: string = `
	precision mediump float;
	varying vec4 v_Color;
	varying vec3 v_Normal;
	varying vec3 v_ObjPosition;
	varying float v_Dist;
	varying vec2 v_textureCoord;
	// 参数(组)
	uniform float u_lightIntensityGain;
	uniform float u_illuType;
	uniform bool u_Clicked;
	uniform vec3 u_FogColor;
	uniform vec2 u_FogDist;
	// 点光配置(组)
	uniform vec3 u_LightPosition;
	uniform vec3 u_LightDirection;
	uniform vec3 u_LightColor;
	uniform vec3 u_AmbientLightColor;
	// 纹理参数(组)
	uniform sampler2D u_Sampler;
	void main() {
		gl_FragColor = texture2D(u_Sampler, v_textureCoord);
		if (u_Clicked) {
			gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		} else {
			float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);
			if (u_illuType == 1.0) {  // 平行光
				vec3 normal = normalize(v_Normal);
				// 对于平行光, 此处需要传入入射光反方向归一化向量
				vec3 lightDirection = u_LightDirection;
				// 计算入射光反方向归一化向量与法线的点积
				float nDotL = max(dot(lightDirection, normal), 0.0);
				// 计算漫反射光和环境光的色值
				vec3 diffuse = u_LightColor * v_Color.rgb * nDotL * u_lightIntensityGain;
				gl_FragColor = vec4(diffuse + u_AmbientLightColor * v_Color.rgb, v_Color.a);
				gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
				// vec3 ambientMixinColor = diffuse + u_AmbientLightColor * v_Color.rgb;
				// vec3 fogMixinColor = mix(u_FogColor, vec3(ambientMixinColor), fogFactor);
				// gl_FragColor = vec4(fogMixinColor, v_Color.a);
			} else {  // 点光
				vec3 normal = normalize(v_Normal);
				// 计算点光源相对于物体顶点(表面)的方向, 记作光线方向
				// 归一化此向量
				vec3 lightDirection = normalize(u_LightPosition - v_ObjPosition);
				// 计算入射光反方向归一化向量与法线的点积
				float nDotL = max(dot(lightDirection, normal), 0.0);
				// 计算漫反射光和环境光的色值
				vec3 diffuse = u_LightColor * v_Color.rgb * nDotL * u_lightIntensityGain;
				gl_FragColor = vec4(diffuse + u_AmbientLightColor * v_Color.rgb, v_Color.a);
				gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
				// vec3 ambientMixinColor = diffuse + u_AmbientLightColor * v_Color.rgb;
				// vec3 fogMixinColor = mix(u_FogColor, vec3(ambientMixinColor), fogFactor);
				// gl_FragColor = vec4(fogMixinColor, v_Color.a);
			}
		}
	}
`

export const COMMON_VERTEX_SHADER2: string = `
	 void main() {
		gl_Position = vec4(0.5, 0.0, 0.0, 1.0);
		gl_PointSize = 10.0;
	}
`
export const COMMON_FRAGMENT_SHADER2: string = `
	void main() {
    	gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  	}
`

export class Program {
	static isInit: boolean = false
	static isRender: boolean = false
	static deviceParams: {
		gl: WebGLRenderingContext
		program: WebGLProgram
		canvasWidth: number
		canvasHeight: number
		glAttributes: { [key: string]: GLint }
		glUniforms: { [key: string]: WebGLUniformLocation | null }
	} = null!
	static shaderParams: TShaderParams = null!
	static objecters: Array<Objecter> = []
	static glCount: number = 0

	static initProgramControllerStatus(): void {
		Program.deviceParams = {
			gl: null!,
			program: null!,
			canvasWidth: 0,
			canvasHeight: 0,
			glAttributes: {},
			glUniforms: {},
		}
		Program.shaderParams = {
			presetModelType: '1',
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

	static initCanvasStatus(): void {
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

	static applyShaderParams(): void {
		const { gl, glUniforms } = Program.deviceParams
		if (Program.shaderParams.projectionType === EProjectionType.PerspectiveProjection) {
			/**
			 * 创建透视投影矩阵
			 */
			const projectionMatrix4: Matrix4 = CanvasMatrix4.setPerspective(
				Program.shaderParams.perspectiveProjectionFovy,
				Program.shaderParams.perspectiveProjectionAspect,
				Program.shaderParams.perspectiveProjectionNear,
				Program.shaderParams.perspectiveProjectionFar
			)
			gl.uniformMatrix4fv(glUniforms.u_ProjMatrix, false, new Float32Array(projectionMatrix4.data))
		}
		if (Program.shaderParams.projectionType === EProjectionType.OrthographicProjection) {
			/**
			 * 创建正交投影矩阵
			 */
			const orthoMatrix4: Matrix4 = CanvasMatrix4.setOrtho(
				Program.shaderParams.orthoProjectionLeft,
				Program.shaderParams.orthoProjectionRight,
				Program.shaderParams.orthoProjectionBottom,
				Program.shaderParams.orthoProjectionTop,
				Program.shaderParams.orthoProjectionNear,
				Program.shaderParams.orthoProjectionFar
			)
			gl.uniformMatrix4fv(glUniforms.u_ProjMatrix, false, new Float32Array(orthoMatrix4.data))
		}
		/**
		 * 创建视图矩阵
		 */
		const lookAtMatrix4: Matrix4 = CanvasMatrix4.setLookAt(
			new Vector3(Program.shaderParams.lookEyePositionX, Program.shaderParams.lookEyePositionY, Program.shaderParams.lookEyePositionZ),
			new Vector3(Program.shaderParams.lookAtPositionX, Program.shaderParams.lookAtPositionY, Program.shaderParams.lookAtPositionZ),
			new Vector3(0, 1, 0)
		)
		gl.uniformMatrix4fv(glUniforms.u_ViewMatrix, false, new Float32Array(lookAtMatrix4.data))
		gl.uniform3fv(
			glUniforms.u_EyePosition,
			new Float32Array([Program.shaderParams.lookEyePositionX, Program.shaderParams.lookEyePositionY, Program.shaderParams.lookEyePositionZ])
		)
		gl.uniform1f(glUniforms.u_illuType, Program.shaderParams.lightIlluType === ELightIlluType.ParallelLight ? 1.0 : 2.0)
		if (Program.shaderParams.lightIlluType === ELightIlluType.ParallelLight) {
			/**
			 * 平行光
			 * 		依据光照模型, 此处传给着色器的光源方向需要取反, 以便在着色器中正确求取入射光反方向向量与物体表面法线向量的夹角
			 */
			const lightDirection: Vector3 = new Vector3(
				-Program.shaderParams.lightDirectX,
				-Program.shaderParams.lightDirectY,
				-Program.shaderParams.lightDirectZ
			)
			const lightNormalizeDirection: Vector3 = lightDirection.normalize()
			gl.uniform3fv(
				glUniforms.u_LightDirection,
				new Float32Array([lightNormalizeDirection.x, lightNormalizeDirection.y, lightNormalizeDirection.z])
			)
		}
		if (Program.shaderParams.lightIlluType === ELightIlluType.SpotLight) {
			/**
			 * 点光
			 */
			gl.uniform3fv(
				glUniforms.u_LightPosition,
				new Float32Array([Program.shaderParams.lightPositionX, Program.shaderParams.lightPositionY, Program.shaderParams.lightPositionZ])
			)
		}
		gl.uniform3f(glUniforms.u_LightColor, Program.shaderParams.lightColorR, Program.shaderParams.lightColorG, Program.shaderParams.lightColorB)
		gl.uniform1f(glUniforms.u_lightIntensityGain, Program.shaderParams.lightIntensityGain)
		gl.uniform3f(
			glUniforms.u_AmbientLightColor,
			Program.shaderParams.ambientLightColorR,
			Program.shaderParams.ambientLightColorG,
			Program.shaderParams.ambientLightColorB
		)
	}

	static applyObjecterMatrix(objecter: Objecter): void {
		const { gl, glUniforms } = Program.deviceParams
		const { rotationCalculationType } = Program.shaderParams
		/**
		 * 创建旋转矩阵
		 */
		let modelRotationMatrix4: Matrix4 = CanvasMatrix4.initMatrix()
		if (rotationCalculationType === ERotationCalculationType.UseMatrix) {
			/**
			 * 矩阵旋转
			 */
			const modelRotationXMatrix4: Matrix4 = CanvasMatrix4.setRotate(
				Angles.degreeToRadian(objecter.model.modelRatation.x),
				new Vector3(1, 0, 0)
			)
			const modelRotationYMatrix4: Matrix4 = CanvasMatrix4.setRotate(
				Angles.degreeToRadian(objecter.model.modelRatation.y),
				new Vector3(0, 1, 0)
			)
			const modelRotationZMatrix4: Matrix4 = CanvasMatrix4.setRotate(
				Angles.degreeToRadian(objecter.model.modelRatation.z),
				new Vector3(0, 0, 1)
			)
			modelRotationMatrix4 = modelRotationXMatrix4.multiply4(modelRotationYMatrix4).multiply4(modelRotationZMatrix4)
		}
		if (rotationCalculationType === ERotationCalculationType.UseQuaternion) {
			/**
			 * 四元数旋转
			 */
			const currentMatrixData: Array<number> = objecter.model.modeControl.currentMatrixData
			if (currentMatrixData) {
				modelRotationMatrix4 = CanvasMatrix4.setFromArray(currentMatrixData)
			}
		}
		/**
		 * 创建平移矩阵
		 */
		const modelOffsetMatrix4: Matrix4 = CanvasMatrix4.setTranslate(
			objecter.model.modelOffset.x,
			objecter.model.modelOffset.y,
			objecter.model.modelOffset.z
		)
		/**
		 * 创建缩放矩阵
		 */
		const modelScaleMatrix4: Matrix4 = CanvasMatrix4.setScale(
			objecter.model.modelScale.x,
			objecter.model.modelScale.y,
			objecter.model.modelScale.z
		)
		/**
		 * 生成模型变换矩阵
		 */
		const modelEffectMatrix4: Matrix4 = modelRotationMatrix4.multiply4(modelScaleMatrix4).multiply4(modelOffsetMatrix4)
		/**
		 * 创建法线变换矩阵
		 */
		const modelEffectInverseMatrix4: Matrix4 = CanvasMatrix4.setInverse(modelEffectMatrix4)
		const modelEffectInverseTransposeMatrix4: Matrix4 = CanvasMatrix4.setTranspose(modelEffectInverseMatrix4)
		const normalMatrix4: Matrix4 = modelEffectInverseTransposeMatrix4
		gl.uniformMatrix4fv(glUniforms.u_ModelMatrix, false, new Float32Array(modelEffectMatrix4.data))
		gl.uniformMatrix4fv(glUniforms.u_NormalMatrix, false, new Float32Array(normalMatrix4.data))
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
		const { gl, glAttributes } = Program.deviceParams
		const { vertexProfile, normalProfile, texCoordProfile } = profile
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

	static setProgramControllerStatus(options: {
		gl?: WebGLRenderingContext
		program?: WebGLProgram
		canvasWidth?: number
		canvasHeight?: number
		glAttributes?: { [key: string]: GLint }
		glUniforms?: { [key: string]: WebGLUniformLocation | null }
	}): void {
		if (typeof options.canvasWidth !== 'undefined') {
			Program.deviceParams.canvasWidth = options.canvasWidth
		}
		if (typeof options.canvasHeight !== 'undefined') {
			Program.deviceParams.canvasHeight = options.canvasHeight
		}
		if (typeof options.gl !== 'undefined') {
			Program.deviceParams.gl = options.gl
		}
		if (typeof options.program !== 'undefined') {
			Program.deviceParams.program = options.program
		}
		if (typeof options.glAttributes !== 'undefined') {
			Program.deviceParams.glAttributes = options.glAttributes
		}
		if (typeof options.glUniforms !== 'undefined') {
			Program.deviceParams.glUniforms = options.glUniforms
		}
	}

	static clearProgramControllerStatus(): void {
		Program.isInit = false
		Program.isRender = false
		Program.deviceParams = null!
		Program.shaderParams = null!
		Program.objecters = []
		Program.glCount = 0
	}

	static createPresetObjecters(type: string): Array<Objecter> {
		const { gl } = Program.deviceParams
		switch (type) {
			case '1': {
				const objecters: Array<Objecter> = ObjecterManager.createSinglePlaneObjecters(gl)
				Program.glCount = Program.getVertexSize(objecters)
				return objecters
			}
		}
		return []
	}

	static getVertexSize(objecters: Array<Objecter>) {
		let len: number = 0
		for (let i: number = 0; i < objecters.length; i++) {
			len += objecters[i].model.vertexData.length
		}
		return len
	}
}
