import React, { useRef } from 'react'
import '../styles/index.less'
import { TAlertBtnItem, TAlertOptions } from '../types/type'
import { AlertBtnMemo } from './AlertBtn'
import { EAlertButtonType } from '../config/config'

export type TAlertRootProps = TAlertOptions & {
	domId: string
	unmount: () => void
}

export function AlertRoot(props: TAlertRootProps): React.ReactElement {
	const { domId, title, btns, content, unmount } = props
	const containerRef: { current: any } = useRef<HTMLElement>(null)
	const titleString: string = (title || '').trim().toString()
	const titleElementClassName: string =
		titleString.length > 0 ? 'alertcompt-message-title alertcompt-message-title-visible' : 'alertcompt-message-title'
	const contentString: string = (title || '').trim().toString()
	const contentElementClassName: string =
		contentString.length > 0 ? 'alertcompt-message-content alertcompt-message-content-visible' : 'alertcompt-message-content'
	const onClickAction = (btnIndex: number): void => {
		const btnItem: TAlertBtnItem = btns[btnIndex]
		if (!btnItem) {
			return
		}
		btnItem.onClick && btnItem.onClick()
		window.setTimeout((): void => {
			unmount()
		})
	}
	return (
		<section ref={containerRef} className="alertcompt-container">
			<div className="alertcompt-lock-wrapper"></div>
			<div className="alertcompt-flex-wrapper">
				<div className="alertcompt-wrapper">
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
