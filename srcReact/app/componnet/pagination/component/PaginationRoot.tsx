import React, { useEffect, useState } from 'react'
import { defaultProfile, EPageUpdateAction } from '../config/config'
import { TPagination } from '../types/types'
import { correctionUserInput } from '../utils/correctionUserInput'
import PageRange from './PageRange'
import PageSelect from './PageSelect'
import '../styles/index.less'

function PaginationRoot(props: TPagination): React.ReactElement {
	// console.log(`Component: PaginationRoot`, props)
	const globalProfile: TPagination = { ...defaultProfile, ...props }
	const {
		middleDisplaySize: _middleDisplaySize = 3,
		sideDislpaySize: _sideDislpaySize = 1,
		pageNumber: _pageNumber,
		countTotal: _countTotal,
		cutSize: _cutSize,
		gDisabled = false,
		cutSizeOptions = [],
		simplify = false,
		pageToggle,
		pagePiecewise,
	} = globalProfile

	const _isLegalCutSize: boolean = !!cutSizeOptions.find((item: number): boolean => {
		return item === _cutSize
	})
	const _calcCutSize: number = _isLegalCutSize ? _cutSize : cutSizeOptions[0]
	const _calcPageTotal: number = Math.ceil(_countTotal / _calcCutSize)
	const _calcPageNumber: number = correctionUserInput(_pageNumber, 1, _calcPageTotal || 1)

	const [countTotal, setCountTotal] = useState<number>(_countTotal)
	const [cutSize, setCutSize] = useState<number>(_calcCutSize)
	const [pageTotal, setPageTotal] = useState<number>(_calcPageTotal)
	const [pageNumber, setPageNumber] = useState<number>(_calcPageNumber)
	const [inputPageNumber, setInputPageNumber] = useState<number>(_calcPageNumber)

	const theContainerClassName: string = `pagination-container ${gDisabled ? 'pagination-g-disabled' : ''}`
	const thePrevJumpWrapperClassName: string = `page-jump-wrapper page-prevjump-wrapper ${pageNumber <= 1 ? 'page-jump-wrapper-disabled' : ''}`
	const theNextJumpWrapperClassName: string = `page-jump-wrapper page-nextjump-wrapper ${
		pageNumber >= pageTotal ? 'page-jump-wrapper-disabled' : ''
	}`
	const theTotalcountWrapperClassName: string = 'page-totalcount-wrapper'
	const theSvgClassName: string = 'page-svg'

	useEffect((): void => {
		if (_pageNumber === pageNumber) {
			return
		}
		const _calcPageNumber: number = correctionUserInput(_pageNumber, 1, pageTotal)
		setPageNumber(_calcPageNumber)
		setInputPageNumber(_calcPageNumber)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, _calcPageNumber)
	}, [_pageNumber])

	useEffect((): void => {
		if (_countTotal === countTotal) {
			return
		}
		setCountTotal(_countTotal)
		setPageTotal(Math.ceil(_countTotal / cutSize))
		setPageNumber(1)
		setInputPageNumber(1)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, 1)
	}, [_countTotal])

	const piecewiseToggleAcion = (e: React.FormEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setCutSize(inputValue)
		setPageTotal(Math.ceil(_countTotal / inputValue))
		setPageNumber(1)
		setInputPageNumber(1)
		pagePiecewise && pagePiecewise(inputValue)
		pageToggle && pageToggle(EPageUpdateAction.REFRESH_PAGE, 1)
	}
	const prevJumpAction = (e: React.MouseEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		if (pageNumber > 0) {
			setPageNumber(pageNumber - 1)
			setInputPageNumber(pageNumber - 1)
			pageToggle && pageToggle(EPageUpdateAction.PREV_JUMP, pageNumber - 1)
		}
	}
	const nextJumpAction = (e: React.MouseEvent): void => {
		e.stopPropagation()
		e.preventDefault()
		if (pageNumber <= pageTotal - 1) {
			setPageNumber(pageNumber + 1)
			setInputPageNumber(pageNumber + 1)
			pageToggle && pageToggle(EPageUpdateAction.NEXT_JUMP, pageNumber + 1)
		}
	}
	const targetJumpPageAction = (e: React.MouseEvent | React.KeyboardEvent, targetPage: number): void => {
		setPageNumber(targetPage)
		setInputPageNumber(targetPage)
		pageToggle && pageToggle(EPageUpdateAction.TARGET_JUMP, targetPage)
	}
	const inputPageChangeAction = (e: React.FormEvent): void => {
		const inputValue: number = +(e.target as HTMLInputElement).value || 1
		setInputPageNumber(inputValue)
	}

	const totalReneder = (): React.ReactElement => {
		const theTotalContentClassName: string = `page-content page-total-content ${simplify ? 'page-total-content-lengthen' : ''}`
		if (simplify) {
			return (
				<li className={theTotalcountWrapperClassName}>
					<span className={theTotalContentClassName}>
						总计 {countTotal} 条 | 共 {pageTotal} 页
					</span>
				</li>
			)
		}
		return (
			<li className={theTotalcountWrapperClassName}>
				<span className={theTotalContentClassName}>总计 {countTotal} 条</span>
			</li>
		)
	}

	return (
		<ul className={theContainerClassName}>
			<li onClick={prevJumpAction} className={thePrevJumpWrapperClassName}>
				<svg className={theSvgClassName} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
					<path
						d="M546.133333 533.333333L256 243.2l29.866667-29.866667 320 320L285.866667 853.333333l-29.866667-29.866666 290.133333-290.133334zM725.333333 213.333333h42.666667v640h-42.666667V213.333333z"
						fill="#444444"
					></path>
				</svg>
			</li>
			<PageRange
				inputValue={inputPageNumber}
				pageTotal={pageTotal}
				pageNumber={pageNumber}
				middleDisplaySize={_middleDisplaySize}
				sideDislpaySize={_sideDislpaySize}
				simplify={simplify}
				inputChangeAction={inputPageChangeAction}
				confirmAction={targetJumpPageAction}
			/>
			<li onClick={nextJumpAction} className={theNextJumpWrapperClassName}>
				<svg className={theSvgClassName} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
					<path
						d="M546.133333 533.333333L256 243.2l29.866667-29.866667 320 320L285.866667 853.333333l-29.866667-29.866666 290.133333-290.133334zM725.333333 213.333333h42.666667v640h-42.666667V213.333333z"
						fill="#444444"
					></path>
				</svg>
			</li>
			{totalReneder()}
			<PageSelect selectValue={cutSize} optionList={cutSizeOptions} selectChangeAction={piecewiseToggleAcion} />
		</ul>
	)
}

export default PaginationRoot
