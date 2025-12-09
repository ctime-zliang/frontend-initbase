import { Matrix4 } from '@/app/utils/algorithm/Matrix4'
import { BaseShaderProfile, TApplyMatrixParamsSetting, TApplyShaderParamsSetting } from '../../public/shader/ShaderProfile'
import { CanvasMatrix4 } from '@/app/utils/algorithm/CanvasMatrix4'
import { Vector3 } from '@/app/utils/algorithm/Vector3'
import { Angles } from '@/app/utils/algorithm/Angles'
import { ELightIlluType, EProjectionType, ERotationCalculationType } from '../../public/config/config'

export class ComprehensiveCaseShaderProfile extends BaseShaderProfile {
	constructor() {
		super()
	}

	public initWebGLProfile(gl: WebGLRenderingContext, program: WebGLProgram): void {
		this._glAttributesStrs = ['a_Normal', 'a_ObjPosition', 'a_Color', 'a_textureCoord']
		this._glUniformsStrs = [
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
		]
		this.initWebGLVariableLocation(gl, program)
	}

	public createVertexShader(): string {
		return `
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
	}

	public createFragmentShader(): string {
		return `
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
		gl.uniform3fv(glUniforms.u_EyePosition, new Float32Array([setting.lookEyePosition.x, setting.lookEyePosition.y, setting.lookEyePosition.z]))
		gl.uniform1f(glUniforms.u_illuType, setting.lightIlluType === ELightIlluType.ParallelLight ? 1.0 : 2.0)
		if (setting.lightIlluType === ELightIlluType.ParallelLight) {
			/**
			 * 平行光
			 * 		依据光照模型, 此处传给着色器的光源方向需要取反, 以便在着色器中正确求取入射光反方向向量与物体表面法线向量的夹角
			 */
			const lightDirection: Vector3 = new Vector3(-setting.lightDirect.x, -setting.lightDirect.y, -setting.lightDirect.z)
			const lightNormalizeDirection: Vector3 = lightDirection.normalize()
			gl.uniform3fv(
				glUniforms.u_LightDirection,
				new Float32Array([lightNormalizeDirection.x, lightNormalizeDirection.y, lightNormalizeDirection.z])
			)
		}
		if (setting.lightIlluType === ELightIlluType.SpotLight) {
			/**
			 * 点光
			 */
			gl.uniform3fv(glUniforms.u_LightPosition, new Float32Array([setting.lightPosition.x, setting.lightPosition.y, setting.lightPosition.z]))
		}
		gl.uniform3f(glUniforms.u_LightColor, setting.lightColor.r, setting.lightColor.g, setting.lightColor.b)
		gl.uniform1f(glUniforms.u_lightIntensityGain, setting.lightIntensityGain)
		gl.uniform3f(glUniforms.u_AmbientLightColor, setting.ambientLightColor.r, setting.ambientLightColor.g, setting.ambientLightColor.b)
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
			const currentMatrix: Matrix4 = setting.modeControl.currentMatrix
			if (currentMatrix) {
				modelRotationMatrix4 = CanvasMatrix4.setFromArray(currentMatrix.data)
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
		/**
		 * 创建法线变换矩阵
		 */
		const modelEffectInverseMatrix4: Matrix4 = CanvasMatrix4.setInverse(modelEffectMatrix4)
		const modelEffectInverseTransposeMatrix4: Matrix4 = CanvasMatrix4.setTranspose(modelEffectInverseMatrix4)
		const normalMatrix4: Matrix4 = modelEffectInverseTransposeMatrix4
		gl.uniformMatrix4fv(glUniforms.u_ModelMatrix, false, new Float32Array(modelEffectMatrix4.data))
		gl.uniformMatrix4fv(glUniforms.u_NormalMatrix, false, new Float32Array(normalMatrix4.data))
	}
}
