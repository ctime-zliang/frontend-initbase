import React, { useEffect, useRef, useState } from 'react'
import { TCombineState } from '../../../../../../store/redux'
import { ACTION_TYPE as counter_ACTION_TYPE } from '../../store/counter/types'
import { TStore as counter_TStore } from '../../store/counter/types'
import { ACTION_TYPE as timeStamp_ACTION_TYPE } from '../../store/timeStamp/types'
import { TStore as timeStamp_TStore } from '../../store/timeStamp/types'
import ReduxView from '../../components/view'

type TTCombineExtendState = TCombineState & {
	counter: counter_TStore
	timeStamp: timeStamp_TStore
}

function ReduxContainer1(props: any): React.ReactElement {
	const { reduxStore } = props
	const combineState: TTCombineExtendState = reduxStore.getState()
	const subscribeHandler: { current: any } = useRef<any>(null)
	const [count, setCount] = useState<number>(combineState.counter.count)
	const [stamp, setStamp] = useState<number>(combineState.timeStamp.stamp)
	const changeCountAction = (): void => {
		reduxStore.dispatch({
			type: counter_ACTION_TYPE.MODIFY_COUNTER,
			data: null,
		})
	}
	const changeStampAction = (): void => {
		reduxStore.dispatch({
			type: timeStamp_ACTION_TYPE.CHANGE_STAMP,
			data: { stamp: new Date().getTime() },
		})
	}

	useEffect((): (() => void) => {
		subscribeHandler.current = reduxStore.subscribe((): void => {
			const newCombineStore: TCombineState = reduxStore.getState()
			setCount(newCombineStore.counter.count)
			setStamp(newCombineStore.timeStamp.stamp)
		})
		return (): void => {
			subscribeHandler.current()
		}
	}, [])

	return <ReduxView count={count} stamp={stamp} changeCountAction={changeCountAction} changeStampAction={changeStampAction} />
}

export default ReduxContainer1
