import React, { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { defaultProfileVariable, variableListItemWrapperIdPrefix } from '../config/config'
import { TRowCache, TVariableHeightListScrollingProfile } from '../types/types'
import { binarySearch } from '../utils/binarySearch'
import { initRowCache, updateRowCacheByContentItemElement } from '../utils/updateRowCache'

type TComponentDataHandler = {
	insCountTotal: number
	containerScrollTop: number
	verticalSizeInViewport: number
	originStartIndex: number
	originEndIndex: number
	renderStartIndex: number
	renderEndIndex: number
	containerStyle: React.CSSProperties
	scrollPhantomStyle: React.CSSProperties
	contentWrapperStyle: React.CSSProperties
}
export type TVariableHeightListScrollingProps = {
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

function VariableHeightListScrolling(props: TVariableHeightListScrollingProps): React.ReactElement {
	const profile: TVariableHeightListScrollingProfile = { ...defaultProfileVariable, ...props }
	const [, setFlush] = useState<number>(0)
	const Component: any = (props as any).children as any
	const containerElementRef = useRef<HTMLDivElement>(null)
	const scrollPhantomElementRef = useRef<HTMLDivElement>(null)
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
		scrollPhantomStyle: {},
		contentWrapperStyle: {},
	})
	const getTransform = (): string => {
		return `translate3d(0, ${
			componentDataHandlerRef.current.renderStartIndex >= 1 ? profile.rowCache[componentDataHandlerRef.current.renderStartIndex - 1].bottom : 0
		}px, 5px)`
	}
	componentDataHandlerRef.current.containerStyle = {
		overflow: 'auto',
		height: profile.containerHeight,
		position: 'relative',
		top: 0,
		left: 0,
		willChange: 'transform',
	}
	componentDataHandlerRef.current.scrollPhantomStyle = {
		position: 'relative',
		top: 0,
		left: 0,
	}
	componentDataHandlerRef.current.contentWrapperStyle = {
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		transform: getTransform(),
	}

	profile.rowCache = useMemo((): Array<TRowCache> => {
		return initRowCache(profile.estimatedRowHeight, profile.countTotal, profile.rowCache)
	}, [])
	const getStartIndex = (scrollTop: number = 0): number => {
		const index: number = binarySearch(profile.rowCache, scrollTop)
		const targetRowItem: TRowCache = profile.rowCache[index]
		if (targetRowItem.bottom < scrollTop) {
			return index + 1
		}
		return index
	}
	const onScrollAction = (e: React.SyntheticEvent): void => {
		const target: HTMLElement = e.target as HTMLElement
		const { scrollTop, scrollLeft } = target
		const currentStartIndex: number = getStartIndex(scrollTop)
		if (currentStartIndex !== componentDataHandlerRef.current.originStartIndex) {
			componentDataHandlerRef.current.originStartIndex = currentStartIndex
			componentDataHandlerRef.current.renderStartIndex = Math.max(currentStartIndex - profile.topBufferSize, 0)
			componentDataHandlerRef.current.renderEndIndex = Math.min(
				currentStartIndex + componentDataHandlerRef.current.verticalSizeInViewport + profile.bottomBufferSize,
				componentDataHandlerRef.current.insCountTotal - 1
			)
			componentDataHandlerRef.current.containerScrollTop = scrollTop
			setFlush((prev: number): number => {
				return prev + 1
			})
		}
		profile.onScroll && profile.onScroll(e, scrollTop, scrollLeft)
	}
	const renderContentItems = (): Array<React.ReactElement> => {
		const contentItems: Array<React.ReactElement> = []
		if (!Component) {
			return contentItems
		}
		const rowItemWrapperStyle: React.CSSProperties = { width: '100%' }
		for (let i: number = componentDataHandlerRef.current.renderStartIndex; i <= componentDataHandlerRef.current.renderEndIndex; i++) {
			contentItems.push(
				<div key={i} style={rowItemWrapperStyle} id={`${variableListItemWrapperIdPrefix}-${i}`}>
					<Component index={i} style={rowItemWrapperStyle} />
				</div>
			)
		}
		return contentItems
	}

	useEffect((): void => {
		if (componentDataHandlerRef.current.containerScrollTop !== profile.initContainerScrollTop) {
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
		if (contentWrapperElementRef.current && profile.countTotal > 0) {
			updateRowCacheByContentItemElement(
				Array.from(contentWrapperElementRef.current.children) as Array<HTMLElement>,
				profile.rowCache,
				(height: number): void => {
					if (scrollPhantomElementRef.current) {
						scrollPhantomElementRef.current.style.height = `${height}px`
					}
				}
			)
		}
	}, [])
	useEffect((): void => {
		if (componentDataHandlerRef.current.insCountTotal !== profile.countTotal) {
			componentDataHandlerRef.current.insCountTotal = profile.countTotal
			componentDataHandlerRef.current.originStartIndex = 0
			componentDataHandlerRef.current.renderStartIndex = 0
			componentDataHandlerRef.current.renderEndIndex = Math.min(
				componentDataHandlerRef.current.originStartIndex + componentDataHandlerRef.current.verticalSizeInViewport + profile.bottomBufferSize,
				profile.countTotal - 1
			)
			componentDataHandlerRef.current.containerScrollTop = 0
			initRowCache(profile.estimatedRowHeight, profile.countTotal, profile.rowCache)
			if (containerElementRef.current) {
				containerElementRef.current.scrollTop = 0
			}
			if (scrollPhantomElementRef.current) {
				scrollPhantomElementRef.current.style.height = `${profile.estimatedRowHeight * componentDataHandlerRef.current.insCountTotal}px`
			}
			setFlush((prev: number): number => {
				return prev + 1
			})
			return
		}
		if (contentWrapperElementRef.current && profile.countTotal > 0) {
			updateRowCacheByContentItemElement(
				Array.from(contentWrapperElementRef.current.children) as Array<HTMLElement>,
				profile.rowCache,
				(height: number): void => {
					if (scrollPhantomElementRef.current) {
						scrollPhantomElementRef.current.style.height = `${height}px`
					}
				}
			)
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
			<div ref={scrollPhantomElementRef} style={componentDataHandlerRef.current.scrollPhantomStyle} />
			<div style={componentDataHandlerRef.current.contentWrapperStyle} ref={contentWrapperElementRef}>
				{renderContentItems()}
			</div>
		</div>
	)
}

export const VariableHeightListScrollingMemo = React.memo(VariableHeightListScrolling)
