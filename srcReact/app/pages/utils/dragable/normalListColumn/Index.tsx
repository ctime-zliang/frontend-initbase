import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { ListDragableUtils } from '../../../../utils/dragableUtils/listDragableUtils'

export function NormalListColumn(): React.ReactElement {
	const dragableConatinerElementRef: { current: HTMLUListElement } = useRef<HTMLUListElement>(null!)
	const listDragableUtilsInstanceRef: { current: ListDragableUtils } = useRef<ListDragableUtils>(null!)
	const listDragInitRef: { current: boolean } = useRef<boolean>(false)
	const [list, setList] = useState<Array<{ id: number; text: string }>>([])
	useEffect((): void => {
		const tmpList: Array<{ id: number; text: string }> = []
		const SIZE: number = 50
		for (let i: number = 0; i < SIZE; i++) {
			tmpList.push({ id: i, text: `Dragable List Item ${i}` })
		}
		setList(tmpList)
	}, [])
	useEffect((): (() => void) => {
		if (dragableConatinerElementRef.current && !listDragInitRef.current) {
			listDragableUtilsInstanceRef.current = new ListDragableUtils(dragableConatinerElementRef.current)
			listDragInitRef.current = true
		}
		return (): void => {
			if (listDragableUtilsInstanceRef.current) {
				listDragableUtilsInstanceRef.current.cancel()
				listDragInitRef.current = false
			}
		}
	}, [dragableConatinerElementRef.current])
	return (
		<section style={{ padding: `10px 10px`, position: 'relative' }}>
			<div className={styles['draglist-container']}>
				<div className={styles['draglist-wrapper']}>
					<ul className={styles['draglist-ulist']} ref={dragableConatinerElementRef}>
						{list.map((item: { id: number; text: string }, index: number): React.ReactElement => {
							return (
								<li draggable="true" className={styles['draglist-listitem']} key={index}>
									<span>{item.id}</span> - <span>{item.text}</span>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</section>
	)
}
