import React from 'react'
import './index.less'
import { Layout } from 'antd'

export function PageContentRoot(props: Partial<any>): React.ReactElement {
	// console.log(`PageContentRoot ☆☆☆`, props)
	return (
		<Layout className="app-page-content">
			<Layout.Content>{props.children}</Layout.Content>
		</Layout>
	)
}
