const rimraf = require('rimraf')
const chalk = require('chalk')
const utils = require('../../../../config/utils')

const DEFAULT_OPTIONS = {
	startStamp: 0,
	endStamp: 0,
}

const createFileListContent = fileList => {
	let string = `[${new Date().getTime()}]All ${fileList.length} files:\n`
	fileList.forEach(item => {
		string += `${item}\n`
	})
	return {
		filecontent: string,
		filename: `file-list.txt`,
	}
}

function HelloPlugin(options) {
	this.options = { ...DEFAULT_OPTIONS, ...options }
}

HelloPlugin.prototype.apply = function (compiler) {
	// console.log(compiler)
	console.log(`HelloPlugin: apply call`)
	this.options.startStamp = new Date().getTime()
	this.options.endStamp = 0
	rimraf.sync(this.options.rootBuildPath)

	// compiler.hooks.emit.tap('run', compilation => {
	// 	console.log('\n')
	// 	console.log(`HelloPlugin: compiler.hooks.emit.tap @run`)
	// 	console.log(Object.keys(compilation.assets))
	// })

	// compiler.hooks.emit.tap('compile', compilation => {
	// 	console.log('\n')
	// 	console.log(`HelloPlugin: compiler.hooks.emit.tap @compile: starting to compile`)
	// 	console.log(Object.keys(compilation.assets))
	// })
	// compiler.hooks.emit.tap('compilation', compilation => {
	// 	console.log('\n')
	// 	console.log(`HelloPlugin: compiler.hooks.emit.tap @compilation: starting a new compilation`)
	// 	console.log(Object.keys(compilation.assets))
	// })
	// compiler.hooks.emit.tap('make', compilation => {
	// 	console.log('\n')
	// 	console.log(`HelloPlugin: compiler.hooks.emit.tap @make: making file`)
	// 	console.log(Object.keys(compilation.assets))
	// })
	// compiler.hooks.emit.tap('after-compile', compilation => {
	// 	console.log('\n')
	// 	console.log(`HelloPlugin: compiler.hooks.emit.tap @after-compile: aleardy compiled`)
	// 	console.log(Object.keys(compilation.assets))
	// })
	compiler.hooks.emit.tap('done', compilation => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tap @done`)
		console.log(Object.keys(compilation.assets))
		this.options.endStamp = new Date().getTime()
		console.log(chalk.yellow.bold(`=====>>> Build Finished Consuming: ${(this.options.endStamp - this.options.startStamp) / 1000}s <<<=====`))
	})
	compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
		console.log('\n')
		console.log(`HelloPlugin: compiler.hooks.emit.tapAsync @emit: going to emit files`)
		const fileListRes = createFileListContent(Object.keys(compilation.assets))
		compilation.assets[fileListRes.filename] = {
			source() {
				return fileListRes.filecontent
			},
			size() {
				return Buffer.byteLength(fileListRes.filecontent, 'utf8')
			},
		}
		callback()
	})
	// compiler.hooks.emit.tap('after-emit', compilation => {
	// 	console.log('\n')
	// 	console.log(`HelloPlugin: compiler.hooks.emit.tap @after-emit: aleardy emitted`)
	// 	console.log(Object.keys(compilation.assets))
	// })
}

module.exports = HelloPlugin
