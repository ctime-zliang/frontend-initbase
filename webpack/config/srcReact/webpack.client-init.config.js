const path = require('path')
const utils = require('../../../config/utils')
const webpackRules = require('../public/webpack.rules')
const webpackStats = require('../public/webpack.stats')
const webpackExternals = require('../public/webpack.externals')
const webpackOptimization = require('../public/webpack.optimization')

console.log(`__dirname: `, __dirname)
console.log(`process.cwd: `, process.cwd())

const webpackBaseConfig = {
	name: `client`,
	target: `web`,
	cache: {
		type: `filesystem`,
	},
	entry: {
		main: utils.resolveDirectory(`./srcReact/client/index.tsx`),
	},
	module: {
		rules: webpackRules,
	},
	resolveLoader: {
		modules: ['node_modules', utils.resolveDirectory('./webpack/config/public/user-webpack-loaders')],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'vue'],
		enforceExtension: false,
		alias: {
			srcReact: path.resolve('./srcReact'),
		},
	},
	performance: {
		hints: `warning`,
		maxAssetSize: 40000000,
		maxEntrypointSize: 60000000,
	},
	optimization: webpackOptimization,
	stats: webpackStats,
	externals: webpackExternals,
}

module.exports = webpackBaseConfig
