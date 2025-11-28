import React, { useEffect, useRef } from 'react'
import '../styles/index.less'
import { TAlertBtnItem, TAlertOptions } from '../types/type'
import { AlertBtnMemo } from './AlertBtn'

export type TAlertRootProps = TAlertOptions & {
	domId: string
	unmount: () => void
}

export function AlertRoot(props: TAlertRootProps): React.ReactElement {
	const { domId, title, btns, content, lockMaskVisible = true, unmount } = props
	const topContainerElementRef: { current: HTMLSelectElement } = useRef<HTMLSelectElement>(null!)
	const lockWrapperElement: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const flexWrapperElement: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const titleString: string = (title || '').trim().toString()
	const titleElementClassName: string =
		titleString.length > 0 ? 'alertcompt-message-title alertcompt-message-title-visible' : 'alertcompt-message-title'
	const contentString: string = (title || '').trim().toString()
	const contentElementClassName: string =
		contentString.length > 0 ? 'alertcompt-message-content alertcompt-message-content-visible' : 'alertcompt-message-content'
	const lockWrapperClassName: string =
		lockMaskVisible === true ? 'alertcompt-lock-wrapper' : 'alertcompt-lock-wrapper alertcompt-lock-wrapper-transparent'
	const flexWrapperClassName: string = 'alertcompt-flex-wrapper'
	const alertComptWrapperClassName: string = lockMaskVisible === true ? 'alertcompt-wrapper' : 'alertcompt-wrapper alertcompt-wrapper-lightboxshow'
	const onClickAction = (btnIndex: number): void => {
		const btnItem: TAlertBtnItem = btns[btnIndex]
		if (!btnItem) {
			return
		}
		btnItem.onClick && btnItem.onClick()
		window.setTimeout((): void => {
			unmount()
		}, 75)
	}
	useEffect((): void => {
		if (lockWrapperElement.current) {
			lockWrapperElement.current.classList.add('alertcompt-lock-wrapper-visible')
		}
		if (flexWrapperElement.current) {
			flexWrapperElement.current.classList.add('alertcompt-flex-wrapper-visible')
		}
	}, [])
	return (
		<section ref={topContainerElementRef} className="alertcompt-container">
			<div className={lockWrapperClassName} ref={lockWrapperElement}></div>
			<div className={flexWrapperClassName} ref={flexWrapperElement}>
				<div className={alertComptWrapperClassName}>
					<div className="alertcompt-message-wrapper">
						<div className={titleElementClassName}>{title}</div>
						<div className={contentElementClassName}>{content}</div>
					</div>
					<div className="alertcompt-btns-wrapper">
						{btns.map((item: TAlertBtnItem, index: number): React.ReactElement => {
							return <AlertBtnMemo key={index} btnIndex={index} text={item.text} type={item.type} onClick={onClickAction} />
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
