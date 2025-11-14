import React from 'react'
import Overlay from '../../../utils/hoc/overlay/overlay'

function OverlayTestRoot(props: any): React.ReactElement {
	return (
		<>
			<Overlay>
				<div>Overlay Component Call In App</div>
			</Overlay>
		</>
	)
}

export default OverlayTestRoot
