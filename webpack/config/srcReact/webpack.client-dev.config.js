const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../../../config/utils')
const webpackPlugins = require('../public/webpack.plugins')
const webpackInitConfig = require('./webpack.client-init.config')
const webpackDevServerConfig = require('../public/webpack.dev-server.config')

const webpackDevConfig = {
	mode: `development`,
	output: {
		publicPath: '/',
		path: utils.resolveDirectory(`./webpack/dist/react/dev-build`),
		filename: `scripts/build.[name].[hash:8].js`,
		chunkFilename: `scripts/chunks.[name].[chunkhash:8].js`,
	},
	devServer: webpackDevServerConfig({ port: 12001 }),
	plugins: [
		...webpackPlugins({
			mode: `development`,
			isUseHtmlTemplate: true,
			templateSrc: `./srcReact/app/template/index.ejs`,
		}),
	],
}

module.exports = merge(webpackDevConfig, webpackInitConfig)
