import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, ListenerExtendPointerEvent } from '@/app/utils/gesture'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	movePosition: string
	moveDirection: string
	distX: number
	distY: number
	diffX: number
	diffY: number
	clientX: number
	clientY: number
}
export function DragMoveView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		movePosition: '',
		moveDirection: '',
		distX: -1,
		distY: -1,
		diffX: -1,
		diffY: -1,
		clientX: -1,
		clientY: -1,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addDragMoveListener(
				(
					evte: ListenerExtendPointerEvent,
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
				): void => {
					evte.stopPropagation()
					evte.preventDefault()
					controllerRef.current.movePosition = data.movePosition
					controllerRef.current.moveDirection = data.moveDirection
					controllerRef.current.distX = data.distX
					controllerRef.current.distY = data.distY
					controllerRef.current.diffX = data.diffX
					controllerRef.current.diffX = data.diffX
					controllerRef.current.clientX = data.clientX
					controllerRef.current.clientY = data.clientY
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
			<div className={styles['view-subject-title']}>DragMove 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} style={{ height: '150px' }} ref={gestureInteractiveElementRef}>
					<div>Move Position: {controllerRef.current.movePosition}</div>
					<div>Move Direction: {controllerRef.current.moveDirection}</div>
					<div>
						Dist: ({controllerRef.current.distX}, {controllerRef.current.distY})
					</div>
					<div>
						Speed: ({controllerRef.current.diffX}, {controllerRef.current.diffY})
					</div>
					<div>
						Client: ({controllerRef.current.clientX}, {controllerRef.current.clientY})
					</div>
				</div>
			</div>
		</div>
	)
}
