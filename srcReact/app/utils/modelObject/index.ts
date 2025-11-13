import { OBJDoc } from './OBJDoc'

export function modelObjectGenerate(objFilePath: string): OBJDoc {
	return new OBJDoc(objFilePath)
}
