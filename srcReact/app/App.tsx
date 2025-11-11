import React from 'react'
import { Helmet } from 'react-helmet-async'
import './assets/style/prefix.less'
import '../../node_modules/antd/dist/antd.css'
import favicon from './assets/images/log.jpg'
import { TCommonComponentBaseProps } from './types/comm.types'
import { RootMemo } from './layout/Root'
import styled from 'styled-components'

const Container = styled.section`
	display: flex;
	flex-drection: column;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	flex-wrap: nowrap;
`

export default function App(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`App ☆☆☆`, props)
	const __app_id__: number = Math.random()
	return (
		<Container data-tagitem="React-App" className="react-app">
			<Helmet link={[{ rel: 'icon', type: 'image/jpg', href: favicon }]}>
				<title>React Application</title>
			</Helmet>
			<RootMemo __AppProps__={{ __app_id__ }} {...props} />
		</Container>
	)
}
