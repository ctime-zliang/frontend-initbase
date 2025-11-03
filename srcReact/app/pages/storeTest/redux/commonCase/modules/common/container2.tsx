import React, { useEffect, useRef, useState } from 'react'
import { connect, Provider } from 'react-redux'
import { ACTION_TYPE as counter_ACTION_TYPE } from '../../store/counter/types'
import { TStore as counter_TStore } from '../../store/counter/types'
import { ACTION_TYPE as timeStamp_ACTION_TYPE } from '../../store/timeStamp/types'
import { TStore as timeStamp_TStore } from '../../store/timeStamp/types'
import { changeCountAction } from '../../store/counter/actions'
import { changeStampAction } from '../../store/timeStamp/actions'
import { TCombineState } from '../../../../../../store/redux'
import ReduxView from '../../components/view'

type TTCombineExtendState = TCombineState & {
	counter: counter_TStore
	timeStamp: timeStamp_TStore
}

type TReduxWrapper1State = {
	count: number
	stamp: number
	btnLoading: boolean
}

type TReduxWrapper1Dispatch = {
	changeCountAction: (...args: Array<any>) => void
	changeStampAction: (...args: Array<any>) => void
}

type TReduxWrapper1Props = TReduxWrapper1State & TReduxWrapper1Dispatch

const mapStateToProps = (combineState: TTCombineExtendState): TReduxWrapper1State => {
	return {
		count: combineState.counter.count,
		stamp: combineState.timeStamp.stamp,
		btnLoading: combineState.timeStamp.isLoading,
	}
}

const mapActionsToProps = {
	changeCountAction,
	changeStampAction,
}

// const mapDispatchToProps = (dispatch: any): TReduxWrapper1Dispatch => {
// 	return {
// 		changeCountAction(params: any): void {
// 			console.log(params)
// 			dispatch({
// 				type: counter_ACTION_TYPE.MODIFY_COUNTER,
// 				data: null,
// 			})
// 		},
// 		async changeStampAction(params: any): Promise<void> {
// 			console.log(params)
// 			dispatch({
// 				type: timeStamp_ACTION_TYPE.SETTING_BTN_LOADIG,
// 				data: { isLoading: true },
// 			})
// 			await sleep(1500)
// 			dispatch({
// 				type: timeStamp_ACTION_TYPE.CHANGE_STAMP,
// 				data: { stamp: new Date().getTime() },
// 			})
// 			dispatch({
// 				type: timeStamp_ACTION_TYPE.SETTING_BTN_LOADIG,
// 				data: { isLoading: false },
// 			})
// 		},
// 	}
// }

function ReduxWrapper1(props: TReduxWrapper1Props) {
	const { count, stamp, btnLoading, changeCountAction, changeStampAction } = props
	return (
		<ReduxView count={count} btnLoading={btnLoading} stamp={stamp} changeCountAction={changeCountAction} changeStampAction={changeStampAction} />
	)
}

const ReduxContainer2 = connect(mapStateToProps, mapActionsToProps)(ReduxWrapper1)

export default ReduxContainer2
