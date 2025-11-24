import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture, attachTapRipple, ListenerExtendPointerEvent } from '@/app/utils/gesture'
import { TapRipple } from '@/app/utils/gesture/TapRipple'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
	tapRipple: TapRipple
	tapClientX: number
	tapClientY: number
}
export function TapView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
		tapRipple: null!,
		tapClientX: -1,
		tapClientY: -1,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.tapRipple = attachTapRipple('tap-ripple', {
				rippleColor: `rgba(78, 201, 176, 1.0)`,
			})
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
			controllerRef.current.gestureInstance.addTapListener(
				(
					evte: ListenerExtendPointerEvent,
					data: {
						clientX: number
						clientY: number
					},
					gesture: Gesture
				): void => {
					controllerRef.current.tapClientX = data.clientX
					controllerRef.current.tapClientY = data.clientY
					if (gestureInteractiveElementRef.current) {
						const pageX: number = evte instanceof MouseEvent ? evte.pageX : evte instanceof TouchEvent ? evte.changedTouches[0].pageX : 0
						const pageY: number = evte instanceof MouseEvent ? evte.pageY : evte instanceof TouchEvent ? evte.changedTouches[0].pageY : 0
						controllerRef.current.tapRipple.apply(gestureInteractiveElementRef.current.parentElement!, { x: pageX, y: pageY })
					}
					setFlush((prev: number): number => {
						return prev + 1
					})
				}
			)
		}
		return (): void => {
			controllerRef.current.isInit = false
			controllerRef.current.tapRipple.uninstall()
			controllerRef.current.gestureInstance.destory()
		}
	}, [])
	return (
		<div className={styles['view-subject']} data-flush={flush}>
			<div className={styles['view-subject-title']}>Tap 事件</div>
			<div className={styles['view-subject-content']} style={{ overflow: 'hidden' }}>
				<div className={styles['gesture-interactive']} ref={gestureInteractiveElementRef}>
					<span>
						触发位置: ({controllerRef.current.tapClientX}, {controllerRef.current.tapClientY})
					</span>
				</div>
			</div>
		</div>
	)
}
