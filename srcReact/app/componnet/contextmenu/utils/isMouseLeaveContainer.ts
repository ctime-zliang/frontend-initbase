export function isMouseLeaveContainer(startElement: HTMLElement): boolean {
	while (startElement) {
		if (startElement.getAttribute('mouselave') === 'true') {
			return true
		}
		startElement = startElement.parentElement as HTMLElement
	}
	return false
}
