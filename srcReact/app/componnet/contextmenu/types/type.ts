import React from 'react'
import { EContextMenuType, EContextPanelAlignment } from '../config/enum'

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
	position: TPosition
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

export type TCacheValue = TContextMenu & { id: string }

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

export type TPosition = {
	x: number
	y: number
}

export type TContextMenuRootProps = TContextMenu & {
	domId: string
	unmount: () => void
}

export type TSeparatorProps = {
	menuItem: TContextMenuItem
}

export type TMenuWrapperProps = {
	domId: string
	panelMaxHeight: number
	commanLink?: string
	subMenuItems?: Array<TContextMenuItem>
	onClickAction?: (a: TContextMenuItemExtend, e: React.MouseEvent) => void
	isSubMenu?: boolean
}

export type TContextMenuItemProps = {
	domId: string
	panelMaxHeight: number
	nowMenuItem: TContextMenuItem
	isCreateSubMenu: boolean
	commanLink?: string
	createSubMenu?: (a: TMenuWrapperProps) => React.ReactElement
	onClickAction?: (a: TContextMenuItemExtend, e: React.MouseEvent) => void
}

export type TContextMenuItemContentProps = TContextMenuItem

export type TIconTagsProps = {
	iconClassName?: string
}
