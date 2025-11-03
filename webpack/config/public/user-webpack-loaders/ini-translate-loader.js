const loaderUtils = require('loader-utils')
const utils = require('../../../../config/utils')

module.exports = function (content, map, meta) {
	const eContent = utils.getStringExportContent(content)
	const loaderOptions = loaderUtils.getOptions(this)
	if (!eContent) {
		return utils.createLoaderResult(JSON.stringify({}))
	}
	try {
		const data = JSON.parse(eContent)
		data['__$$extra'] = JSON.parse(JSON.stringify(loaderOptions))
		return utils.createLoaderResult(JSON.stringify(data))
	} catch (e) {
		console.log(e)
		return utils.createLoaderResult(undefined)
	}
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
	return
}
