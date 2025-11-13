import { Color } from './Color'
import { DrawingInfo } from './DrawingInfo'
import { Face } from './Face'
import { Material } from './Material'
import { MTLDoc } from './MTLDoc'
import { Normal } from './Normal'
import { OBJObject } from './OBJObject'
import { StringParser } from './StringParser'
import { calcNormal } from './utils'
import { Vertex } from './Vertex'

export class OBJDoc {
	private _objFilePath: string
	private _mtls: Array<{ complete: boolean; materials: Array<Material> }>
	private _objects: Array<OBJObject>
	private _normals: Array<Normal>
	private _vertices: Array<Vertex>
	constructor(objFilePath: string) {
		this._objFilePath = objFilePath
		this._mtls = []
		this._objects = []
		this._vertices = []
		this._normals = []
	}

	public get objFilePath(): string {
		return this._objFilePath
	}
	public set objFilePath(value: string) {
		this._objFilePath = value
	}

	public get mtls(): Array<{ complete: boolean; materials: Array<Material> }> {
		return this._mtls
	}
	public set mtls(value: Array<{ complete: boolean; materials: Array<Material> }>) {
		this._mtls = value
	}

	public get objects(): Array<OBJObject> {
		return this._objects
	}
	public set objects(value: Array<OBJObject>) {
		this._objects = value
	}

	public get vertices(): Array<Vertex> {
		return this._vertices
	}
	public set vertices(value: Array<Vertex>) {
		this._vertices = value
	}

	public get normals(): Array<Normal> {
		return this._normals
	}
	public set normals(value: Array<Normal>) {
		this._normals = value
	}

	public parse(fileString: string, scale: number, reverse: boolean): boolean {
		const lines: Array<string> = fileString.split('\n')
		lines.push(null!)
		const sp: StringParser = new StringParser(undefined!)
		let index: number = 0
		let currentObject: OBJObject = null!
		let currentMaterialName: string = ''
		let line: string = undefined!
		while ((line = lines[index++]) != null) {
			sp.reset(line)
			const command: string = sp.getWord()
			if (command === null) {
				continue
			}
			switch (command) {
				case '#': {
					continue
				}
				/**
				 * 解析模型材质
				 * 		加载材质文件
				 */
				case 'mtllib': {
					const path: string = this.parseMtllib(sp, this.objFilePath)
					const mtl: MTLDoc = new MTLDoc()
					this.mtls.push(mtl)
					const xhr: XMLHttpRequest = new XMLHttpRequest()
					xhr.onreadystatechange = (): void => {
						if (xhr.readyState === 4) {
							if (xhr.status != 404) {
								this.readMTLFile(xhr.responseText, mtl)
							} else {
								mtl.complete = true
							}
						}
					}
					xhr.open('GET', path, true)
					xhr.send()
					continue
				}
				/**
				 * 解析模型名称
				 */
				case 'o':
				case 'g': {
					const object: OBJObject = this.parseObjectName(sp)
					this.objects.push(object)
					currentObject = object
					continue
				}
				/**
				 * 解析模型顶点
				 */
				case 'v': {
					const vertex: Vertex = this.parseVertex(sp, scale)
					this.vertices.push(vertex)
					continue
				}
				case 'vn': {
					const normal: Normal = this.parseNormal(sp)
					this.normals.push(normal)
					continue
				}
				/**
				 * 解析使用材质标记信息
				 */
				case 'usemtl': {
					currentMaterialName = this.parseUseMTL(sp)
					continue
				}
				/**
				 * 解析模型表面
				 */
				case 'f': {
					const face: Face = this.parseFace(sp, currentMaterialName, this.vertices, reverse)
					currentObject.addFace(face)
					continue
				}
			}
		}
		return true
	}

	public getDrawingInfo(): DrawingInfo {
		/**
		 * 计算顶点索引的总个数
		 */
		let numIndices: number = 0
		for (let i: number = 0; i < this.objects.length; i++) {
			numIndices += this.objects[i].numIndices
		}
		const vertices: Array<number> = new Array(numIndices * 3)
		const normals: Array<number> = new Array(numIndices * 3)
		const colors: Array<number> = new Array(numIndices * 4)
		const indices: Array<number> = new Array(numIndices)
		/**
		 * 遍历模型个数 this.objects
		 * 		遍历每个模型的所有表面
		 * 			遍历每个表面的所有顶点
		 * 				- 尝试通过当前表面绑定的材质名称从材质列表中匹配颜色数据
		 * 				- 解析并填充顶点/法线/颜色/索引
		 */
		let indexIndices: number = 0
		for (let i: number = 0; i < this.objects.length; i++) {
			const object: OBJObject = this.objects[i]
			for (let j: number = 0; j < object.faces.length; j++) {
				const face: Face = object.faces[j]
				const color: Color = this.findColor(face.materialName)
				for (let k: number = 0; k < face.vIndices.length; k++) {
					indices[indexIndices] = indexIndices
					const vertex: Vertex = this.vertices[face.vIndices[k]]
					vertices[indexIndices * 3 + 0] = vertex.x
					vertices[indexIndices * 3 + 1] = vertex.y
					vertices[indexIndices * 3 + 2] = vertex.z
					colors[indexIndices * 4 + 0] = color.r
					colors[indexIndices * 4 + 1] = color.g
					colors[indexIndices * 4 + 2] = color.b
					colors[indexIndices * 4 + 3] = color.a
					let nIdx: number = face.nIndices[k]
					if (nIdx >= 0) {
						let normal = this.normals[nIdx]
						normals[indexIndices * 3 + 0] = normal.x
						normals[indexIndices * 3 + 1] = normal.y
						normals[indexIndices * 3 + 2] = normal.z
					} else {
						normals[indexIndices * 3 + 0] = face.normal.x
						normals[indexIndices * 3 + 1] = face.normal.y
						normals[indexIndices * 3 + 2] = face.normal.z
					}
					indexIndices++
				}
			}
		}
		return new DrawingInfo(new Float32Array(vertices), new Float32Array(normals), new Float32Array(colors), new Uint16Array(indices))
	}

