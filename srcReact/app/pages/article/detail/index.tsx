import React from 'react'
import { Helmet } from 'react-helmet-async'

function DetailRoot(props: any): React.ReactElement {
	console.log(`DetailRoot ☆☆☆`, props)
	const { list } = props
	return (
		<>
			<Helmet>
				<title>Article Detail</title>
			</Helmet>
			<section>Article Detail</section>
			<section>{window.location.href}</section>
		</>
	)
}

export default React.memo(DetailRoot)
