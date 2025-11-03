import { TTreeRootPorps } from '../types/types'

export const LEVEL_KEY_PREFIX: string = 'tree-expand-'
export const ROW_ID_PREFIX: string = 'tree-rowdata-'

/**
 * 默认配置
 */
export const DEFAULT_ITEMHIEGHT: string = '26px'
export const defaultProfile: TTreeRootPorps = {
	containerStyleObject: {},
	containerWidth: '100%',
	containerHeight: '100%',
	initContainerScrollTop: 0,
	isVirtualList: false,
	data: [],
	treeWidgetItemWidth: '30px',
	itemStyleObject: {},
	showTagLine: true,
	showExpandBtn: true,
	expandAll: undefined,
	multiSelect: false,
	itemHeight: DEFAULT_ITEMHIEGHT,
	contentUnderline: false,
	selectedIds: [],
	onExpand: null,
	onClick: null,
	itemRender: null,
	onVirtualScroll: null,
}

/**
 * 用于标记每一行的用户控件类型
 * 		按钮
 *      指示线
 */
export enum ELEVEL_STAG {
	// 空白 位
	TYPE_BLANK = -1,
	// 扩展按钮 位
	TYPE_EXTEND_BTN = 0,
	// 垂直连接线 位
	TYPE_VERTICAL_LINE = 1,
	// 水平链接线 位
	TYPE_HORIZONTAL_LINE = 2,
	// 转折线 位
	TYPE_TURNING_LINE = 3,
	// 交叉线 位
	TYPE_CROSS_LINE = 4,
}
