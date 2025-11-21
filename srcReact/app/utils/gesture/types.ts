import { Gesture } from './Gesture'
import { EPointerDirection, EPointerType } from './profile'

export type TExtendPointer = (PointerEvent | Touch | MouseEvent) & {
	pointerId?: number
	identifier?: number
	pointerType?: string
}
export type TListenerExtendPointerEvent = (PointerEvent | TouchEvent | MouseEvent) & {
	pointerId?: number
	identifier?: number
	pointerType?: string
}

export type TProfile = {
	/**
	 * wheel 放大倍率
	 */
	zoomInWheelRatio: number
	/**
	 * wheel 缩小倍率
	 */
	zoomOutWheelRatio: number
	/**
	 * onLongTap 触发的延迟时间设置
	 */
	delayOfLongTapDispatch: number
	/**
	 * 当存在至少一个指针按下时设置阻止默认事件
	 */
	preventDefaultOnPointerdown: boolean
	/**
	 * 当存在两个指针按下时设置阻止默认事件
	 */
	preventDefaultOnDoublePointersdown: boolean
	longTapTimeout: number
	isPointerdown: boolean
	/**
	 * 单指情形下
	 *      指针按下次数的计数器
	 */
	tapCount: number
	tapCountRestTimer: number
	/**
	 * 指针数组
	 *      指针事件存储队列
	 *      会在指针移动过程中更新指定序列的指针事件对象
	 */
	pointers: Array<TExtendPointer>
	/**
	 * 指针按下时记录的坐标列表
	 *      增量记录每一次 pointer-down 触发时时的指针采样坐标
	 *      在 pointer-move 触发时将实时更新列表内指定 pointerId 对应的坐标值
	 *      在 pointer-up 触发时将删除对应的坐标项
	 */
	dotsRecordInPointerdown: Array<TPlainDot>
	lastDotsRecordInPointerdown: Array<TPlainDot>
	/**
	 * 单指情形下
	 *      增量记录每一次 pointer-move 触发时的指针采样坐标
	 *      达到阈值时将触发 swipe 封装手势回调
	 */
	dotsRecordInPointermove: Array<TPlainDot & { timeStamp: number }>
	/**
	 * 单指情形下
	 *      dotsRecordInPointermove 保存记录的最大长度
	 */
	maxLengthDotsRecordInPointermove: number
	/**
	 * 单指情形下
	 *      单次记录 pointer-down/pointer-move/pointer-up 触发时的指针采样坐标
	 *      在每一次 pointer-move 触发时, 与之前记录的指针坐标做对比计算, 即可计算出指针移动的距离和方向
	 */
	pointerPositionCache: TPlainDot
	/**
	 * 单指情形下
	 *      pointer 移动方位
	 *      在任意时刻, 指针坐标相对于 pointer-down 按下时的坐标的方位
	 */
	movePositionRange: string
	/**
	 * 单指情形下
	 *      pointer 移动方向
	 */
	moveDirection: string
	/**
	 * 多指情形下
	 *      单次记录 pointer-down/pointer-move 触发时多指的几何中心坐标
	 *      在 pointer-up 触发时, 如果当前 pointer 个数不足 2, 直接重置该标记值
	 */
	centerPositionCacheOfMultiPointers: { x: number; y: number }
	/**
	 * 单指情形下
	 *      当前指针的采样坐标与指针按下时记录的坐标的位置偏移量
	 */
	offsetRectAtPointerdown: { x: number; y: number }
	lastOffsetRectAtPointerdown: { x: number; y: number }
	/**
	 * 事件触发类型
	 */
	triggerEventType: EPointerType
}

export type THandleListeners = {
	pointerdown: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	pointerup: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	pointermove: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	pointercancel: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	tap: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	longtap: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	doubletap: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	dragmove: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				movePosition: string
				moveDirection: string
				distX: number
				distY: number
				diffX: number
				diffY: number
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	wheel: Array<
		(
			evte: WheelEvent,
			data: {
				scale: number
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
	swipe: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				direction: EPointerDirection
				distX: number
				distY: number
				releaseX: number
				releaseY: number
			},
			gesture: Gesture
		) => void
	>
	pinch: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				scale: number
				centerX: number
				centerY: number
				lastCenterX: number
				lastCenterY: number
				pointA: { x: number; y: number }
				pointB: { x: number; y: number }
			},
			gesture: Gesture
		) => void
	>
	rotate: Array<
		(
			evte: TListenerExtendPointerEvent,
			data: {
				rotate: number
				centerX: number
				centerY: number
				lastCenterX: number
				lastCenterY: number
				pointA: { x: number; y: number }
				pointB: { x: number; y: number }
			},
			gesture: Gesture
		) => void
	>
	contextmenu: Array<
		(
			evte: MouseEvent,
			data: {
				clientX: number
				clientY: number
			},
			gesture: Gesture
		) => void
	>
}

export type TPlainDot = {
	x: number
	y: number
}
