import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { TBoundingClientRectResultToJSONResult, TContextMenuRootProps, TContextMenuItem } from '../types/type'
import MenuWrapper from './MenuWrapper'
import '../styles/index.less'
import { PADDING_VIEWPORT_BOTTOM, PADDING_VIEWPORT_TOP } from '../config/config'
import { EContextPanelAlignment } from '../config/enum'

function ContextMenuRoot(props: TContextMenuRootProps): React.ReactElement {
	const { domId, data, position, panelAlignment = EContextPanelAlignment.INITIAL, panelMaxHeight, unmount, onClick } = props
	const containerRef: { current: any } = useRef<HTMLElement>(null)

	const onClickAction = (menuItem: TContextMenuItem, e: React.MouseEvent): void => {
		let outClickActionRes: boolean | void = true
		if (menuItem.disabled) {
			return
		}
		if (onClick instanceof Function) {
			outClickActionRes = onClick(menuItem, e)
		}
		if ((outClickActionRes as boolean) === false) {
			return
		}
		window.setTimeout((): void => {
			unmount()
		})
	}
	const onContextmenuAction = (e: React.MouseEvent): void => {
		e.preventDefault()
	}
	const onMouseenterAction = (e: React.MouseEvent): void => {
		if (containerRef.current) {
			containerRef.current.removeAttribute('mouselave')
		}
	}
	const onMouseleaveAction = (e: React.MouseEvent): void => {
		if (containerRef.current) {
			containerRef.current.setAttribute('mouselave', 'true')
		}
	}

	useLayoutEffect((): void => {
		if (containerRef.current) {
			const menuWrapper: HTMLElement = containerRef.current.firstElementChild
			const ctxmenuRect: TBoundingClientRectResultToJSONResult = menuWrapper.getBoundingClientRect().toJSON()

			/**
			 * 修正垂直定位
			 **/
			if (panelAlignment === EContextPanelAlignment.RIGHT_TOP) {
				ctxmenuRect.top = ctxmenuRect.top - ctxmenuRect.height
				ctxmenuRect.bottom = ctxmenuRect.top + ctxmenuRect.height
			}
			if (ctxmenuRect.height >= document.documentElement.clientHeight) {
				ctxmenuRect.top = PADDING_VIEWPORT_TOP
				ctxmenuRect.height = document.documentElement.clientHeight - PADDING_VIEWPORT_TOP - PADDING_VIEWPORT_BOTTOM
				ctxmenuRect.bottom = ctxmenuRect.top + ctxmenuRect.height
			}
			if (ctxmenuRect.top + ctxmenuRect.height > document.documentElement.clientHeight) {
				ctxmenuRect.top = document.documentElement.clientHeight - ctxmenuRect.height
				ctxmenuRect.bottom = ctxmenuRect.top + ctxmenuRect.height
			}
			if (ctxmenuRect.top <= PADDING_VIEWPORT_TOP) {
				ctxmenuRect.top = PADDING_VIEWPORT_TOP
				ctxmenuRect.bottom = ctxmenuRect.top + ctxmenuRect.height
			}
			/**
			 * 修正横向定位
			 **/
			if (ctxmenuRect.left + ctxmenuRect.width > document.documentElement.clientWidth) {
				ctxmenuRect.left = document.documentElement.clientWidth - ctxmenuRect.width
				ctxmenuRect.right = ctxmenuRect.left + ctxmenuRect.width
			}

			menuWrapper.style.height = ctxmenuRect.height + 'px'
			containerRef.current.style.left = ctxmenuRect.left + 'px'
			containerRef.current.style.top = ctxmenuRect.top + 'px'
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className="ctxmenu-container"
			style={{ left: position.x + 'px', top: position.y + 'px' }}
			onMouseLeave={onMouseleaveAction}
			onMouseEnter={onMouseenterAction}
			onContextMenu={onContextmenuAction}
		>
			<MenuWrapper
				panelMaxHeight={panelMaxHeight as number}
				domId={domId}
				subMenuItems={data}
				isSubMenu={false}
				onClickAction={onClickAction}
			/>
		</div>
	)
}

export default React.memo(ContextMenuRoot)
