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
	/* 
		启用缓存
	 */
	cache: {
		/* 文件缓存 */
		type: `filesystem`,
	},
	/* 
        入口配置
     */
	// entry: utils.resolveDirectory(`rootpath-to-build-entry-file`),
	entry: {
		main: utils.resolveDirectory(`rootpath-to-build-entry-file`),
		// index: utils.resolveDirectory(`rootpath-to-build-entry-file`),
		// index: [
		// 	utils.resolveDirectory(`rootpath-to-build-entry-file1`),
		// 	utils.resolveDirectory(`rootpath-to-build-entry-file2`),
		// ]
	},
	module: {
		rules: webpackRules,
	},
	/*
		定义 loader 的引入目录范围 
	 */
	resolveLoader: {
		modules: ['node_modules', utils.resolveDirectory('./webpack/config/public/user-webpack-loaders')],
	},
	/*
		定义模块路径配置 
	 */
	resolve: {
		/*
			定义路径别名 
		 */
		alias: {
			'@': path.resolve('./src/'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'vue'],
		/*
			在 node_modules 读取模块的 package.json 时需要优先读取的入口字段
		 */
		// mainFields: ['main', 'index', 'browser'],
		/*
			引入目录模块时, 需要从入口文件开始读取, 此即配置该入口文件名的名称 
		 */
		// mainFiles: ['index'],
		/*
			定义三方包的查找范围(数组顺序决定优先级)
		 */
		modules: ['node_modules'],
		/*
			配置描述第三方模块的文件名称 
		 */
		descriptionFiles: ['package.json'],
		/* 
			强制在引入模块时必须补充文件后缀名
		 */
		enforceExtension: false,
	},
	performance: {
		hints: `warning`,
		/*
			生成文件的最大体积 
		 */
		maxAssetSize: 40000000,
		/*
			入口起点的最大体积 
		 */
		maxEntrypointSize: 60000000,
		// assetFilter(assetFilename) {
		// 	return !(/\.map$/.test(assetFilename))
		// },
	},
	/*
		优化配置 
	 */
	optimization: webpackOptimization,
	stats: webpackStats,
	externals: webpackExternals,
}

module.exports = webpackBaseConfig
