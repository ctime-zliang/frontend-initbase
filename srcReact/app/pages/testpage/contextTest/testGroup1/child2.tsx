import React, { useContext } from 'react'
import { LocalContext } from './contextManager'

function Child2Root(props: any): React.ReactElement {
	console.log(`Component: Child2Root`)
	const { setName } = useContext(LocalContext)
	const changeNameAction = (): void => {
		if (setName) {
			setName((preValue): string => {
				return preValue + 1
			})
		}
	}
	return (
		<LocalContext.Consumer>
			{({ name, number }) => {
				return (
					<>
						<div>
							<strong>Child 2</strong>
						</div>
						<div>The name is {name}</div>
						<div>
							<button onClick={changeNameAction}>Change Name</button>
						</div>
					</>
				)
			}}
		</LocalContext.Consumer>
	)
}

export default React.memo(Child2Root)
