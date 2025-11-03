import { TPagination } from '../types/types'

/**
 * 默认配置
 */
export const defaultProfile: TPagination = {
	middleDisplaySize: 3,
	sideDislpaySize: 1,
	gDisabled: false,
	pageNumber: 1,
	countTotal: 1,
	cutSize: 10,
	cutSizeOptions: [10, 30, 50],
	pageToggle: undefined,
	pagePiecewise: undefined,
}

export enum EPageUpdateAction {
	REFRESH_PAGE = 'REFRESH_PAGE',
	PREV_JUMP = 'PREV_JUMP',
	NEXT_JUMP = 'NEXT_JUMP',
	TARGET_JUMP = 'TARGET_JUMP',
}

export const ENTER_KEYCODE: number = 13
