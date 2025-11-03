const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../../../config/utils')
const webpackPlugins = require('./webpack.plugins')
const webpackInitConfig = require('./webpack.client-init.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	mode: `production`,
	output: {
		publicPath: '/',
		path: utils.resolveDirectory(`./webpack/dist/react/prod-build`),
		filename: `scripts/build.[name].[hash:8].js`,
		chunkFilename: `scripts/chunks.[name].[chunkhash:8].js`,
	},
	devServer: webpackDevServerConfig,
	plugins: [
		...webpackPlugins({
			mode: `production`,
			isUseHtmlTemplate: true,
			templateSrc: `./srcReact/app/template/index.ejs`,
		}),
	],
}

module.exports = merge(webpackDevConfig, webpackInitConfig)
