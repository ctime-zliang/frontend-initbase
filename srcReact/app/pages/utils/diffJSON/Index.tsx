import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'

function DiffJSONRoot(props: any): React.ReactElement {
	useEffect((): void => {
		test01()
	}, [])
	return (
		<>
			<Helmet>
				<title>Diff JSON</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>Diff JSON</section>
		</>
	)
}

export const DiffJSONRootMemo = React.memo(DiffJSONRoot)
