import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, ListenerExtendPointerEvent } from '@/app/utils/gesture'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	downMoveClientX: number
	downMoveClientY: number
}
export function PointerDownMoveView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		downMoveClientX: -1,
		downMoveClientY: -1,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addPointerDownMoveListener(
				(
					evte: ListenerExtendPointerEvent,
					data: {
						clientX: number
						clientY: number
					},
					gesture: Gesture
				): void => {
					evte.stopPropagation()
					evte.preventDefault()
					controllerRef.current.downMoveClientX = data.clientX
					controllerRef.current.downMoveClientY = data.clientY
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
			<div className={styles['view-subject-title']}>PointerDownMove 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} style={{ height: `80px` }} ref={gestureInteractiveElementRef}>
					<span>
						触发位置: ({controllerRef.current.downMoveClientX}, {controllerRef.current.downMoveClientY})
					</span>
				</div>
			</div>
		</div>
	)
}
