import React from 'react'
import Overlay from '../../../utils/hoc/overlay/overlay'

function OverlayTestRoot(props: any): React.ReactElement {
	console.log(`OverlayTestRoot ☆☆☆`, props)
	return (
		<>
			<Overlay>
				<div>Overlay Component Call In App</div>
			</Overlay>
		</>
	)
}

export default OverlayTestRoot
