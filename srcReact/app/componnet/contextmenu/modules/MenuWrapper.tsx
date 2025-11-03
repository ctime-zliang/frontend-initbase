import React from 'react'
import { CMDLINK_DIVISION_TAG } from '../config/config'
import { EContextMenuType } from '../config/enum'
import { TContextMenuItem, TMenuWrapperProps } from '../types/type'
import MenuItem from './MenuItem'
import Separator from './Separator'

function MenuWrapper(props: TMenuWrapperProps): React.ReactElement {
	const { domId, panelMaxHeight, commanLink = undefined, subMenuItems = [], isSubMenu = false, onClickAction } = props
	return (
		<main className={isSubMenu ? 'ctxmenu-wrapper' : 'ctxmenu-wrapper ctxmenu-show-menu'} style={{ maxHeight: panelMaxHeight + 'px' }}>
			<ul className="ctxmenu-ulist" data-itemtype="ctxmenu-ulist">
				{subMenuItems.map((menuItem: TContextMenuItem, index: number): React.ReactElement => {
					const cmdlink: string = commanLink ? commanLink + CMDLINK_DIVISION_TAG + menuItem.cmd : (menuItem.cmd as string)
					if (Array.isArray(menuItem.subMenu)) {
						return (
							<MenuItem
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
						return <Separator key={index} menuItem={menuItem} />
					}
					return (
						<MenuItem
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

export default React.memo(MenuWrapper)
