import React, { useRef } from 'react'
import '../styles/index.less'
import { TAlertOptions } from '../types/type'

export type TAlertRootProps = TAlertOptions & {
	domId: string
	unmount: () => void
}

export function AlertRoot(props: TAlertRootProps): React.ReactElement {
	const { domId, title, content, unmount } = props
	const containerRef: { current: any } = useRef<HTMLElement>(null)
	const titleString: string = (title || '').trim().toString()
	const titleElementClassName: string =
		titleString.length > 0 ? 'alertcompt-message-title alertcompt-message-title-visible' : 'alertcompt-message-title'
	const contentString: string = (title || '').trim().toString()
	const contentElementClassName: string =
		contentString.length > 0 ? 'alertcompt-message-content alertcompt-message-content-visible' : 'alertcompt-message-content'
	const onClickAction = (e: React.MouseEvent): void => {
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
					<div className="alertcompt-btns-wrapper"></div>
				</div>
			</div>
		</section>
	)
}
