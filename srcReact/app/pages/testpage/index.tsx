import { TCommonComponentBaseProps } from '../../types/comm.types'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import InsertList from './insertList/Index'

function TestPageMain(props: TCommonComponentBaseProps): React.ReactElement {
	useEffect((): void => {
		console.log('===>>>> Test Page Common Mounted.')
	}, [])
	return (
		<section style={{ padding: `10px 10px` }}>
			<h2 style={{ padding: `10px 10px`, margin: 0 }}>Test Page Common</h2>
			<InsertList />
		</section>
	)
}
export const TestPageMainMemo = React.memo(TestPageMain)
