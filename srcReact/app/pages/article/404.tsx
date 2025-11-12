import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

function Error404Root(props: any): React.ReactElement {
	console.log(`Error404Root ☆☆☆`, props)
	return (
		<section style={{ padding: `10px 10px` }}>
			<Helmet>
				<title>Article Error 404</title>
			</Helmet>
			<section
				style={{
					width: '100%',
					textAlign: 'center',
					padding: '100px 0',
				}}
			>
				<h2>Article Error 404</h2>
				<div style={{ textAlign: 'center' }}>
					<Link to={`/`}>Link to Home Page</Link>
				</div>
			</section>
		</section>
	)
}

export const Error404RootMemo = React.memo(Error404Root)
