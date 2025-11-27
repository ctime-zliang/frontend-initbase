import React from 'react'
import { TContextMenuItem } from '../types/type'

export type TSeparatorProps = {
	menuItem: TContextMenuItem
}

function Separator(props: TSeparatorProps): React.ReactElement {
	return <li className={'ctxmenu-separator'} data-itemtype="ctxmenu-separator"></li>
}

export const SeparatorMemo = React.memo(Separator)
