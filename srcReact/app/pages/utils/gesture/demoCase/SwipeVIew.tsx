import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { Gesture } from '@/app/utils/gesture/Gesture'
import { attachGesture } from '@/app/utils/gesture'

type TDataHandler = {
	LIST_SIZE: number
	list: Array<{ id: number; text: string }>
}
type TController = {
	isInit: boolean
	gestureInstance: Gesture
}
export function SwipeVIew(): React.ReactElement {
	const gestureInteractiveElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const dataHandler: { current: TDataHandler } = useRef<TDataHandler>({
		LIST_SIZE: 3,
		list: [],
	})
	const controllerRef: { current: TController } = useRef<TController>({
		isInit: false,
		gestureInstance: null!,
	})
	const [flush, setFlush] = useState<number>(0)
	useEffect((): void => {
		for (let i: number = 0; i < dataHandler.current.LIST_SIZE; i++) {
			dataHandler.current.list.push({ id: i, text: `可横向滑动的列表 ${i}` })
		}
		setFlush((prev: number): number => {
			return prev + 1
		})
	}, [])
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
			<div className={styles['view-subject-title']}>Swipe 事件(暂未实现)</div>
			<div className={styles['view-subject-content']}>
				<div className={styles['gesture-interactive']}>
					<div className={styles['swiper-container']}>
						<div className={styles['swiper-wrapper']}>
							{dataHandler.current.list.map((item: { id: number; text: string }): React.ReactElement => {
								return (
									<div className={styles['swiper-item']} data-id={item.id}>
										<div className={styles['list-content']}>{item.text}</div>
										<div className={styles['list-extend']}>
											<button className={styles['list-btn list-readed-setting']}>设为已读</button>
											<button className={styles['list-btn list-delete-setting']}>删除</button>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
