import React from 'react'
import useDervStore, { Store } from '../../../../utils/hooks/useDervStore'

type TModuleState = {
	counter: number
}
type TSetCounterActionParams = {
	newCounter: number
}
type TModuleActions = {
	setCounter: (payload: TSetCounterActionParams) => void
}

const initialState = {
	counter: 0,
}
const actions = {
	setCounter(store: Store<TModuleState, TModuleActions>, data: TSetCounterActionParams): void {
		store.setState({ counter: data.newCounter + store.state.counter })
	},
}

const useHook = useDervStore<TModuleState, TModuleActions>(initialState, actions)

function TestModules01(props: any): React.ReactElement {
	const [state, action] = useHook()
	const clickAction = (): void => {
		// action.setCounter({ kkk: 1 })
		action.setCounter({ newCounter: Math.random() })
	}
	return (
		<div>
			<p>
				counter:
				{state.counter}
			</p>
			<button type="button" onClick={clickAction}>
				Click Button
			</button>
		</div>
	)
}

export default TestModules01
