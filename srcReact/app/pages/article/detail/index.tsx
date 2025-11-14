import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function ArticleDetailRoot(props: any): React.ReactElement {
	const location = useLocation()
	console.log(location)
	return (
		<>
			<Helmet>
				<title>Article Detail</title>
			</Helmet>
			<section>Article Detail</section>
			<section>{window.location.href}</section>
			<section>{JSON.stringify(location)}</section>
		</>
	)
}

export const ArticleDetailRootMemo = React.memo(ArticleDetailRoot)
