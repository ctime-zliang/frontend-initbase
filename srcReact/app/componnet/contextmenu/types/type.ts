import React from 'react'
import { EContextMenuType, EContextPanelAlignment } from '../config/config'

export type TContextMenuItem = {
	title?: string | React.ReactElement
	type?: EContextMenuType
	cmd?: string
	disabled?: boolean
	subMenu?: Array<TContextMenuItem>
	checked?: boolean
	isHidePrevTag?: boolean
	tips?: string
	isHideTips?: boolean
	isHideExt?: boolean
	isSetContentHtml?: boolean
	isSetContentJSX?: boolean
	iconClassName?: string
	data?: any
}

export type TContextMenu = {
	data: Array<TContextMenuItem>
	position: {
		x: number
		y: number
	}
	panelAlignment?: EContextPanelAlignment
	panelMaxHeight?: number
	onClick?: (menuItem: TContextMenuItemExtend, e: React.MouseEvent) => void
	onEnterConfirm?: (cmdlink: Array<string>) => void
	onKeydown?: (e: KeyboardEvent, unmount: () => void) => void
	onKeyup?: (e: KeyboardEvent, unmount: () => void) => void
}

export type TOpenContextMenu = TContextMenu

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TContextMenuItemExtend = TContextMenuItem & {
	cmdlink?: Array<string>
}

export type TBoundingClientRectResultToJSONResult = {
	left: number
	top: number
	right: number
	bottom: number
	width: number
	height: number
	x: number
	y: number
}
