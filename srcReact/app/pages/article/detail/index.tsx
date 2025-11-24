import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function ArticleDetailRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Article Detail`
	const location = useLocation()
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<section>{window.location.href}</section>
				<section>{JSON.stringify(location)}</section>
			</section>
		</>
	)
}

export const ArticleDetailRootMemo = React.memo(ArticleDetailRoot)
