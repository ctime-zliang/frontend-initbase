import { TProfile } from './types'

export function createDefaultProfile(): TProfile {
	return {
		zoomInWheelRatio: 1.1,
		zoomOutWheelRatio: 1 / 1.1,
		delayOfLongTapDispatch: 500,
		preventDefaultOnPointerdown: false,
		preventDefaultOnDoublePointersdown: false,
		longTapTimeout: null!,
		isPointerdown: false,
		tapCount: 0,
		tapCountRestTimer: null!,
		pointers: [],
		dotsRecordInPointerdown: [],
		lastDotsRecordInPointerdown: [],
		dotsRecordInPointermove: [],
		maxLengthDotsRecordInPointermove: 30,
		pointerPositionCache: { x: 0, y: 0 },
		movePositionRange: '',
		moveDirection: '',
		centerPositionCacheOfMultiPointers: { x: 0, y: 0 },
		offsetRectAtPointerdown: { x: 0, y: 0 },
		lastOffsetRectAtPointerdown: { x: 0, y: 0 },
		triggerEventType: undefined!,
	}
}

export enum EPointerDirection {
	UP = 'UP',
	DOWN = 'DOWN',
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
}

export enum EPointerItemsOperations {
	ADD = 'ADD',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
}

export enum EPointerType {
	TOUCH_EVENT = 'TOUCH_EVENT',
	MOUSE_EVENT = 'MOUSE_EVENT',
}
