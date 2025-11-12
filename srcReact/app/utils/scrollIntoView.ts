import { TBoundingClientRectResult } from '../types/comm.types'

/**
 * 依将目标元素自动滚动到视口内 - 垂直滚动
 *      如果元素处于视口外下部, 则滚动到底部对其为止
 *      如果元素处于视口外上部, 则滚动到顶部对其为止
 *      如果元素处于视口内, 则不做处理
 */
export function ven$scrollIntoViewByIndexVertical(itemIndex: number, containerElement: HTMLElement): void {
	const containerElementRect: TBoundingClientRectResult = containerElement.getBoundingClientRect().toJSON()
	const targetElemet: HTMLElement = containerElement.children[itemIndex] as HTMLElement
	if (!targetElemet) {
		return
	}
	const targetElemetRect: TBoundingClientRectResult = targetElemet.getBoundingClientRect().toJSON()
	/**
	 * 将元素滚动到视口最顶部时需要给视口设定的 scroll-top 的值
	 */
	const scrollToShowInViewTop: number = targetElemet.offsetTop - targetElemetRect.height
	/**
	 * 将元素滚动到视口最底部时需要给视口设定的 scroll-top 的值
	 */
	const scrollToShowInViewBottom: number = targetElemet.offsetTop + targetElemetRect.height - containerElementRect.height
	/**
	 * 当目标元素隐藏于视口上方时, 满足此条件
	 * 此时需要将该元素滚动到视口顶部
	 */
	if (containerElement.scrollTop > scrollToShowInViewTop) {
		containerElement.scrollTop = scrollToShowInViewTop
		return
	}
	/**
	 * 当目标元素隐藏于视口下方时, 满足此条件
	 * 此时需要将该元素滚动到视口底部
	 */
	if (containerElement.scrollTop < scrollToShowInViewBottom) {
		containerElement.scrollTop = scrollToShowInViewBottom
		return
	}
}

/**
 * 获取元素相对于视口的位置
 */
export function getItemPostionByTarget(targetElemet: HTMLElement, containerElement: HTMLElement): 'UPPER_OUTER' | 'LOWER_OUTER' | 'INNER' {
	if (!targetElemet || !containerElement) {
		return null!
	}
	const containerElementRect: TBoundingClientRectResult = containerElement.getBoundingClientRect().toJSON()
	const targetElemetRect: TBoundingClientRectResult = targetElemet.getBoundingClientRect().toJSON()
	if (containerElement.scrollTop > targetElemet.offsetTop + targetElemetRect.height / 2) {
		return 'UPPER_OUTER'
	}
	if (containerElement.scrollTop + containerElementRect.height < targetElemet.offsetTop + targetElemetRect.height / 2) {
		return 'LOWER_OUTER'
	}
	return 'INNER'
}
