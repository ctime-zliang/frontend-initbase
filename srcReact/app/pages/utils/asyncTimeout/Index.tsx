import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'

function AsyncTimeoutRoot(props: any): React.ReactElement {
	useEffect((): void => {
		test01()
	}, [])
	return (
		<>
			<Helmet>
				<title>Async Timeout</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>Async Timeout</section>
		</>
	)
}

export const AsyncTimeoutRootMemo = React.memo(AsyncTimeoutRoot)
