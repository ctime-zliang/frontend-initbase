import React from 'react'
import { PageContentRoot } from './pageContent'
import { PageHeaderRoot } from './pageHeader'
import { PageFooterRoot } from './pageFooter'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Layout(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Layout ☆☆☆`, props)
	return (
		<>
			<PageHeaderRoot {...props} />
			<PageContentRoot {...props}>{props.children}</PageContentRoot>
			<PageFooterRoot {...props} />
		</>
	)
}

export const LayoutMemo = React.memo(Layout)
