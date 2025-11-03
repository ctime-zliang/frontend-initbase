import React, { useEffect, useState, useLayoutEffect } from 'react'

function AAA(props: any): React.ReactElement {
	useLayoutEffect((): (() => void) => {
		console.log('AAA: useLayoutEffect')
		return (): void => {
			console.log('AAA: useLayoutEffect - return')
		}
	}, [])
	return <div>AAA</div>
}

export function HookUseLayoutEffect(props: any): React.ReactElement {
	console.log(`Component: HookUseLayoutEffect`)
	const [count, setCount] = useState(0)
	useEffect((): void => {
		console.log('HookUseLayoutEffect: useEffect')
		console.log(document.querySelector('#useLayoutEffectView'))
		console.log(document.getElementById('useLayoutEffectView')?.innerHTML)
	}, [])

	useLayoutEffect((): void => {
		console.log('HookUseLayoutEffect: useLayoutEffect')
		console.log(document.querySelector('#useLayoutEffectView'))
		console.log(document.getElementById('useLayoutEffectView')?.innerHTML)
	}, [])
	return (
		<div>
			<div id="useLayoutEffectView">{count}</div>
			<button
				onClick={(): void => {
					setCount(count + 1)
				}}
			>
				Click
			</button>
			{count <= 1 ? <AAA /> : null}
		</div>
	)
}
