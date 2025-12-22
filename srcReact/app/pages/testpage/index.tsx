import { TCommonComponentBaseProps } from '../../types/comm.types'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import InsertList from './insertList/Index'
import { Helmet } from 'react-helmet-async'
import { MatrixTest } from './matrix/Index'

function TestPageMain(props: TCommonComponentBaseProps): React.ReactElement {
	const MODULE_NAME: string = `Test Page`
	useEffect((): void => {
		console.log('===>>>> Test Page Common Mounted.')
	}, [])
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<MatrixTest />
			</section>
		</>
	)
}
export const TestPageMainMemo = React.memo(TestPageMain)
