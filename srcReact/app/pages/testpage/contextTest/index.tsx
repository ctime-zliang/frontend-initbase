import React from 'react'
import Group1Parent1Root from './testGroup1/parent1'
import Group2Parent1Root from './testGroup2/parent1'

function ContexTestRoot(props: any): React.ReactElement {
	return (
		<>
			<Group1Parent1Root />
			<Group2Parent1Root />
		</>
	)
}

export default ContexTestRoot
