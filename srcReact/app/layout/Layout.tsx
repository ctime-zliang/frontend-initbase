import React from 'react'
import { PageContentRoot } from './pageContent/Index'
import { PageHeaderRoot } from './pageHeader/Index'
import { PageFooterRoot } from './pageFooter/Index'

function Layout(props: Partial<any>): React.ReactElement {
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
