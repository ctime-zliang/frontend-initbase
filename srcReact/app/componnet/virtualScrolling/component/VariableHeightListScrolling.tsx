import React, { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { defaultProfileVariable, variableListItemWrapperIdPrefix } from '../config/config'
import {
	TRowCache,
	TVariableHeightListRowItemCallStyle,
	TVariableHeightListScrollingCallProps,
	TVariableHeightListScrollingFunctionProps,
} from '../types/types'
import { binarySearch } from '../utils/binarySearch'
import { initRowCache, updateRowCacheByContentItemElement } from '../utils/updateRowCache'

export function VariableHeightListScrolling(props: TVariableHeightListScrollingCallProps): React.ReactElement {
	const globalProfile: TVariableHeightListScrollingFunctionProps = { ...defaultProfileVariable, ...props }
	const { estimatedRowHeight, containerHeight, topBufferSize, bottomBufferSize, countTotal, initContainerScrollTop, onScroll } = globalProfile
	const Component: any = (props as any).children as any

	const containerElementRef = useRef<HTMLDivElement>(null)
	const scrollPhantomElementRef = useRef<HTMLDivElement>(null)
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

	const getTransform = (): string => {
		return `translate3d(0, ${renderStartIndex >= 1 ? globalProfile.rowCache[renderStartIndex - 1].bottom : 0}px, 5px)`
	}

	const containerStyle: React.CSSProperties = {
		overflow: 'auto',
		height: containerHeight,
		position: 'relative',
		top: 0,
		left: 0,
		willChange: 'transform',
	}
	const scrollPhantomStyle: React.CSSProperties = {
		position: 'relative',
		top: 0,
		left: 0,
	}
	const contentWrapperStyle: React.CSSProperties = {
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		transform: getTransform(),
	}

	globalProfile.rowCache = useMemo((): Array<TRowCache> => {
		return initRowCache(estimatedRowHeight, countTotal, globalProfile.rowCache)
	}, [])

	const getStartIndex = (scrollTop: number = 0): number => {
		const index: number = binarySearch(globalProfile.rowCache, scrollTop)
		const targetRowItem: TRowCache = globalProfile.rowCache[index]
		if (targetRowItem.bottom < scrollTop) {
			return index + 1
		}
		return index
	}

	const onScrollAction = (e: React.SyntheticEvent): void => {
		const target: HTMLElement = e.target as HTMLElement
		const { scrollTop, scrollLeft } = target
		const currentStartIndex: number = getStartIndex(scrollTop)
		if (currentStartIndex !== originStartIndex) {
			setOriginStartIndex(currentStartIndex)
			setRenderStartIndex(Math.max(currentStartIndex - topBufferSize, 0))
			setRenderEndIndex(Math.min(currentStartIndex + verticalSizeInViewport + bottomBufferSize, insCountTotal - 1))
			setContainerScrollTop(scrollTop)
		}
		onScroll && onScroll(scrollTop, scrollLeft)
	}

	const renderContentItems = (): Array<React.ReactElement> => {
		const contentItems: Array<React.ReactElement> = []
		if (!Component) {
			return contentItems
		}
		const rowItemWrapperStyle: TVariableHeightListRowItemCallStyle = { width: '100%' }
		for (let i: number = renderStartIndex; i <= renderEndIndex; i++) {
			contentItems.push(
				<div key={i} style={rowItemWrapperStyle} id={`${variableListItemWrapperIdPrefix}-${i}`}>
					<Component index={i} style={rowItemWrapperStyle} />
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
		if (contentWrapperElementRef.current && globalProfile.countTotal > 0) {
			updateRowCacheByContentItemElement(
				Array.from(contentWrapperElementRef.current.children) as Array<HTMLElement>,
				globalProfile.rowCache,
				(height: number): void => {
					if (scrollPhantomElementRef.current) {
						scrollPhantomElementRef.current.style.height = `${height}px`
					}
				}
			)
		}
	}, [])

	useEffect((): void => {
		if (insCountTotal !== countTotal) {
			setInsCountTotal(countTotal)
			setOriginStartIndex(0)
			setRenderStartIndex(0)
			setRenderEndIndex(Math.min(originStartIndex + verticalSizeInViewport + bottomBufferSize, countTotal - 1))
			setContainerScrollTop(0)
			initRowCache(estimatedRowHeight, countTotal, globalProfile.rowCache)
			if (containerElementRef.current) {
				containerElementRef.current.scrollTop = 0
			}
			if (scrollPhantomElementRef.current) {
				scrollPhantomElementRef.current.style.height = `${estimatedRowHeight * insCountTotal}px`
			}
			return
		}
		if (contentWrapperElementRef.current && globalProfile.countTotal > 0) {
			updateRowCacheByContentItemElement(
				Array.from(contentWrapperElementRef.current.children) as Array<HTMLElement>,
				globalProfile.rowCache,
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
			style={containerStyle}
			onScroll={(e: React.SyntheticEvent): void => {
				flushSync((): void => {
					onScrollAction(e)
				})
			}}
		>
			<div ref={scrollPhantomElementRef} style={scrollPhantomStyle} />
			<div style={contentWrapperStyle} ref={contentWrapperElementRef}>
				{renderContentItems()}
			</div>
		</div>
	)
}
