import React, { useEffect, useState, useRef, useCallback } from 'react'
import contextmenuData from './config'
import styles from '../index.module.less'
import { TContextMenuItem } from '../../../../componnet/contextmenu/types/type'
import { EContextMenuType } from '../../../../componnet/contextmenu/config/enum'
import { ContextMenu } from '../../../../componnet/contextmenu'

function ContextmenuNoraml(props: any): React.ReactElement {
	const elementRef: { current: any } = useRef<HTMLElement>(null)

	const onContextmenuAction = useCallback((e: React.MouseEvent): void => {
		e.preventDefault()
		e.stopPropagation()
		const menuData: Array<TContextMenuItem> = JSON.parse(JSON.stringify(contextmenuData))
		/* ... */
		menuData[menuData.length - 1].iconClassName = styles['icon-demo']
		/* ... */
		// menuData.push({ type: EContextMenuType.SEPARATOR })
		// for (let i: number = 0; i < 50; i++) {
		// 	menuData.push({ title: `ContextmenuItem ${i}`, cmd: `contextmenu${i}` })
		// }
		menuData[9].subMenu?.push({ type: EContextMenuType.SEPARATOR })
		for (let i: number = 0; i < 50; i++) {
			menuData[9].subMenu?.push({ title: `ContextmenuItem ${i}`, cmd: `contextmenu${i}` })
		}
		/* ... */
		ContextMenu.open({
			data: menuData,
			// panelAlignment: EContextPanelAlignment.RIGHT_TOP,
			// panelMaxHeight: 300,
			position: { x: e.clientX, y: e.clientY },
			onClick(menuItem: TContextMenuItem, e: React.MouseEvent): boolean | void {
				console.log(menuItem, e)
				if (menuItem.cmd === 'refresh') {
					window.location.reload()
					// 返回 false 将屏蔽右键菜单的自动关闭功能
					// return false
				}
			},
			onEnterConfirm(cmdlink: Array<string>) {
				console.log(cmdlink)
			},
			onKeydown(e: KeyboardEvent, unmount: () => void): void {
				e.stopPropagation()
				if (e.shiftKey && e.keyCode === 81) {
					// Shift + Q
					console.log(`按下了 [Shift + Q] 组合键`)
					unmount()
					return
				}
				if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode === 86) {
					// Shift + Q
					console.log(`按下了 [V] 键`)
					unmount()
					return
				}
			},
			onKeyup(e: KeyboardEvent, unmount: () => void): void {
				e.stopPropagation()
				console.log(e)
			},
		})
	}, [])

	return (
		<section style={{ padding: `5px 5px 5px 5px`, height: '100%' }}>
			<div ref={elementRef} style={{ width: '100%', height: '100%', backgroundColor: '#efefef' }} onContextMenu={onContextmenuAction}>
				<span>灰色矩形区域内右键唤起右键菜单</span>
			</div>
		</section>
	)
}

export default React.memo(ContextmenuNoraml)
