import React from 'react'
import ReduxContainer1 from './modules/common/container1'
import ReduxContainer2 from './modules/common/container2'

function Main(props: any): React.ReactElement {
	return (
		<>
			<ReduxContainer1 {...props} />
			<ReduxContainer2 {...props} />
		</>
	)
}
export default React.memo(Main)
