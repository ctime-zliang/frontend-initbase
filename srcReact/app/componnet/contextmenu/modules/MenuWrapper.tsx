import React, { MemoExoticComponent } from 'react'
import { CMDLINK_DIVISION_TAG, EContextMenuType } from '../config/config'
import { TContextMenuItem, TContextMenuItemExtend } from '../types/type'
import { MenuItemMemo } from './MenuItem'
import { SeparatorMemo } from './Separator'

export type TMenuWrapperProps = {
	domId: string
	panelMaxHeight: number
	commanLink?: string
	subMenuItems?: Array<TContextMenuItem>
	onClickAction?: (a: TContextMenuItemExtend, e: React.MouseEvent) => void
	isSubMenu?: boolean
}

function MenuWrapper(props: TMenuWrapperProps): React.ReactElement {
	const { domId, panelMaxHeight, commanLink = undefined, subMenuItems = [], isSubMenu = false, onClickAction } = props
	return (
		<main className={isSubMenu ? 'ctxmenu-wrapper' : 'ctxmenu-wrapper ctxmenu-show-menu'} style={{ maxHeight: panelMaxHeight + 'px' }}>
			<ul className="ctxmenu-ulist" data-itemtype="ctxmenu-ulist">
				{subMenuItems.map((menuItem: TContextMenuItem, index: number): React.ReactElement => {
					const cmdlink: string = commanLink ? commanLink + CMDLINK_DIVISION_TAG + menuItem.cmd : (menuItem.cmd as string)
					if (Array.isArray(menuItem.subMenu)) {
						return (
							<MenuItemMemo
								panelMaxHeight={panelMaxHeight}
								domId={domId}
								key={index}
								commanLink={cmdlink}
								nowMenuItem={menuItem}
								isCreateSubMenu={true}
								onClickAction={onClickAction}
								createSubMenu={MenuWrapper}
							/>
						)
					}
					if (menuItem['type'] === EContextMenuType.SEPARATOR) {
						return <SeparatorMemo key={index} menuItem={menuItem} />
					}
					return (
						<MenuItemMemo
							panelMaxHeight={panelMaxHeight}
							domId={domId}
							commanLink={cmdlink}
							key={index}
							nowMenuItem={menuItem}
							isCreateSubMenu={false}
							onClickAction={onClickAction}
						/>
					)
				})}
			</ul>
		</main>
	)
}

export const MenuWrapperMemo = React.memo(MenuWrapper)
