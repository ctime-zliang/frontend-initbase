import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'

function SetMessageTimeoutRoot(props: any): React.ReactElement {
	useEffect((): void => {
		test01()
	}, [])
	return (
		<>
			<Helmet>
				<title>SetMessageTimeout</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>SetMessageTimeout</section>
		</>
	)
}

export const SetMessageTimeoutRootMemo = React.memo(SetMessageTimeoutRoot)
