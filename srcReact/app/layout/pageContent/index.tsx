import React from 'react'
import './index.less'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { Layout } from 'antd'

export function PageContentRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageContentRoot ☆☆☆`, props)
	return (
		<Layout className="app-page-content">
			<Layout.Content>{props.children}</Layout.Content>
		</Layout>
	)
}
