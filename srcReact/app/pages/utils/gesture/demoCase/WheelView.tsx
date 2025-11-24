import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, ListenerExtendPointerEvent } from '@/app/utils/gesture'

const MAX_SCALE: number = 10
const MIN_SCALE: number = 0.1

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	scale: number
	factor: number
	clientX: number
	clientY: number
}
export function WheelView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		scale: 1,
		factor: 1,
		clientX: -1,
		clientY: -1,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addWheelListener(
				(
					evte: ListenerExtendPointerEvent,
					data: {
						factor: number
						clientX: number
						clientY: number
					},
					gesture: Gesture
				): void => {
					evte.stopPropagation()
					evte.preventDefault()
					controllerRef.current.factor = data.factor
					controllerRef.current.clientX = data.clientX
					controllerRef.current.clientY = data.clientY
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
			<div className={styles['view-subject-title']}>Wheel 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} ref={gestureInteractiveElementRef}>
					<div className={styles['center-container']}>
						<div className={styles['rect-place']} style={{ transform: `scale(${controllerRef.current.scale})` }}></div>
					</div>
				</div>
				<div style={{ padding: '5px 0' }}></div>
				<div className={styles['gesture-interactive']}>
					<div>Factor: {controllerRef.current.factor}</div>
					<div>Scale: {controllerRef.current.scale}</div>
					<div>
						Client: ({controllerRef.current.clientX}, {controllerRef.current.clientY})
					</div>
				</div>
			</div>
		</div>
	)
}
