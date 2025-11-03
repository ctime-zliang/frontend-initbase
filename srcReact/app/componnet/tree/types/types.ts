import React from 'react'

export type TTreeDataItem = {
	title: string | number
	id: TTreeDataItemID
	children?: Array<TTreeDataItem>
}

export type TTreeDataItemID = string | number

export type TTreeRootPorps = {
	/**
	 * 待渲染的层级数据列表
	 */
	data: Array<TTreeDataItem>
	/**
	 * 容器 style 样式描述对象
	 */
	containerStyleObject?: { [key: string]: any }
	/**
	 * 容器尺寸描述
	 */
	containerWidth?: string
	containerHeight?: string
	initContainerScrollTop?: number
	/**
	 * 启用虚拟化显示列表
	 */
	isVirtualList?: boolean
	/**
	 * 组件控件宽度
	 * 		单个控件的宽度, 例如 展开/收起按钮所占区域的宽度
	 */
	treeWidgetItemWidth?: string
	/**
	 * 显示 ${data[index].title} 的元素的样式描述对象
	 */
	itemStyleObject?: { [key: string]: any }
	/**
	 * 是否显示连接线
	 */
	showTagLine?: boolean
	/**
	 * 是否显示 展开/收起 按钮
	 */
	showExpandBtn?: boolean
	/**
	 * 是否展开所有层级
	 * 		不需要自动展开所有层级时请勿配置此项或者直接不配置即可
	 */
	expandAll?: boolean | undefined
	/**
	 * 是否支持多选
	 */
	multiSelect?: boolean
	/**
	 * tree 每行所占行高
	 */
	itemHeight?: string
	/**
	 * ${data[index].title} 是否在所占区域显示下划线
	 */
	contentUnderline?: boolean
	/**
	 * 初始选中的 ${data[index].id} 的集合
	 */
	selectedIds?: Array<string>
	/**
	 * 展开/收起 时执行函数
	 */
	onExpand?: ((a: TTreeDataItem, b: TComponentTreeRowData) => void) | null
	/**
	 * 选中时执行函数
	 */
	onClick?: ((a: Array<TTreeDataItemID>, b: TTreeDataItem, c: TComponentTreeRowData) => void) | null
	/**
	 * 自定义渲染 ${data[index].title}
	 */
	itemRender?: ((a: TTreeDataItem, b: TComponentTreeRowData) => React.ReactElement) | null
	/**
	 * 虚拟滚动 时执行函数
	 */
	onVirtualScroll?: ((y: number, x: number) => void) | null
}

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

export type TLineComponentProps = {
	lineKey: number
	lineData: TComponentTreeRowData
	profile: TTreeRootPorps
	selectedKeys: Array<string | number>
	contentClickAction: (a: TComponentTreeRowData) => void
	expandAction?: ((a: TComponentTreeRowData) => void) | null
}

export type TComponentTreeRowData = {
	id: string
	expand: boolean | undefined | null
	children: Array<TComponentTreeRowData>
	isLeaf: boolean
	levels: Array<TLevels>
	sourceData: TTreeDataItem
	parent: TComponentTreeRowData | undefined
}

export type TLevels = {
	key: string
	stag: number
}
