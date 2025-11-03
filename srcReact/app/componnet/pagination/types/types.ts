export type TPagination = {
	/**
	 * 必选属性 - 当前选中的页码
	 * 		首次渲染组件时读取
	 */
	pageNumber: number
	/**
	 * 必选属性 - 条目总长度
	 */
	countTotal: number
	/**
	 * 必选属性 - 每页条目长度
	 */
	cutSize: number
	/**
	 * 可选属性 - 每页条目长度配置数组
	 */
	cutSizeOptions?: Array<number>
	/**
	 * 可选属性 - 夹在两个 "..." 中间需要显示的页码按钮个数
	 *      建议设置一个奇数
	 */
	middleDisplaySize?: number
	/**
	 * 可选属性 - 页码列表首位需要显示的页码按钮个数
	 *      不得小于 1
	 */
	sideDislpaySize?: number
	/**
	 * 可选属性 - 将页面控制器设置为禁用态
	 */
	gDisabled?: boolean
	/**
	 * 可选属性 - 设置为精简模式
	 */
	simplify?: boolean
	/**
	 * 可选方法 - 切换切换时执行回调
	 */
	pageToggle?: (a: string, v: number) => void
	/**
	 * 可选方法 - 切换每页长度时执行回调
	 */
	pagePiecewise?: (v: number) => void
}

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TPageBreakItemProps = {}

export type TPageRangeProps = {
	pageTotal: number
	middleDisplaySize: number
	sideDislpaySize: number
	pageNumber: number
	inputValue: number
	simplify: boolean
	inputChangeAction: (e: React.FormEvent) => void
	confirmAction: (e: React.MouseEvent | React.KeyboardEvent, v: number) => void
}

export type TPageSelectProps = {
	selectValue: number
	optionList: Array<number>
	selectChangeAction: (e: React.FormEvent) => void
}

export type TPageShowItemProps = {
	pageNumber: number
	isSelected: boolean
	inputValue: number
	pageTotal: number
	canInput: boolean
	simplify: boolean
	inputChangeAction: (e: React.FormEvent) => void
	confirmAction: (e: React.MouseEvent | React.KeyboardEvent, v: number) => void
}
