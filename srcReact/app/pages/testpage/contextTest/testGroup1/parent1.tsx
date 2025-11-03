import React, { useState } from 'react'
import { defaultValue, LocalContext, TStore } from './contextManager'
import Child1Root from './child1'
import Child2Root from './child2'
import Child3Root from './child3'

function Parent1Root(props: any): React.ReactElement {
	console.log(`Component: Parent1Root`)
	const [name, setName] = useState<string>(defaultValue.name)
	const [number, setNumber] = useState<number>(defaultValue.number)
	const contextProviderValue: TStore = { name, number, setName, setNumber }
	return (
		<>
			<h2>Test Group1</h2>
			<LocalContext.Provider value={contextProviderValue}>
				<Child1Root />
				<Child2Root />
				<Child3Root />
			</LocalContext.Provider>
		</>
	)
}

export default Parent1Root
