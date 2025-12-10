import { TBoundingClientRectResult } from '@/app/types/comm.types'
import { Angles } from '@/app/utils/algorithm/Angles'
import { Quaternion } from '@/app/utils/algorithm/Quaternion'
import { Vector3 } from '@/app/utils/algorithm/Vector3'

export type TMouseInfo = {
	hasMoved: boolean
	isRightDown: boolean
	hasRightDownMove: boolean
	isLeftDown: boolean
	hasLeftDownMove: boolean
	isMiddleDown: boolean
	hasMiddleDownMove: boolean
	moveLastNativeX: number
	moveLastNativeY: number
	nativeRightDownX: number
	nativeRightDownY: number
	nativeMiddleDownX: number
	nativeMiddleDownY: number
	nativeLeftDownX: number
	nativeLeftDownY: number
	sceneRightDownX: number
	sceneRightDownY: number
	sceneMiddleDownX: number
	sceneMiddleDownY: number
	sceneLeftDownX: number
	sceneLeftDownY: number
	extensions: any
}
export class Interaction {
	static downKeys: Set<string> = null!
	static downNumberKeys: Set<string> = null!
	static mouseInfo: TMouseInfo = null!
	static canvasElementRect: TBoundingClientRectResult
	static mouseMoveAction: (ratioDistX: number, ratioDistY: number, ratationQuaternion: Quaternion) => void
	static mouseUpAction: () => void

	static initInteractionControllerStatus(canvasElementRect: TBoundingClientRectResult): void {
		Interaction.downKeys = new Set()
		Interaction.downNumberKeys = new Set()
		Interaction.mouseInfo = {
			hasMoved: false,
			isRightDown: false,
			hasRightDownMove: false,
			isLeftDown: false,
			hasLeftDownMove: false,
			isMiddleDown: false,
			hasMiddleDownMove: false,
			moveLastNativeX: 0,
			moveLastNativeY: 0,
			nativeRightDownX: -1,
			nativeRightDownY: -1,
			nativeMiddleDownX: -1,
			nativeMiddleDownY: -1,
			nativeLeftDownX: -1,
			nativeLeftDownY: -1,
			sceneRightDownX: -1,
			sceneRightDownY: -1,
			sceneMiddleDownX: -1,
			sceneMiddleDownY: -1,
			sceneLeftDownX: -1,
			sceneLeftDownY: -1,
			extensions: {},
		}
		Interaction.canvasElementRect = canvasElementRect
	}

	static clearInteractionControllerStatus(): void {
		Interaction.downKeys = null!
		Interaction.downNumberKeys = null!
		Interaction.mouseInfo = null!
		Interaction.canvasElementRect = null!
		Interaction.mouseMoveAction = null!
		Interaction.mouseUpAction = null!
	}

	static bindEvent(canvasElement: HTMLCanvasElement): void {
		canvasElement.addEventListener('mousedown', Interaction.canvasElementMouseDownHandler)
	}

	static unBindEvent(canvasElement: HTMLCanvasElement): void {
		canvasElement.removeEventListener('mousedown', Interaction.canvasElementMouseDownHandler)
	}

