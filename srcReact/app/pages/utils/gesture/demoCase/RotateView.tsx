import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture } from '@/app/utils/gesture'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
}
export function RotateView(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
		}
		return (): void => {
			controllerRef.current.isInit = false
			controllerRef.current.gestureInstance.destory()
		}
	}, [])
	return (
		<div className={styles['view-subject']} data-flush={flush}>
			<div className={styles['view-subject-title']}>Rotate 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']} ref={gestureInteractiveElementRef}>
					<div className={styles['center-container']}>
						<div className={styles['rect-place']}></div>
					</div>
				</div>
				<div style={{ padding: '5px 0' }}></div>
				<div className={styles['gesture-interactive']}></div>
			</div>
		</div>
	)
}
