import React, { useCallback } from 'react'
import { CMDLINK_DIVISION_TAG } from '../config/config'
import { menuItemElementMouseOverEventHandler } from '../utils/menuItemEventHandler'
import { MenuItemContentMemo } from './MenuItemContent'
import { IconTagsMemo } from '../component/IconTags'
import { CheckTagsMemo } from '../component/CheckTags'
import { TMenuWrapperProps } from './MenuWrapper'
import { TContextMenuItem, TContextMenuItemExtend } from '../types/type'

export type TContextMenuItemProps = {
	domId: string
	panelMaxHeight: number
	nowMenuItem: TContextMenuItem
	isCreateSubMenu: boolean
	commanLink?: string
	createSubMenu?: (a: TMenuWrapperProps) => React.ReactElement
	onClickAction?: (a: TContextMenuItemExtend, e: React.MouseEvent) => void
}

function MenuItem(props: TContextMenuItemProps): React.ReactElement {
	const { domId, panelMaxHeight, commanLink = undefined, nowMenuItem, isCreateSubMenu, createSubMenu, onClickAction } = props
	const cmdlink: string = commanLink ? commanLink : (nowMenuItem.cmd as string)

	const onMenuItemClickAction = (e: React.MouseEvent): void => {
		const currentTarget: HTMLElement = e.currentTarget as HTMLElement
		if (currentTarget) {
			if (currentTarget.nextElementSibling && currentTarget.nextElementSibling.tagName.toLocaleLowerCase() === 'main') {
				return
			}
			const dataCmdLink: string = currentTarget.getAttribute('data-cmdlink') as string
			const cmdlink: Array<string> = dataCmdLink ? dataCmdLink.split(CMDLINK_DIVISION_TAG) : []
			onClickAction && onClickAction({ ...nowMenuItem, cmdlink }, e)
		}
	}
	const onWrapperMouseOverAction = useCallback((e: React.MouseEvent): void => {
		menuItemElementMouseOverEventHandler(e.currentTarget as HTMLElement)
	}, [])

	return (
		<li
			className={'ctxmenu-item' + (isCreateSubMenu ? ' ctxmenu-submenu' : '') + (nowMenuItem.disabled ? ' ctxmenu-item-disabled' : '')}
			onMouseOver={onWrapperMouseOverAction}
			data-itemtype={'ctxmenu-item' + (nowMenuItem.disabled ? '-disabled' : '')}
			data-cmdlink={cmdlink}
			data-domid={domId}
		>
			<div className={'ctxmenu-content'} onClick={onMenuItemClickAction} data-cmdlink={cmdlink}>
				<div className="content-prevtags" style={{ display: nowMenuItem.isHidePrevTag ? 'none' : 'flex' }}>
					{nowMenuItem.checked ? <CheckTagsMemo /> : <IconTagsMemo iconClassName={nowMenuItem.iconClassName} />}
				</div>
				<div className="content-text">
					<MenuItemContentMemo {...nowMenuItem} />
				</div>
				<div className="content-tips" style={{ display: nowMenuItem.isHideTips ? 'none' : 'flex' }}>
					<div className="content-tips-inns">{nowMenuItem.tips}</div>
				</div>
				<div className="content-exts" style={{ display: nowMenuItem.isHideExt ? 'none' : 'flex' }}>
					{isCreateSubMenu ? <i className="ctxmenu-exts-icon" /> : null}
				</div>
			</div>
			{createSubMenu
				? createSubMenu({
						domId,
						panelMaxHeight,
						commanLink: cmdlink,
						subMenuItems: nowMenuItem.subMenu || [],
						isSubMenu: true,
						onClickAction: onClickAction,
				  })
				: null}
		</li>
	)
}

export const MenuItemMemo = React.memo(MenuItem)
