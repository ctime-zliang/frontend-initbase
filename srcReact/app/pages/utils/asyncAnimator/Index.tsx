import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { AsyncAnimator } from 'srcReact/app/utils/AsyncAnimator'
import { createAnimators01, test01 } from './test01'

function AsyncAnimatorRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Async Animator`
	const boxElementRef: { current: HTMLDivElement } = useRef<HTMLDivElement>(null!)
	const dataHandlerRef: { current: { animators: Array<AsyncAnimator> } } = useRef<{ animators: Array<AsyncAnimator> }>({
		animators: [],
	})
	const onBoxElementClickAction = (): void => {
		dataHandlerRef.current.animators = createAnimators01(boxElementRef.current)
		test01(dataHandlerRef.current.animators)
	}
	useEffect((): (() => void) => {
		return (): void => {
			if (dataHandlerRef.current && dataHandlerRef.current.animators) {
				for (let i: number = 0; i < dataHandlerRef.current.animators.length; i++) {
					dataHandlerRef.current.animators[i].cancel()
				}
			}
		}
	}, [])
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<div>点击绿色圆面 执行序列动画</div>
				<div
					ref={boxElementRef}
					style={{
						position: `absolute`,
						left: `150px`,
						top: `100px`,
						width: `50px`,
						height: `50px`,
						borderRadius: `50%`,
						background: `#00cc88`,
						lineHeight: `50px`,
						textAlign: `center`,
					}}
					onClick={onBoxElementClickAction}
				></div>
			</section>
		</>
	)
}

export const AsyncAnimatorRootMemo = React.memo(AsyncAnimatorRoot)
