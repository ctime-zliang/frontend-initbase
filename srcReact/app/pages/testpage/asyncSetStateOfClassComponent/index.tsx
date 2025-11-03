import React from 'react'

class Compt1 extends React.Component {
	public state: { [key: string]: any } = {
		index: 0,
	}
	constructor(props: any) {
		super(props)
	}

	componentDidMount() {
		this.setState(
			{
				index: this.state.index + 1,
			},
			(): void => {
				console.log(`object 1`, this.state.index)
			}
		)
		this.setState(
			{
				index: this.state.index + 1,
			},
			(): void => {
				console.log(`object 2`, this.state.index)
			}
		)
	}

	public render() {
		return (
			<>
				<div>I am Compt1</div>
				<div>Index is {this.state.index}</div>
			</>
		)
	}
}

class Compt2 extends React.Component {
	public state: { [key: string]: any } = {
		index: 0,
	}
	constructor(props: any) {
		super(props)
	}

	componentDidMount() {
		this.setState(
			(preState: { [key: string]: any }) => {
				return {
					index: preState.index + 1,
				}
			},
			(): void => {
				console.log(`function 1`, this.state.index)
			}
		)
		this.setState(
			(preState: { [key: string]: any }) => {
				return {
					index: preState.index + 1,
				}
			},
			(): void => {
				console.log(`function 2`, this.state.index)
			}
		)
		this.setState(
			{
				index: this.state.index + 1,
			},
			(): void => {
				console.log(`object 1`, this.state.index)
			}
		)
	}

	public render() {
		return (
			<>
				<div>I am Compt2</div>
				<div>Index is {this.state.index}</div>
			</>
		)
	}
}

export function Wrapper(props: any) {
	return (
		<>
			<Compt1 />
			<Compt2 />
		</>
	)
}
