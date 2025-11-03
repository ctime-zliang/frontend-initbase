import React, { useReducer } from 'react'
import { contextReducer, defaultValue, LocalContext, TStore } from './contextManager'
import Child1Root from './child1'

function Parent1Root(props: any): React.ReactElement {
	console.log(`Component: Parent1Root`)
	const [state, dispatch] = useReducer(contextReducer, defaultValue)
	const contextProviderValue: TStore = { state, dispatch }
	return (
		<>
			<h2>Test Group2</h2>
			<LocalContext.Provider value={contextProviderValue}>
				<Child1Root />
			</LocalContext.Provider>
		</>
	)
}

export default Parent1Root
