import React from 'react'
import { Helmet } from 'react-helmet-async'

function Error404Root(props: any): React.ReactElement {
	console.log(`Error404Root ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Article Error 404</title>
			</Helmet>
			<section>Article Error 404</section>
		</>
	)
}

export default React.memo(Error404Root)
