import { EAlertButtonType } from '../config/config'

export type TAlertOptions = {
	title: string
	btns: Array<TAlertBtnItem>
	content?: string
	lockMaskVisible?: boolean
}

export type TOpenAlertOptions = TAlertOptions

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TAlertBtnItem = {
	text: string
	type?: EAlertButtonType
	onClick?: () => void
}
