import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'

function ProxyStateRoot(props: any): React.ReactElement {
	useEffect((): void => {
		test01()
	}, [])
	return (
		<>
			<Helmet>
				<title>Proxy State</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>Proxy State</section>
		</>
	)
}

export const ProxyStateRootMemo = React.memo(ProxyStateRoot)
