const utils = require('../../../config/utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const progressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HelloPlugin = require('./user-webpack-plugins/hello-plugins')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const chalk = require('chalk')

const helloPluginConfg = {
	development: {
		name: 'c.zliang',
		rootBuildPath: utils.resolveDirectory('./webpack/dist/dev-build'),
	},
	production: {
		name: 'c.zliang',
		rootBuildPath: utils.resolveDirectory('./webpack/dist/prod-build'),
	},
}

module.exports = ({ mode, isUseHtmlTemplate, templateSrc }) => {
	const _helloPluginConfg = helloPluginConfg[mode]
	const plugins = []
	if (isUseHtmlTemplate) {
		plugins.push(
			/*
				自动生成一个可访问的 html 文件并将资源文件引入 
			*/
			new HtmlWebpackPlugin({
				title: 'Webpack Build Test',
				filename: `./index.html`,
				template: templateSrc,
				// templateContent(templateParams, compilation, callback) {
				// 	// Return your template content asynchronously here
				// 	callback(null, '..')
				// },
				// favicon: `path-to-log-src`,
				inject: true,
				hash: false,
				cache: true,
				showErrors: true,
				minify: {
					minifyCSS: true,
					minifyJS: true,
				},
			})
		)
	}
	// plugins.push(
	// 	/*
	// 		压缩输出 js 文件
	// 	*/
	// 	new UglifyjsWebpackPlugin(),
	// )
	plugins.push(
		/* 
			用户自定义插件
		*/
		new HelloPlugin(_helloPluginConfg)
	)
	plugins.push(
		/* 
			抽离 CSS 为单独的文件
		*/
		new MiniCssExtractPlugin({
			/* 配置生成文件名(可带路径) */
			filename: `assets/styles/style.[name].[hash:8].css`,
			/* 控制从打包后的非入口 JS 文件中提取 CSS 样式生成的 CSS 文件的名称 */
			chunkFilename: `assets/styles/chunks.[name].[chunkhash:8].css`,
			/*
				当
					在 1.js 中分别前后引入 a.css 和 b.css
					在 2.js 中分别前后引入 b.css 和 a.css
				则
					如果此项为 true, 则开启因顺序不一致的导致的警告, 反之则关闭警告
			*/
			ignoreOrder: false,
			/* 
				用于将附加的键值对属性数据写入到 <link /> 节点
					只适用于动态加载的 css chunk
			*/
			attributes: { id: `link${new Date().getTime()}` },
		})
	)
	plugins.push(
		/*
			定义运行中的全局常量 
		*/
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(mode),
		})
	)
	// plugins.push(
	// 	/*
	// 		eslint 插件
	// 	*/
	// 	new ESLintPlugin({
	// 		/* 待检测的文件扩展名(列表) */
	// 		extensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
	// 	}),
	// )
	plugins.push(
		/*
			编译进度条 
		*/
		new progressBarWebpackPlugin({
			format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
		})
	)
	plugins.push(
		/* 
			启用热重载
		*/
		new webpack.HotModuleReplacementPlugin()
	)
	plugins.push(
		/*
			React 热更新
		 */
		new ReactRefreshWebpackPlugin()
	)
	if (mode === 'production') {
		plugins.push(
			/*
				打包文件体积分析 
			 */
			new BundleAnalyzerPlugin({
				analyzerPort: 0,
			})
		)
	}
	return plugins
}
