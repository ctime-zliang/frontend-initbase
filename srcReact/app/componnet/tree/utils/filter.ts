import { ELEVEL_STAG, ROW_ID_PREFIX, LEVEL_KEY_PREFIX } from '../config/config'
import { TComponentTreeRowData, TLevels, TTreeDataItem } from '../types/types'

let rowId: number = 1
let levelId: number = 1

function getExpands(
	id: string,
	expand: boolean,
	isLeaf: boolean,
	expandedKeys: Array<string>,
	defaultExpand: boolean | undefined = undefined
): boolean {
	if (typeof defaultExpand !== 'undefined') {
		return defaultExpand
	}
	if (isLeaf) {
		return false
	} else if (typeof (expandedKeys as Array<string>)?.length === 'number') {
		return (expandedKeys as Array<string>).includes(id)
	} else if (typeof expand === 'boolean') {
		return expand
	}
	return !!defaultExpand
}

export function handleFormatData(
	data: Array<TTreeDataItem | TComponentTreeRowData>,
	levels: Array<TLevels>,
	expandedKeys: Array<string>,
	defaultExpand: boolean | undefined = undefined,
	parent: TComponentTreeRowData | undefined = undefined
): Array<TComponentTreeRowData> {
	const result: Array<TComponentTreeRowData> = []
	for (let i: number = 0; i < data.length; i++) {
		const index: number = i
		const rowData: TComponentTreeRowData = data[i] as TComponentTreeRowData
		const { id, children, expand, isLeaf } = rowData as any
		const newId: string = id || `${ROW_ID_PREFIX}${rowId++}`
		const newLevels: Array<TLevels> = (levels || []).map((level: TLevels): TLevels => {
			if (level.stag === 0 && index + 1 < data.length) {
				return { key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_CROSS_LINE }
			}
			if (level.stag === 0 && index + 1 === data.length) {
				return { key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_TURNING_LINE }
			}
			if (level.stag === 3) {
				return { key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_BLANK }
			}
			if (level.stag === 4) {
				return { key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_VERTICAL_LINE }
			}
			return level
		})
		if ((children && children.length) || isLeaf) {
			newLevels.push({ key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_EXTEND_BTN })
		} else if (newLevels.length) {
			newLevels.push({ key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_HORIZONTAL_LINE })
		} else {
			newLevels.push({ key: `${LEVEL_KEY_PREFIX}${levelId++}`, stag: ELEVEL_STAG.TYPE_BLANK })
		}

		const itemData: TComponentTreeRowData = {
			id: newId,
			levels: newLevels,
			isLeaf: !!isLeaf,
			expand: getExpands(newId, !!expand, !!isLeaf, expandedKeys, defaultExpand),
			children: [],
			sourceData: rowData.sourceData ? rowData.sourceData : (rowData as unknown as TTreeDataItem),
			parent,
		}

		if (children && children.length) {
			itemData.children = handleFormatData(children, newLevels, expandedKeys, defaultExpand, itemData)
		}

		result.push(itemData)
	}
	return result
}
