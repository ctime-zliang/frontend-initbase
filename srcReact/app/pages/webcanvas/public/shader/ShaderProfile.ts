import { getWebGLVariableLocation } from '@/app/utils/webgl/utils'
import { ELightIlluType, EProjectionType, ERotationCalculationType } from '../config/config'
import { Matrix4 } from '@/app/utils/algorithm/Matrix4'

export type TApplyShaderParamsSetting = {
	projectionType: EProjectionType
	perspective: {
		fovy: number
		aspect: number
		near: number
		far: number
	}
	ortho: {
		left: number
		right: number
		bottom: number
		top: number
		near: number
		far: number
	}
	lookEyePosition: {
		x: number
		y: number
		z: number
	}
	lootAtPosition: {
		x: number
		y: number
		z: number
	}
	lightIlluType: ELightIlluType
	lightPosition: {
		x: number
		y: number
		z: number
	}
	lightDirect: {
		x: number
		y: number
		z: number
	}
	lightColor: {
		r: number
		g: number
		b: number
		a: number
	}
	lightIntensityGain: number
	ambientLightColor: {
		r: number
		g: number
		b: number
		a: number
	}
}

export type TApplyMatrixParamsSetting = {
	rotationCalculationType: ERotationCalculationType
	modelRatation: {
		x: number
		y: number
		z: number
	}
	modeControl: {
		currentMatrix: Matrix4
	}
	modelOffset: {
		x: number
		y: number
		z: number
	}
	modelScale: {
		x: number
		y: number
		z: number
	}
}

export abstract class BaseShaderProfile {
	protected _glAttributesStrs: Array<string>
	protected _glUniformsStrs: Array<string>
	protected _glAttributes: { [key: string]: GLint }
	protected _glUniforms: { [key: string]: WebGLUniformLocation | null }
	constructor() {
		this._glAttributesStrs = []
		this._glUniformsStrs = []
	}

	public getGLAttributes(): { [key: string]: GLint } {
		return this._glAttributes
	}

	public getGLUniforms(): { [key: string]: WebGLUniformLocation | null } {
		return this._glUniforms
	}

	public abstract initWebGLProfile(gl: WebGLRenderingContext, program: WebGLProgram): void

	public abstract applyShaderParams(gl: WebGLRenderingContext, setting: TApplyShaderParamsSetting): void

	public abstract applyMatrixParams(gl: WebGLRenderingContext, setting: TApplyMatrixParamsSetting): void

	public abstract createVertexShader(): string

	public abstract createFragmentShader(): string

	protected initWebGLVariableLocation(gl: WebGLRenderingContext, program: WebGLProgram): void {
		const { glAttributes, glUniforms } = getWebGLVariableLocation(gl, program, {
			glAttributes: this._glAttributesStrs,
			glUniforms: this._glUniformsStrs,
		})
		this._glAttributes = glAttributes
		this._glUniforms = glUniforms
	}
}
