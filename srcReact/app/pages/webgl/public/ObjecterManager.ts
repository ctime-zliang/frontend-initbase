import { Quaternion } from '@/app/utils/algorithm/Quaternion'
import { BaseBuffer, Objecter } from '../models/ModelBase'
import { SinglePlane } from '../models/SinglePlane'
import { initArrayBufferForLaterUse } from '@/app/utils/webgl/utils'

export class ObjecterManager {
	static createSinglePlaneObjecters(gl: WebGLRenderingContext): Array<Objecter> {
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
