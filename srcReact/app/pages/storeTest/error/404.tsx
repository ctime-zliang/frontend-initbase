import React from 'react'
import { Helmet } from 'react-helmet-async'

function Error404Root(props: any): React.ReactElement {
	console.log(`Error404Root ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Store Test Error 404</title>
			</Helmet>
			<section>Store Test Error 404</section>
		</>
	)
}

export default React.memo(Error404Root)
