import React from 'react'
import { EAlertButtonType } from '../config/config'

export type TAlertBtnProps = {
	btnIndex: number
	text: string
	type?: EAlertButtonType
	onClick?: (btnIndex: number) => void
}

const CLASSNAME_MAP: Record<EAlertButtonType, string> = {
	[EAlertButtonType.DEFAULT]: 'alertcompt-default-btn',
	[EAlertButtonType.PRIMARY]: 'alertcompt-primary-btn',
	[EAlertButtonType.WARN]: 'alertcompt-warning-btn',
	[EAlertButtonType.ERROR]: 'alertcompt-error-btn',
}

function AlertBtn(props: TAlertBtnProps): React.ReactElement {
	const { btnIndex, text, type = EAlertButtonType.DEFAULT, onClick } = props
	const statusClassName: string = CLASSNAME_MAP[type]
	const btnWrapperClassName: string = `alertcompt-btn ${statusClassName}`
	const onBtnClickAction = (e: React.MouseEvent): void => {
		onClick && onClick(btnIndex)
	}
	return (
		<button className={btnWrapperClassName} onClick={onBtnClickAction}>
			<span className="alertmgr-btntext">{text}</span>
		</button>
	)
}

export const AlertBtnMemo = React.memo(AlertBtn)
