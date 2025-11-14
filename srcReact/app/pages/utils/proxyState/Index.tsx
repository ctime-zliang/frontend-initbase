import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'
import { nextFrameTick } from 'srcReact/app/utils/utils'

function ProxyStateRoot(props: any): React.ReactElement {
	useEffect((): void => {
		console.log('%c >>>>>> Proxy State Test', 'background: #41b883; color: #fff; border-radius: 3px;')
		test01()
		nextFrameTick((): void => {
			console.log('%c Proxy State Test <<<<<<', 'background: #41b883; color: #fff; border-radius: 3px;')
		})
	}, [])
	return (
		<>
			<Helmet>
				<title>Proxy State</title>
			</Helmet>
			<section style={{ padding: `10px 10px` }}>Proxy State</section>
		</>
	)
}

export const ProxyStateRootMemo = React.memo(ProxyStateRoot)
