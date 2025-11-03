import React from 'react'
import { ENTER_KEYCODE } from '../config/config'
import { TPageShowItemProps } from '../types/types'
import { correctionUserInput } from '../utils/correctionUserInput'

function PageShowItem(props: TPageShowItemProps): React.ReactElement {
	const { pageNumber, isSelected, inputValue, pageTotal, canInput, simplify, inputChangeAction, confirmAction } = props
	const theItemWrapperClassName: string = isSelected ? `page-item-wrapper page-item-wrapper-selected` : `page-item-wrapper`
	const theContentClassName: string = 'page-content'
	const theInputWrapperClassName: string = 'page-input-wrapper'
	const theInputClassName: string = `page-number-input ${simplify ? 'page-number-input-simp' : ''}`
	const btnClickAction = (e: React.MouseEvent): void => {
		confirmAction(e, pageNumber)
	}
	const inputFocusAction = (e: React.FocusEvent): void => {
		const inputElement: HTMLInputElement = e.target as HTMLInputElement
		inputElement.select && inputElement.select()
	}
	const inputKeyupAction = (e: React.KeyboardEvent): void => {
		if (e.keyCode === ENTER_KEYCODE) {
			confirmAction(e, correctionUserInput(inputValue, 1, pageTotal))
		}
	}
	if (canInput && isSelected) {
		return (
			<li className={theInputWrapperClassName}>
				<input
					type="number"
					className={theInputClassName}
					value={inputValue}
					onChange={inputChangeAction}
					onFocus={inputFocusAction}
					onKeyUp={inputKeyupAction}
				/>
			</li>
		)
	}
	return (
		<li className={theItemWrapperClassName} onClick={btnClickAction}>
			<span className={theContentClassName}>{pageNumber}</span>
		</li>
	)
}

export default React.memo(PageShowItem)
