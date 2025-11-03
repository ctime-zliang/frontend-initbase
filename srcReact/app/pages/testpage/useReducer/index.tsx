import React, { useState, useMemo, useReducer } from 'react'

type TInitialState = {
	count: number
}

const initialState: TInitialState = {
	count: 0,
}

export function ReducerComponent(props: any): React.ReactElement {
	const [state, dispatch] = useReducer((state: TInitialState, action: { type: string }): TInitialState => {
		switch (action.type) {
			case 'increment':
				return { count: state.count + 1 }
			case 'decrement':
				return { count: state.count - 1 }
			default:
				throw new Error()
		}
	}, initialState)
	return (
		<div>
			<button
				onClick={() => {
					dispatch({ type: 'increment' })
				}}
			>
				Set Count
			</button>
			<div>{state.count}</div>
		</div>
	)
}
