import React from 'react'
import ReactDOM from 'react-dom'

type TReactClassComponentProps = {
	children: React.Component | Array<React.Component> | any
	[key: string]: any
}

class Overlay extends React.Component {
	state: Readonly<{}>
	props: TReactClassComponentProps
	container: HTMLElement
	constructor(props: TReactClassComponentProps) {
		super(props)
		this.state = {}
		this.container = document.createElement('section')
		document.body.appendChild(this.container)
	}

	componentDidMount(): void {
		console.log(this.container)
	}

	componentWillUnmount(): void {
		document.body.removeChild(this.container)
	}

	render(): React.ReactElement {
		return ReactDOM.createPortal(
			<>
				<div data-tagitem="OverlayContainer">{this.props.children}</div>
			</>,
			this.container
		)
	}
}

export default Overlay
