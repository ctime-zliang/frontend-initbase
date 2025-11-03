import React, { useCallback, useState, useMemo } from 'react'

export const useForceUpdate = (): (() => void) => {
	const [, setState] = useState(false)
	return useCallback((): void => {
		setState((preState: boolean): boolean => {
			return !preState
		})
	}, [])
}

export type TUseReactive = {
	value: any
	update(v: any): void
	render(): void
}
export const useReactive = (initValue: any): TUseReactive => {
	const forceUpdate = useForceUpdate()
	const reactive: TUseReactive = useMemo(() => {
		return {
			value: initValue,
			update(value: any): void {
				reactive.value = value
			},
			render(): void {
				forceUpdate()
			},
		}
	}, [initValue])
	return reactive
}
