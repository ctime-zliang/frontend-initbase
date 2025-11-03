import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { defaultProfileFixed } from '../config/config'
import { TFixedHeightListRowItemCallStyle, TFixedHeightListScrollingCallProps, TFixedHeightListScrollingFunctionProps } from '../types/types'

export function FixedHeightListScrolling(props: TFixedHeightListScrollingCallProps): React.ReactElement {
	const globalProfile: TFixedHeightListScrollingFunctionProps = { ...defaultProfileFixed, ...props }
	const { estimatedRowHeight, containerHeight, topBufferSize, bottomBufferSize, countTotal, initContainerScrollTop, onScroll } = globalProfile
	const Component: any = (props as any).children as any

	const containerElementRef = useRef<HTMLDivElement>(null)
	const contentWrapperElementRef = useRef<HTMLDivElement>(null)

	const [insCountTotal, setInsCountTotal] = useState<number>(countTotal)
	const [containerScrollTop, setContainerScrollTop] = useState<number>(initContainerScrollTop)
	const [verticalSizeInViewport, setVerticalSizeInViewport] = useState<number>(
		Math.ceil(globalProfile.containerHeight / globalProfile.estimatedRowHeight)
	)
	const [originStartIndex, setOriginStartIndex] = useState<number>(0)
	const [originEndIndex, setOriginEndIndex] = useState<number>(0)
	const [renderStartIndex, setRenderStartIndex] = useState<number>(0)
	const [renderEndIndex, setRenderEndIndex] = useState<number>(
		Math.min(originStartIndex + verticalSizeInViewport + bottomBufferSize, countTotal - 1)
	)

	const containerStyle: React.CSSProperties = {
		overflow: 'auto',
		height: containerHeight,
		willChange: 'transform',
	}
	const contentWrapperStyle: React.CSSProperties = {
		height: countTotal * estimatedRowHeight,
		position: 'relative',
		top: 0,
		left: 0,
	}

	const onScrollAction = (e: React.SyntheticEvent): void => {
		const target: HTMLElement = e.target as HTMLElement
		const { scrollTop, scrollLeft } = target
		const currentIndex: number = Math.floor(scrollTop / estimatedRowHeight)
		if (originStartIndex !== currentIndex) {
			setOriginStartIndex(currentIndex)
			setRenderStartIndex(Math.max(currentIndex - topBufferSize, 0))
			setRenderEndIndex(Math.min(currentIndex + verticalSizeInViewport + bottomBufferSize, countTotal - 1))
			setContainerScrollTop(scrollTop)
		}
		onScroll && onScroll(scrollTop, scrollLeft)
	}

	const renderContentItems = (): Array<React.ReactElement> => {
		const contentItems: Array<React.ReactElement> = []
		if (!Component) {
			return contentItems
		}
		const rowItemWrapperStyle: TFixedHeightListRowItemCallStyle = { width: '100%' }
		for (let i: number = renderStartIndex; i <= renderEndIndex; i++) {
			contentItems.push(
				<div
					key={i}
					style={{
						height: estimatedRowHeight,
						position: 'absolute',
						left: 0,
						top: i * estimatedRowHeight,
						width: '100%',
					}}
				>
					<Component index={i} style={rowItemWrapperStyle} rowHeight={estimatedRowHeight} />
				</div>
			)
		}
		return contentItems
	}

	useEffect((): void => {
		if (initContainerScrollTop !== containerScrollTop) {
			setContainerScrollTop(initContainerScrollTop)
			if (containerElementRef.current) {
				containerElementRef.current.scrollTop = initContainerScrollTop
			}
		}
	}, [initContainerScrollTop])

	useEffect((): void => {
		if (insCountTotal !== countTotal) {
			setInsCountTotal(countTotal)
			setOriginStartIndex(0)
			setRenderStartIndex(0)
			setRenderEndIndex(Math.min(originStartIndex + verticalSizeInViewport + bottomBufferSize, countTotal - 1))
			setContainerScrollTop(0)
			if (containerElementRef.current) {
				containerElementRef.current.scrollTop = 0
			}
			return
		}
	})

	return (
		<div
			ref={containerElementRef}
			style={containerStyle}
			onScroll={(e: React.SyntheticEvent): void => {
				flushSync((): void => {
					onScrollAction(e)
				})
			}}
		>
			<div ref={contentWrapperElementRef} style={contentWrapperStyle}>
				{renderContentItems()}
			</div>
		</div>
	)
}
