import React from 'react'
import { TContextMenuItem } from '../types/type'

export type TContextMenuItemContentProps = TContextMenuItem

function MenuItemContent(props: TContextMenuItemContentProps): React.ReactElement {
	if (props.isSetContentJSX) {
		return <>{props.title}</>
	}
	if (props.isSetContentHtml) {
		return <div dangerouslySetInnerHTML={{ __html: (props.title || '') as string }}></div>
	}
	return <div className="content-text-inns">{props.title as string}</div>
}

export const MenuItemContentMemo = React.memo(MenuItemContent)
