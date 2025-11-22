export function resetFontsize(): void {
	const MAX_FONTSIZE: number = 100
	function __resetFontSizeClac(): number {
		const _fontSize: number = document.documentElement.clientWidth / 3.75
		return _fontSize > MAX_FONTSIZE ? MAX_FONTSIZE : _fontSize
	}
	document.documentElement.style.fontSize = __resetFontSizeClac() + 'px'
	window.addEventListener('resize', function () {
		document.documentElement.style.fontSize = __resetFontSizeClac() + 'px'
	})
}
