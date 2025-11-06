/*
	https://www.zhihu.com/question/444068787?utm_source=wechat_session&utm_medium=social&utm_oi=558264416135741440&utm_content=group3_supplementQuestions&utm_campaign=shareopn
 */

import React, { useEffect, useImperativeHandle, useState, useRef, useMemo, useCallback } from 'react'
import { TCommonComponentBaseProps } from '../../../types/comm.types'
import { useReactive } from '../../../utils/hooks/useReactive/useReactive'

export function Parent(props: TCommonComponentBaseProps): React.ReactElement {
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	const clickAction = (): void => {
		setCount(count + 1)
	}
	return (
		<div>
			<div>我是父组件</div>
			<div>父组件的 count 是 {count}</div>
			<button onClick={clickAction}>Parent Btn</button>
			<Child count={count} />
			<Child2 count={count} ref={ref} />
			<Child3 count={count} />
		</div>
	)
}

export const Child = React.memo(({ count }: any): React.ReactElement => {
	const [number, setNumber] = useState(0)
	const clickAction = (): void => {
		setNumber(number + 1)
	}
	useEffect((): void => {
		setNumber(count)
	}, [count])

	console.log('子组件 1 render')
	return (
		<div>
			<div>我是子组件一</div>
			<div>子组件的 number 是 {number}</div>
			<button onClick={clickAction}>Child1 Btn</button>
		</div>
	)
})

export const Child2 = React.forwardRef((props: any, ref): React.ReactElement => {
	const [number, setNumber] = useState(0)
	const clickAction = (): void => {
		setNumber(number + 1)
	}
	useImperativeHandle(
		ref,
		() => {
			return {
				update(n: any) {
					setNumber(n)
				},
			}
		},
		[]
	)

	console.log('子组件 2 render')
	return (
		<div>
			<div>我是子组件二</div>
			<div>子组件的 number 是{number}</div>
			<div>父组件传进来的 count 是{props.count}</div>
			<button onClick={clickAction}>Child2 Btn</button>
		</div>
	)
})

export const Child3 = React.memo(({ count }: any): React.ReactElement => {
	const reactive = useReactive(count)
	const clickAction = (): void => {
		reactive.update(reactive.value + 1)
		reactive.render()
	}
	// useEffect((): void => {
	// 	reactive.update(count)
	// }, [count])
	useMemo((): void => {
		reactive.update(count)
	}, [count])

	console.log('子组件 3 render', reactive)
	return (
		<div>
			<div>我是子组件三</div>
			<div>子组件的 number 是 {reactive.value}</div>
			<button onClick={clickAction}>Child3 Btn</button>
		</div>
	)
})
