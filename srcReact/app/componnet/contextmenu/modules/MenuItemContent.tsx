import React from 'react'
import { TContextMenuItemContentProps } from '../types/type'

function MenuItemContent(props: TContextMenuItemContentProps): React.ReactElement {
	if (props.isSetContentJSX) {
		return <>{props.title}</>
	}
	if (props.isSetContentHtml) {
		return <div dangerouslySetInnerHTML={{ __html: (props.title || '') as string }}></div>
	}
	return <div className="content-text-inns">{props.title as string}</div>
}

export default React.memo(MenuItemContent)
