import React, { useState, useEffect, useRef } from 'react'

export function UseRef1(): React.ReactElement {
	console.log('Component: UseRef1')
	const [count, setCount] = useState<number>(0)
	const ref = useRef<any>(null)
	ref.current = count
	useEffect((): void => {
		window.setInterval((): void => {
			setCount(ref.current + 1)
		}, 500)
	}, [])
	return (
		<article>
			<div>{count}</div>
		</article>
	)
}

export function UseRef2(): React.ReactElement {
	console.log('Component: UseRef2')
	const ref = useRef<any>(null)
	const clickAction = (): void => {
		console.log(ref.current)
	}
	return (
		<article>
			<button ref={ref} onClick={clickAction}>
				Check Ref Current
			</button>
		</article>
	)
}

export function UseRef3(): React.ReactElement {
	console.log('Component: UseRef3')
	const ref = useRef<any>(null)
	const [number, setNumber] = useState<number>(0)
	const clickAction = (): void => {
		setNumber(number + 1)
		console.log(ref.current)
	}
	return (
		<article>
			<button onClick={clickAction}>Set Number({number})</button>
			{number <= 3 ? <div ref={ref}>Number 小于等于 3</div> : <section ref={ref}>Number 大于 3</section>}
		</article>
	)
}

export default function HookRefTestRoot(props: any): React.ReactElement {
	return (
		<>
			<UseRef3 />
		</>
	)
}
