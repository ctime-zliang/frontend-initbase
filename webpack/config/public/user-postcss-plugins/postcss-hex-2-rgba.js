const postcss = require('postcss')

/*
    postcss.plugin(<defined plugin name>, callback)
 */

const HEX_COLOR_REG = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
const setHex2RGBA = (hexString, opacity = 1) => {
	return (
		'rgba(' +
		parseInt('0x' + hexString.slice(1, 3)) +
		', ' +
		parseInt('0x' + hexString.slice(3, 5)) +
		', ' +
		parseInt('0x' + hexString.slice(5, 7)) +
		', ' +
		opacity +
		')'
	)
}

module.exports = postcss.plugin('postcss-hex-2-rgba', (options = {}) => {
	return root => {
		root.walkDecls(decl => {
			try {
				if (HEX_COLOR_REG.test(decl.value)) {
					decl.value = setHex2RGBA(decl.value)
				}
			} catch (e) {
				console.log(e)
			}
		})
	}
})