	private readMTLFile(fileString: string, mtl: MTLDoc): void {
		let lines: Array<string> = fileString.split('\n')
		lines.push(null!)
		let index: number = 0
		let line: string = undefined!
		let name: string = ''
		let sp: StringParser = new StringParser(undefined!)
		while ((line = lines[index++]) != null) {
			sp.reset(line)
			let command = sp.getWord()
			if (command === null) {
				continue
			}
			switch (command) {
				case '#': {
					continue
				}
				case 'newmtl': {
					name = mtl.parseNewMTL(sp)
					continue
				}
				case 'Kd': {
					if (name === '') {
						continue
					}
					let material: Material = mtl.parseRGB(sp, name)
					mtl.materials.push(material)
					name = ''
					continue
				}
			}
		}
		mtl.complete = true
	}

	private parseMtllib(sp: StringParser, objFilePath: string): string {
		const idx: number = objFilePath.lastIndexOf('/')
		let dirPath: string = ''
		if (idx > 0) {
			dirPath = objFilePath.substr(0, idx + 1)
		}
		return dirPath + sp.getWord()
	}

	private parseObjectName(sp: StringParser): OBJObject {
		return new OBJObject(sp.getWord())
	}

	private parseVertex(sp: StringParser, scale: number): Vertex {
		const x: number = sp.getFloatTranslatedWord() * scale
		const y: number = sp.getFloatTranslatedWord() * scale
		const z: number = sp.getFloatTranslatedWord() * scale
		return new Vertex(x, y, z)
	}

	private parseNormal(sp: StringParser): Normal {
		const x: number = sp.getFloatTranslatedWord()
		const y: number = sp.getFloatTranslatedWord()
		const z: number = sp.getFloatTranslatedWord()
		return new Normal(x, y, z)
	}

	private parseUseMTL(sp: StringParser): string {
		return sp.getWord()
	}

	private parseFace(sp: StringParser, materialName: string, vertices: Array<Vertex>, reverse: boolean): Face {
		const face: Face = new Face(materialName)
		/**
		 * 逐面解析并缓存各面所对应的顶点的索引
		 */
		for (;;) {
			const word: string = sp.getWord()
			if (word === null) {
				break
			}
			const subWords: Array<string> = word.split('/')
			if (subWords.length >= 1) {
				let vi: number = parseInt(subWords[0]) - 1
				face.vIndices.push(vi)
			}
			if (subWords.length >= 3) {
				const ni: number = parseInt(subWords[2]) - 1
				face.nIndices.push(ni)
			} else {
				face.nIndices.push(-1)
			}
		}
		const v0: [number, number, number] = [vertices[face.vIndices[0]].x, vertices[face.vIndices[0]].y, vertices[face.vIndices[0]].z]
		const v1: [number, number, number] = [vertices[face.vIndices[1]].x, vertices[face.vIndices[1]].y, vertices[face.vIndices[1]].z]
		const v2: [number, number, number] = [vertices[face.vIndices[2]].x, vertices[face.vIndices[2]].y, vertices[face.vIndices[2]].z]
		let normal: [number, number, number] = calcNormal(v0, v1, v2)
		if (normal === null) {
			if (face.vIndices.length >= 4) {
				let v3: [number, number, number] = [vertices[face.vIndices[3]].x, vertices[face.vIndices[3]].y, vertices[face.vIndices[3]].z]
				normal = calcNormal(v1, v2, v3)
			}
			if (normal === null) {
				normal = [0.0, 1.0, 0.0]
			}
		}
		if (reverse) {
			normal[0] = -normal[0]
			normal[1] = -normal[1]
			normal[2] = -normal[2]
		}
		face.normal = new Normal(normal[0], normal[1], normal[2])
		/**
		 * 将包含 3 个以上顶点索引的平面拆分成三角形
		 */
		if (face.vIndices.length > 3) {
			const n: number = face.vIndices.length - 2
			const newVIndices: Array<number> = new Array(n * 3)
			const newNIndices: Array<number> = new Array(n * 3)
			for (let i: number = 0; i < n; i++) {
				newVIndices[i * 3 + 0] = face.vIndices[0]
				newVIndices[i * 3 + 1] = face.vIndices[i + 1]
				newVIndices[i * 3 + 2] = face.vIndices[i + 2]
				newNIndices[i * 3 + 0] = face.nIndices[0]
				newNIndices[i * 3 + 1] = face.nIndices[i + 1]
				newNIndices[i * 3 + 2] = face.nIndices[i + 2]
			}
			face.vIndices = newVIndices
			face.nIndices = newNIndices
		}
		face.numIndices = face.vIndices.length
		return face
	}

	private isMTLComplete(): boolean {
		if (this.mtls.length === 0) {
			return true
		}
		for (let i: number = 0; i < this.mtls.length; i++) {
			if (!this.mtls[i].complete) {
				return false
			}
		}
		return true
	}

	private findColor(name: string): Color {
		for (let i: number = 0; i < this.mtls.length; i++) {
			for (let j: number = 0; j < this.mtls[i].materials.length; j++) {
				if (this.mtls[i].materials[j].name === name) {
					return this.mtls[i].materials[j].color
				}
			}
		}
		return new Color(0.8, 0.8, 0.8, 1)
	}
}
