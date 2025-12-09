import { initArrayBufferForLaterUse } from '@/app/utils/webgl/utils'
import { BaseBuffer, Objecter } from '../../public/models/ModelBase'
import { SinglePlane } from '../../public/models/SinglePlane'
import { BaseShaderProfile } from '../../public/shader/ShaderProfile'
import { Program } from '../program/Program'
import { ComprehensiveCaseShaderProfile } from '../shader/ComprehensiveCase'
import { ProjectionCaseShaderProfile } from '../shader/ProjectionCase'
import { Quaternion } from '@/app/utils/algorithm/Quaternion'
import { Triangles } from '../../public/models/Triangles'

export enum EShaderProfileEnum {
	ComprehensiveCase = 'ComprehensiveCase',
	ProjectionCase = 'ProjectionCase',
}
export function createShaderProfile(type: EShaderProfileEnum): BaseShaderProfile {
	switch (type) {
		case EShaderProfileEnum.ComprehensiveCase: {
			return new ComprehensiveCaseShaderProfile()
		}
	}
	switch (type) {
		case EShaderProfileEnum.ProjectionCase: {
			return new ProjectionCaseShaderProfile()
		}
	}
}

export enum EPresetModelType {
	SinglePlane = 'SinglePlane',
	Triangles = 'Triangles',
}
export function createObjecters(type: EPresetModelType): Array<Objecter> {
	const { gl } = Program.deviceParams
	switch (type) {
		case EPresetModelType.SinglePlane: {
			const objecters: Array<Objecter> = []
			const model: SinglePlane = new SinglePlane(50, 50, 0)
			const buffer: BaseBuffer = new BaseBuffer()
			buffer.vertexBuffer = initArrayBufferForLaterUse(gl)!
			buffer.normalBuffer = initArrayBufferForLaterUse(gl)!
			buffer.colorBuffer = initArrayBufferForLaterUse(gl)!
			buffer.texCoordBuffer = initArrayBufferForLaterUse(gl)!
			objecters.push(new Objecter(model, buffer, Quaternion.initQuaternion()))
			return objecters
		}
	}
	switch (type) {
		case EPresetModelType.Triangles: {
			const objecters: Array<Objecter> = []
			const model: Triangles = new Triangles()
			const buffer: BaseBuffer = new BaseBuffer()
			buffer.vertexBuffer = initArrayBufferForLaterUse(gl)!
			objecters.push(new Objecter(model, buffer, Quaternion.initQuaternion()))
			return objecters
		}
	}
	return []
}
