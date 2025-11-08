import React from 'react'
import { PageHeaderRoot } from '../layout/pageHeader'
import { PageFooterRoot } from '../layout/pageFooter'
import { PageContentRoot } from '../layout/pageContent'
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
