import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, ListenerExtendPointerEvent } from '@/app/utils/gesture'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	cancelClientX: number
	cancelClientY: number
}
export function PointerCancelView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		cancelClientX: -1,
		cancelClientY: -1,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addPointerCancelListener(
				(
					evte: ListenerExtendPointerEvent,
					data: {
						clientX: number
						clientY: number
					},
					gesture: Gesture
				): void => {
					controllerRef.current.cancelClientX = data.clientX
					controllerRef.current.cancelClientY = data.clientY
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
			<div className={styles['view-subject-title']}>PointerCancel 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} ref={gestureInteractiveElementRef}>
					<span>
						触发位置: ({controllerRef.current.cancelClientX}, {controllerRef.current.cancelClientY})
					</span>
				</div>
			</div>
		</div>
	)
}
