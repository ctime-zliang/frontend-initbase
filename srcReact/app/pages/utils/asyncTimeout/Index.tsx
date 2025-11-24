import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { test01 } from './test01'
import { Button } from 'antd'

function AsyncTimeoutRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Async Timeout`
	const onBtnClickAction = (): void => {
		test01()
	}
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<Button type="primary" onClick={onBtnClickAction}>
					测试按钮
				</Button>
			</section>
		</>
	)
}

export const AsyncTimeoutRootMemo = React.memo(AsyncTimeoutRoot)
