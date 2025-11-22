import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, ListenerExtendPointerEvent } from '@/app/utils/gesture'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	upClientX: number
	upClientY: number
}
export function PointerUpView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		upClientX: -1,
		upClientY: -1,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addPointerUpListener(
				(
					evte: ListenerExtendPointerEvent,
					data: {
						clientX: number
						clientY: number
					},
					gesture: Gesture
				): void => {
					controllerRef.current.upClientX = data.clientX
					controllerRef.current.upClientY = data.clientY
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
			<div className={styles['view-subject-title']}>PointerUp 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} ref={gestureInteractiveElementRef}>
					<span>
						触发位置: ({controllerRef.current.upClientX}, {controllerRef.current.upClientY})
					</span>
				</div>
			</div>
		</div>
	)
}
