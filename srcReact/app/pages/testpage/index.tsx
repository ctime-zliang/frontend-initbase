import { TCommonComponentBaseProps } from '../../types/comm.types'
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import InsertList from './insertList/Index'

function TestPageMain(props: TCommonComponentBaseProps): React.ReactElement {
	useEffect((): void => {
		console.log('===>>>> Test Page Common Mounted.')
	}, [])
	return (
		<>
			<div>Test Page Common</div>
			<InsertList />
		</>
	)
}
export const TestPageMainMemo = React.memo(TestPageMain)
