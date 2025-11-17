import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'

function ConcurrencyControlRoot(props: any): React.ReactElement {
	useEffect((): void => {
		test01()
	}, [])
	return (
		<>
			<Helmet>
				<title>Concurrency Control</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>Concurrency Control</section>
		</>
	)
}

export const ConcurrencyControlRootMemo = React.memo(ConcurrencyControlRoot)
