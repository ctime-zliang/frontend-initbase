import { Matrix4 } from '@/app/utils/algorithm/Matrix4'
import { BaseShaderProfile, TApplyMatrixParamsSetting, TApplyShaderParamsSetting } from '../../public/shader/ShaderProfile'
import { CanvasMatrix4 } from '@/app/utils/algorithm/CanvasMatrix4'
import { Vector3 } from '@/app/utils/algorithm/Vector3'
import { Angles } from '@/app/utils/algorithm/Angles'
import { EProjectionType, ERotationCalculationType } from '../../public/config/config'

export class ProjectionCaseShaderProfile extends BaseShaderProfile {
	constructor() {
		super()
	}

	public initWebGLProfile(gl: WebGLRenderingContext, program: WebGLProgram): void {
		this._glAttributesStrs = ['a_Position', 'a_Color']
		this._glUniformsStrs = ['u_ModelMatrix', 'u_ViewMatrix', 'u_ProjMatrix']
		this.initWebGLVariableLocation(gl, program)
	}

	public createVertexShader(): string {
		return `
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
	}

	public createFragmentShader(): string {
		return `
            precision mediump float;
			varying vec4 v_Color;
			void main() {
				gl_FragColor = v_Color;
			}
        `
	}

	public applyShaderParams(gl: WebGLRenderingContext, setting: TApplyShaderParamsSetting): void {
		const glUniforms: {
			[key: string]: WebGLUniformLocation | null
		} = this.getGLUniforms()
		if (setting.projectionType === EProjectionType.PerspectiveProjection) {
			/**
			 * 创建透视投影矩阵
			 */
			const projectionMatrix4: Matrix4 = CanvasMatrix4.setPerspective(
				setting.perspective.fovy,
				setting.perspective.aspect,
				setting.perspective.near,
				setting.perspective.far
			)
			gl.uniformMatrix4fv(glUniforms.u_ProjMatrix, false, new Float32Array(projectionMatrix4.data))
		}
		if (setting.projectionType === EProjectionType.OrthographicProjection) {
			/**
			 * 创建正交投影矩阵
			 */
			const orthoMatrix4: Matrix4 = CanvasMatrix4.setOrtho(
				setting.ortho.left,
				setting.ortho.right,
				setting.ortho.bottom,
				setting.ortho.top,
				setting.ortho.near,
				setting.ortho.far
			)
			gl.uniformMatrix4fv(glUniforms.u_ProjMatrix, false, new Float32Array(orthoMatrix4.data))
		}
		/**
		 * 创建视图矩阵
		 */
		const lookAtMatrix4: Matrix4 = CanvasMatrix4.setLookAt(
			new Vector3(setting.lookEyePosition.x, setting.lookEyePosition.y, setting.lookEyePosition.z),
			new Vector3(setting.lootAtPosition.x, setting.lootAtPosition.y, setting.lootAtPosition.z),
			new Vector3(0, 1, 0)
		)
		gl.uniformMatrix4fv(glUniforms.u_ViewMatrix, false, new Float32Array(lookAtMatrix4.data))
	}

	public applyMatrixParams(gl: WebGLRenderingContext, setting: TApplyMatrixParamsSetting): void {
		const glUniforms: {
			[key: string]: WebGLUniformLocation | null
		} = this.getGLUniforms()
		/**
		 * 创建旋转矩阵
		 */
		let modelRotationMatrix4: Matrix4 = CanvasMatrix4.initMatrix()
		if (setting.rotationCalculationType === ERotationCalculationType.UseMatrix) {
			/**
			 * 矩阵旋转
			 */
			const modelRotationXMatrix4: Matrix4 = CanvasMatrix4.setRotate(Angles.degreeToRadian(setting.modelRatation.x), new Vector3(1, 0, 0))
			const modelRotationYMatrix4: Matrix4 = CanvasMatrix4.setRotate(Angles.degreeToRadian(setting.modelRatation.y), new Vector3(0, 1, 0))
			const modelRotationZMatrix4: Matrix4 = CanvasMatrix4.setRotate(Angles.degreeToRadian(setting.modelRatation.z), new Vector3(0, 0, 1))
			modelRotationMatrix4 = modelRotationXMatrix4.multiply4(modelRotationYMatrix4).multiply4(modelRotationZMatrix4)
		}
		if (setting.rotationCalculationType === ERotationCalculationType.UseQuaternion) {
			/**
			 * 四元数旋转
			 */
			const currentMatrixData: Array<number> = setting.modeControl.currentMatrixData
			if (currentMatrixData) {
				modelRotationMatrix4 = CanvasMatrix4.setFromArray(currentMatrixData)
			}
		}
		/**
		 * 创建平移矩阵
		 */
		const modelOffsetMatrix4: Matrix4 = CanvasMatrix4.setTranslate(setting.modelOffset.x, setting.modelOffset.y, setting.modelOffset.z)
		/**
		 * 创建缩放矩阵
		 */
		const modelScaleMatrix4: Matrix4 = CanvasMatrix4.setScale(setting.modelScale.x, setting.modelScale.y, setting.modelScale.z)
		/**
		 * 生成模型变换矩阵
		 */
		const modelEffectMatrix4: Matrix4 = modelRotationMatrix4.multiply4(modelScaleMatrix4).multiply4(modelOffsetMatrix4)
		gl.uniformMatrix4fv(glUniforms.u_ModelMatrix, false, new Float32Array(modelEffectMatrix4.data))
	}
}
