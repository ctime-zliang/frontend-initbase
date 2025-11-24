import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, ListenerExtendPointerEvent, PlainDot } from '@/app/utils/gesture'

const MAX_SCALE: number = 10
const MIN_SCALE: number = 0.1

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	scale: number
	factor: number
	centerX: number
	centerY: number
	lastCenterX: number
	lastCenterY: number
	pointA: PlainDot
	pointB: PlainDot
}
export function PinchView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		scale: 1,
		factor: 1,
		centerX: -1,
		centerY: -1,
		lastCenterX: -1,
		lastCenterY: -1,
		pointA: { x: -1, y: -1 },
		pointB: { x: -1, y: -1 },
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addPinchListener(
				(
					evte: ListenerExtendPointerEvent,
					data: {
						factor: number
						centerX: number
						centerY: number
						lastCenterX: number
						lastCenterY: number
						pointA: { x: number; y: number }
						pointB: { x: number; y: number }
					}
				): void => {
					evte.stopPropagation()
					evte.preventDefault()
					controllerRef.current.factor = data.factor
					controllerRef.current.centerX = data.centerX
					controllerRef.current.centerY = data.centerY
					controllerRef.current.lastCenterX = data.lastCenterX
					controllerRef.current.lastCenterY = data.lastCenterY
					controllerRef.current.pointA = data.pointA
					controllerRef.current.pointB = data.pointB
					controllerRef.current.scale = controllerRef.current.scale * controllerRef.current.factor
					if (controllerRef.current.scale > MAX_SCALE) {
						controllerRef.current.scale = MAX_SCALE
					} else if (controllerRef.current.scale < MIN_SCALE) {
						controllerRef.current.scale = MIN_SCALE
					}
					setFlush((prev: number): number => {
						return prev + 1
					})
				}
			)
		}
		return (): void => {
			controllerRef.current.isInit = false
			controllerRef.current.gestureInstance.destory()
		}
	}, [])
	return (
		<div className={styles['view-subject']} data-flush={flush}>
			<div className={styles['view-subject-title']}>Pinch 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} ref={gestureInteractiveElementRef}>
					<div className={styles['center-container']}>
						<div className={styles['rect-place']}></div>
					</div>
				</div>
				<div style={{ padding: '5px 0' }}></div>
				<div className={styles['gesture-interactive']}>
					<div>Factor: {controllerRef.current.factor}</div>
					<div>Scale: {controllerRef.current.scale}</div>
					<div>
						Center: ({controllerRef.current.centerX}, {controllerRef.current.centerY})
					</div>
					<div>
						Last Center: ({controllerRef.current.lastCenterX}, {controllerRef.current.lastCenterY})
					</div>
					<div>
						Pointer A: ({controllerRef.current.pointA.x}, {controllerRef.current.pointA.y})
					</div>
					<div>
						Pointer B: ({controllerRef.current.pointB.x}, {controllerRef.current.pointB.y})
					</div>
				</div>
			</div>
		</div>
	)
}
