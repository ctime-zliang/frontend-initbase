import React from 'react'
import { UseWatchMain } from './modules/UseWatchMain'
import { UseProxyDependenciesMain } from './modules2/UseProxyDependenciesMain'
import { Helmet } from 'react-helmet-async'

export function WatchStoreRoot2(): React.ReactElement {
	const MODULE_NAME: string = `WatchStore`
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				{/* <UseWatchMain /> */}
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<UseProxyDependenciesMain />
			</section>
		</>
	)
}
