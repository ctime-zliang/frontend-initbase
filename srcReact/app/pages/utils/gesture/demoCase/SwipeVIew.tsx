import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture } from '@/app/utils/gesture'

type TController = {
	isInit: boolean
	gestureInstance: Gesture
}
export function SwipeVIew(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): (() => void) => {
		if (!controllerRef.current.isInit) {
			controllerRef.current.isInit = true
			// controllerRef.current.gestureInstance = attachGesture([gestureInteractiveElementRef.current])
		}
		return (): void => {
			controllerRef.current.isInit = false
			// controllerRef.current.gestureInstance.destory()
		}
	}, [])
	return (
		<div className={styles['view-subject']} data-flush={flush}>
			<div className={styles['view-subject-title']}>Swipe 事件</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']}>
					<div className={styles['swiper-container']}>
						<div className={styles['swiper-wrapper']}>
							<div className={styles['swiper-item']}>
								<div className={styles['list-content']}>可横向滑动的列表</div>
								<div className={styles['list-extend']}>
									<button className={styles['list-btn list-readed-setting']}>设为已读</button>
									<button className={styles['list-btn list-delete-setting']}>删除</button>
								</div>
							</div>
							<div className={styles['swiper-item']}>
								<div className={styles['list-content']}>可横向滑动的列表</div>
								<div className={styles['list-extend']}>
									<button className={styles['list-btn list-readed-setting']}>设为已读</button>
									<button className={styles['list-btn list-delete-setting']}>删除</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
