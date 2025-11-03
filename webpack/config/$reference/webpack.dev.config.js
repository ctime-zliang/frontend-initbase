const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../../../config/utils')
const webpackPlugins = require('../public/webpack.plugins')
const webpackInitConfig = require('./webpack.init.config')
const webpackDevServerConfig = require('../public/webpack.dev-server.config')

const webpackDevConfig = {
	mode: `development`,
	/* 
        出口配置
			1. 多入口单出口时, 即报错: Multiple chunks emit assets to the same filename ${filename}
     */
	output: {
		publicPath: '/',
		/* 配置输出根目录 */
		path: utils.resolveDirectory(`./webpack/dist/reference/dev-build`),
		/* 配置生成文件名(可带路径) */
		filename: `scripts/build.[name].[hash:8].js`,
		// filename: `scripts/bundle.js`,
		/* 
			在未配置 webpack.optimization 时, webpack 对于形如 import 的动态模块引入打包将使用已配置的 output.chunkFilename 规则来生成文件
		 */
		chunkFilename: `scripts/chunks.[name].[chunkhash:8].js`,
	},
	devServer: webpackDevServerConfig,
	plugins: [
		...webpackPlugins({
			mode: `development`,
			isUseHtmlTemplate: true,
			templateSrc: `rootpath-to-ejs-file`,
		}),
	],
}

module.exports = merge(webpackDevConfig, webpackInitConfig)