	static canvasElementMouseDownHandler(e: MouseEvent): void {
		;(e.target as HTMLCanvasElement).style.cursor = 'grabbing'
		const mouseClientX: number = e.clientX - Interaction.canvasElementRect.left
		const mouseClientY: number = e.clientY - Interaction.canvasElementRect.top
		Interaction.mouseInfo.isLeftDown = Interaction.mouseInfo.isMiddleDown = Interaction.mouseInfo.isRightDown = false
		Interaction.mouseInfo.nativeLeftDownX = Interaction.mouseInfo.nativeMiddleDownX = Interaction.mouseInfo.nativeRightDownX = 0
		Interaction.mouseInfo.nativeLeftDownY = Interaction.mouseInfo.nativeMiddleDownY = Interaction.mouseInfo.nativeRightDownY = 0
		Interaction.mouseInfo.hasMoved = false
		if (e.button === 0) {
			Interaction.mouseInfo.isLeftDown = true
			Interaction.mouseInfo.nativeLeftDownX = mouseClientX
			Interaction.mouseInfo.nativeLeftDownY = mouseClientY
		}
		if (e.button === 1) {
			Interaction.mouseInfo.isMiddleDown = true
			Interaction.mouseInfo.nativeMiddleDownX = mouseClientX
			Interaction.mouseInfo.nativeMiddleDownY = mouseClientY
		}
		if (e.button === 2) {
			Interaction.mouseInfo.isRightDown = true
			Interaction.mouseInfo.nativeRightDownX = mouseClientX
			Interaction.mouseInfo.nativeRightDownY = mouseClientY
		}
		document.addEventListener('mousemove', Interaction.canvasElementMouseMoveHandler)
		document.addEventListener('mouseup', Interaction.canvasElementMouseUpHandler)
	}

	static canvasElementMouseMoveHandler(e: MouseEvent): void {
		const mouseClientX: number = e.clientX - Interaction.canvasElementRect.left
		const mouseClientY: number = e.clientY - Interaction.canvasElementRect.top
		const itemDistNativeX: number = mouseClientX - Interaction.mouseInfo.moveLastNativeX
		const itemDistNativeY: number = mouseClientY - Interaction.mouseInfo.moveLastNativeY
		const totalDistNativeX: number = mouseClientX - Interaction.mouseInfo.nativeLeftDownX
		const totalDistNativeY: number = mouseClientY - Interaction.mouseInfo.nativeLeftDownY
		if (Interaction.mouseInfo.isLeftDown) {
			Interaction.mouseInfo.hasLeftDownMove = true
			const ratioDistX: number = 0.65 * itemDistNativeX
			const ratioDistY: number = 0.65 * itemDistNativeY
			const len: number = Math.sqrt(totalDistNativeX * totalDistNativeX + totalDistNativeY * totalDistNativeY)
			const ratationQuaternion: Quaternion =
				len === 0
					? Quaternion.initQuaternion()
					: Quaternion.fromRotation(Angles.degreeToRadian(len * 0.65), new Vector3(totalDistNativeY / len, totalDistNativeX / len, 0))
			Interaction.mouseMoveAction && Interaction.mouseMoveAction(ratioDistX, ratioDistY, ratationQuaternion)
		}
		if (Interaction.mouseInfo.isRightDown) {
			Interaction.mouseInfo.hasRightDownMove = true
		}
		if (Interaction.mouseInfo.isMiddleDown) {
			Interaction.mouseInfo.hasMiddleDownMove = true
		}
		Interaction.mouseInfo.moveLastNativeX = mouseClientX
		Interaction.mouseInfo.moveLastNativeY = mouseClientY
	}

	static canvasElementMouseUpHandler(e: MouseEvent): void {
		;(e.target as HTMLCanvasElement).style.cursor = 'default'
		if (Interaction.mouseInfo.isLeftDown) {
			Interaction.mouseUpAction && Interaction.mouseUpAction()
		}
		Interaction.mouseInfo.hasLeftDownMove = Interaction.mouseInfo.hasRightDownMove = Interaction.mouseInfo.hasMiddleDownMove = false
		Interaction.mouseInfo.isLeftDown = Interaction.mouseInfo.isMiddleDown = Interaction.mouseInfo.isRightDown = false
		Interaction.mouseInfo.nativeLeftDownX = Interaction.mouseInfo.nativeMiddleDownX = Interaction.mouseInfo.nativeRightDownX = 0
		Interaction.mouseInfo.nativeLeftDownY = Interaction.mouseInfo.nativeMiddleDownY = Interaction.mouseInfo.nativeRightDownY = 0
		document.removeEventListener('mousemove', Interaction.canvasElementMouseMoveHandler)
		document.removeEventListener('mouseup', Interaction.canvasElementMouseUpHandler)
	}
}
