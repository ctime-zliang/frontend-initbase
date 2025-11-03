import { useEffect } from 'react'

export function useContentBgColor(setColor: string): void {
	useEffect((): void => {
		const mainPageContentElement: HTMLElement = document.querySelector('.app-page-content') as HTMLElement
		if (!mainPageContentElement) {
			return
		}
		mainPageContentElement.style.backgroundColor = setColor
	}, [])
}
