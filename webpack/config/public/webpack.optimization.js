const path = require('path')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

module.exports = {
	/*
		启用压缩 
	 */
	// minimize: true,
	/*
		启用压缩
	*/
	minimizer: [
		/*
			启用 ESBuild 代码压缩 
		 */
		new ESBuildMinifyPlugin({
			target: `es2018`,
			minify: true,
		}),
		/*
			启用 uglifyjs-webpack-plugin 插件压缩
				仅配置 webpack.mode === 'production' 时有效
		 */
		// new UglifyjsWebpackPlugin()
		new UglifyjsWebpackPlugin({
			/* 
				test: 匹配需要压缩的文件
				include:  指定包含
				exclude:  指定不包含
				*/
			/*
				启用或关闭缓存
				设置一个合法的路径值赋给该字段将用于指定一个缓存输出目录 
			*/
			cache: false,
			/* 
				启用多线程
				设置一个数字值赋给该字段用于指定最大并发数
			*/
			parallel: true,
			sourceMap: true,
			/* 
				提取注释
			*/
			extractComments: true,
			/*
				返回 true/false 以控制对某个输出文件进行压缩/不压缩 
			*/
			chunkFilter(chunk) {
				console.log(`=====>>>>> uglifyjs-webpack-plugin: ${chunk.name}`)
				return true
			},
		}),
	],
	/* 
		启用模块更新名称标识符标识
	 */
	moduleIds: `named`,
	/* 
		启用基于 package.json 中关于 sideEffects 配置项的剪枝配置
	 */
	sideEffects: true,
	usedExports: true,
	/*
		分割打包 
	 */
	splitChunks: {
		/*
			async - 分割打包异步代码/文件
			all - 分割打包所有代码/文件
			initial - 分割打包异步、同步代码, 但异步内代码不再区分异步同步
		 */
		chunks: `all`,
		/*
			生成 chunk 的最小体积 
		 */
		minSize: 30000,
		automaticNameDelimiter: `.`,
		cacheGroups: {
			/* 
				抽离公共模块
			 */
			default: {
				name: `common`,
				chunks: `all`,
				minChunks: 2,
				priority: -10,
				reuseExistingChunk: true,
			},
			/*
				抽离 node_modules 中的公共依赖到独立的文件 
			 */
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				name: `vendors`,
				chunks: `all`,
				priority: -9,
				reuseExistingChunk: true,
			},
			/*
				抽离 src/public 中的公共模块到独立的文件 
			 */
			public: {
				test: path.resolve('src/public'),
				name: `public`,
				chunks: `all`,
				priority: -8,
				reuseExistingChunk: true,
				enforce: true,
			},
			/*
				抽离 src/assets/style 中的公共样式到独立的文件 
			 */
			public: {
				test: path.resolve('src/assets/style'),
				// test: /\/src\/assets\/style\/*.(css|scss|sass|less)$/,
				name: `style`,
				chunks: `all`,
				priority: -7,
				reuseExistingChunk: true,
				enforce: true,
			},
			// react: {
			// 	test(module) {
			// 		return /react/.test(module.context)
			// 	},
			// 	name: `react`,
			// 	chunks: `all`,
			// 	priority: -6
			// }
		},
	},
}
