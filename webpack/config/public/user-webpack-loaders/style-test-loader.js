const loaderUtils = require('loader-utils')
const utils = require('../../../../config/utils')

module.exports = function (content, map, meta) {
	console.log(`\n style-test-loader =============`)
	console.log(content)
	console.log(map)
	console.log(meta)
	return content
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
	return
}
