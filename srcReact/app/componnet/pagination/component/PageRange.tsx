import React from 'react'
import { TPageRangeProps } from '../types/types'
import PageBreakItem from './PageBreakItem'
import PageShowItem from './PageShowItem'

function PageRange(props: TPageRangeProps): React.ReactElement {
	const { pageTotal, middleDisplaySize, sideDislpaySize, pageNumber, simplify } = props
	const viewItemComponents: Array<React.ReactElement> = []
	const loopTotal: number = pageTotal || 1
	if (simplify) {
		viewItemComponents.push(<PageShowItem key={1} canInput={true} isSelected={true} {...props} pageNumber={pageNumber} />)
	} else {
		if (loopTotal <= middleDisplaySize) {
			for (let i: number = 1; i <= loopTotal; i++) {
				viewItemComponents.push(<PageShowItem key={i} canInput={false} isSelected={pageNumber === i} {...props} pageNumber={i} />)
			}
		} else {
			let middleStart: number = pageNumber - Math.floor(middleDisplaySize / 2)
			let middleEnd: number = pageNumber + Math.floor(middleDisplaySize / 2)
			let leftEnd: number = sideDislpaySize
			let rightStart: number = loopTotal - sideDislpaySize + 1
			if (leftEnd + 1 >= middleStart) {
				middleEnd = sideDislpaySize + middleDisplaySize + 1
			}
			if (rightStart - 1 <= middleEnd) {
				middleStart = loopTotal - (sideDislpaySize + middleDisplaySize)
			}
			let isCouldAddBreakItem: boolean = true
			for (let i: number = 1; i <= loopTotal; i++) {
				if (i <= leftEnd) {
					isCouldAddBreakItem = true
					viewItemComponents.push(<PageShowItem key={i} canInput={true} isSelected={pageNumber === i} {...props} pageNumber={i} />)
					continue
				}
				if (i >= rightStart) {
					isCouldAddBreakItem = true
					viewItemComponents.push(<PageShowItem key={i} canInput={true} isSelected={pageNumber === i} {...props} pageNumber={i} />)
					continue
				}
				if (i >= middleStart && i <= middleEnd) {
					isCouldAddBreakItem = true
					viewItemComponents.push(<PageShowItem key={i} canInput={true} isSelected={pageNumber === i} {...props} pageNumber={i} />)
					continue
				}
				if (isCouldAddBreakItem) {
					isCouldAddBreakItem = false
					viewItemComponents.push(<PageBreakItem key={i} />)
				}
			}
		}
	}
	return <>{viewItemComponents}</>
}

export default PageRange
