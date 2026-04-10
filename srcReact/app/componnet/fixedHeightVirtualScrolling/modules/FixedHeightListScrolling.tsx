import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { defaultProfileFixed } from '../config/config'
import { TFixedHeightListScrollingProfile } from '../types/types'

type TComponentDataHandler = {
	insCountTotal: number
	containerScrollTop: number
	verticalSizeInViewport: number
	originStartIndex: number
	originEndIndex: number
	renderStartIndex: number
	renderEndIndex: number
	containerStyle: React.CSSProperties
	contentWrapperStyle: React.CSSProperties
}
export type TFixedHeightListScrollingProps = {
	containerHeight: number
	countTotal: number
	isShowBottom?: boolean
	bottomHeight?: number
	bottomContent?: React.FunctionComponent<any>
	estimatedRowHeight?: number
	topBufferSize?: number
	bottomBufferSize?: number
	initContainerScrollTop?: number
	onScroll?: ((e: React.SyntheticEvent, y: number, x: number) => void) | null
	children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponent<any> | null
}
function FixedHeightListScrolling(props: TFixedHeightListScrollingProps): React.ReactElement {
	const profile: TFixedHeightListScrollingProfile = { ...defaultProfileFixed, ...props }
	const [, setFlush] = useState<number>(0)
	const Component: React.FunctionComponent<any> = (props as any).children as React.FunctionComponent<any>
	const containerElementRef = useRef<HTMLDivElement>(null)
	const contentWrapperElementRef = useRef<HTMLDivElement>(null)
	const initOriginStartIndex: number = 0
	const initVerticalSizeInViewport: number = Math.ceil(profile.containerHeight / profile.estimatedRowHeight)
	const componentDataHandlerRef: { current: TComponentDataHandler } = useRef<TComponentDataHandler>({
		insCountTotal: profile.countTotal,
		containerScrollTop: profile.initContainerScrollTop,
		verticalSizeInViewport: initVerticalSizeInViewport,
		originStartIndex: initOriginStartIndex,
		originEndIndex: 0,
		renderStartIndex: 0,
		renderEndIndex: Math.min(initOriginStartIndex + initVerticalSizeInViewport + profile.bottomBufferSize, profile.countTotal - 1),
		containerStyle: {},
		contentWrapperStyle: {},
	})
	componentDataHandlerRef.current.containerStyle = {
		overflow: 'auto',
		height: profile.containerHeight,
		willChange: 'transform',
	}
	componentDataHandlerRef.current.contentWrapperStyle = {
		height: profile.countTotal * profile.estimatedRowHeight,
		position: 'relative',
		top: 0,
		left: 0,
	}
	const onScrollAction = (e: React.SyntheticEvent): void => {
		const target: HTMLElement = e.target as HTMLElement
		const currentIndex: number = Math.floor(target.scrollTop / profile.estimatedRowHeight)
		if (componentDataHandlerRef.current.originStartIndex !== currentIndex) {
			componentDataHandlerRef.current.originStartIndex = currentIndex
			componentDataHandlerRef.current.renderStartIndex = Math.max(currentIndex - profile.topBufferSize, 0)
			componentDataHandlerRef.current.renderEndIndex = Math.min(
				currentIndex + componentDataHandlerRef.current.verticalSizeInViewport + profile.bottomBufferSize,
				profile.countTotal - 1
			)
			componentDataHandlerRef.current.containerScrollTop = target.scrollTop
			setFlush((prev: number): number => {
				return prev + 1
			})
		}
		profile.onScroll && profile.onScroll(e, target.scrollTop, target.scrollLeft)
	}

	const renderContentItems = (): Array<React.ReactElement> => {
		const contentItems: Array<React.ReactElement> = []
		if (!Component) {
			return contentItems
		}
		const rowItemWrapperStyle: React.CSSProperties = { width: '100%' }
		let idx: number = componentDataHandlerRef.current.renderStartIndex
		for (; idx <= componentDataHandlerRef.current.renderEndIndex; idx++) {
			contentItems.push(
				<div
					key={idx}
					style={{
						height: profile.estimatedRowHeight,
						position: 'absolute',
						left: 0,
						top: idx * profile.estimatedRowHeight,
						width: '100%',
					}}
				>
					<Component index={idx} style={rowItemWrapperStyle} rowHeight={profile.estimatedRowHeight} />
				</div>
			)
		}
		if (profile.isShowBottom && profile.bottomContent) {
			const BottomComponent: React.FunctionComponent<any> = profile.bottomContent
			contentItems.push(
				<div
					key={idx}
					style={{
						height: profile.bottomHeight,
						position: 'absolute',
						left: 0,
						top: idx * profile.estimatedRowHeight,
						width: '100%',
					}}
				>
					<BottomComponent index={idx} style={rowItemWrapperStyle} rowHeight={profile.bottomHeight} />
				</div>
			)
		}
		return contentItems
	}

	useEffect((): void => {
		if (profile.initContainerScrollTop !== componentDataHandlerRef.current.containerScrollTop) {
			componentDataHandlerRef.current.containerScrollTop = profile.initContainerScrollTop
			if (containerElementRef.current) {
				containerElementRef.current.scrollTop = profile.initContainerScrollTop
			}
			setFlush((prev: number): number => {
				return prev + 1
			})
		}
	}, [profile.initContainerScrollTop])
	useEffect((): void => {
		if (componentDataHandlerRef.current.insCountTotal !== profile.countTotal) {
			componentDataHandlerRef.current.insCountTotal = profile.countTotal
			componentDataHandlerRef.current.renderEndIndex = Math.min(
				componentDataHandlerRef.current.originStartIndex + componentDataHandlerRef.current.verticalSizeInViewport + profile.bottomBufferSize,
				profile.countTotal - 1
			)
			setFlush((prev: number): number => {
				return prev + 1
			})
			return
		}
	})

	return (
		<div
			ref={containerElementRef}
			style={componentDataHandlerRef.current.containerStyle}
			onScroll={(e: React.SyntheticEvent): void => {
				flushSync((): void => {
					onScrollAction(e)
				})
			}}
		>
			<div ref={contentWrapperElementRef} style={componentDataHandlerRef.current.contentWrapperStyle}>
				{renderContentItems()}
			</div>
		</div>
	)
}

export const FixedHeightListScrollingMemo = React.memo(FixedHeightListScrolling)
