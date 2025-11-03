import React, { useContext, useState } from 'react'
import { defaultValue, LocalContext } from './contextManager'

function Child1Root(props: any): React.ReactElement {
	console.log(`Component: Child1Root`)
	const { state, dispatch } = useContext(LocalContext)
	const changeNumberAction = (): void => {
		if (dispatch) {
			dispatch({ type: 'INCREASE_NUMBER' })
		}
	}
	return (
		<>
			<div>
				<strong>Child 1</strong>
			</div>
			<div>The name is {state.name}</div>
			<div>The number is {state.number}</div>
			<div>
				<button onClick={changeNumberAction}>Change Number</button>
			</div>
		</>
	)
}

export default React.memo(Child1Root)
