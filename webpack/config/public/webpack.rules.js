const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('../../../config/utils')

const cssLoaderOptions = {
	/* 启用/禁用 ES6模块 */
	esModule: false,
	/* 启用/禁用压缩 */
	// minimize: false,
	/* 启用/禁用 @import 语法解析 */
	import: true,
	/* 启用/禁用 url 解析 */
	url: true,
	/* 以驼峰命名方式到处 class 类名 */
	// camelCase: false,
	/* 启用/禁用 sourceMap */
	sourceMap: true,
	/* 在编译后的 url 字符串中前置该 key 值  */
	// root: `.`
}

const cssLoaderModuleOptions = {
	...cssLoaderOptions,
	modules: {
		mode: 'local',
		/* 指定自定义的哈希类型 */
		localIdentHashSalt: `hash`,
		/* 哈希类型 */
		localIdentHashFunction: `md4`,
		/* 哈希摘要类型 */
		localIdentHashDigest: `base64`,
		localIdentContext: path.resolve(__dirname, `../src`),
		/* 生成 class-name 格式定义 */
		localIdentName: `[name]_-[hash:base64:8]`,
		// exportLocalsConvention: `camelCase`,
		/* 
			启用/禁用 ES 模块导出 
				启用后, 可以在 JS 模块中直接引入以 class-name 作为模块名的模块
				// style.css
				.foo-bar { color: red; }
				// index.js
				import { fooBar } from './style.css'
		*/
		namedExport: false,
	},
}

const lessLoaderOptions = {
	/* 是否启用 sourceMap */
	sourceMap: true,
	/* 启用/禁用 webpack 默认的 importer */
	webpackImporter: true,
	// lessOptions: {
	//     strictMath: false,
	// }
	/* 选项 */
	lessOptions(loaderContext) {
		return {
			/* 内联脚本支持 */
			javascriptEnabled: true,
			strictMath: false,
		}
	},
}

const miniCssExtractPluginLoaderOption = {
	/* 
		设置 CSS 引用资源文件的前置路径
			将导致 CSS 代码内对资源的引用路径变成: `${publicPath}/${filename}`
	*/
	// publicPath: `../assets-images/`,
	publicPath: `../`,
}

const iniFileLoader = {
	test: /\.ini$/,
	exclude: /node_modules/,
	// include: /src/
	use: [
		{
			loader: `ini-translate-loader`,
			options: {
				loaderTitle: `ini-translate-loader`,
			},
		},
		{
			loader: `ini-parser-loader`,
			options: {
				loaderTitle: `ini-parser-loader`,
			},
		},
	],
}

const jsxBabelLoader = {
	test: /\.js[x]?$/,
	exclude: /node_modules/,
	// /*
	//     需一并安装 @babel/core
	//  */
	// loader: `babel-loader`,  // use: `babel-loader`
	use: [
		{
			loader: `babel-loader`,
		},
	],
}
const tsxBabelLoader = {
	test: /\.ts[x]?$/,
	exclude: /node_modules/,
	use: [
		{
			loader: `babel-loader`,
		},
	],
}

const jsxEsbuildLoader = {
	test: /\.(js|jsx)$/,
	// exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}
const tsxEsbuildLoader = {
	test: /\.(ts|tsx)$/,
	// exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'tsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}

const lessLoader = {
	test: /\.less$/,
	exclude: /\.module\.less$/,
	use: [
		// {
		// 	loader: `style-test-loader`,
		// },
		// {
		// 	/*
		// 		创建 <style /> 并写入 css 样式代码
		// 	 */
		// 	loader: `style-loader`,
		// 	options: {
		// 		/* 定义需要写入到 <style /> 节点上的属性 */
		// 		attributes: {
		// 			id: String(Math.random())
		// 		},
		// 		/* <style /> 节点插入位置 */
		// 		insert: `head`,
		// 		/*
		// 			配置 <style /> 节点的组织内容
		// 			配置 <style /> 节点插入到 HTML DOM 的方式
		// 		*/
		// 		injectType: `styleTag`  // default: styleTag
		// 	}
		// },
		{
			/* 
				提取 css 样式代码到单独的文件
			 */
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			/*
				处理 @import url() 语句或标识符 
				将 css 样式代码转成 js 模块
				处理引用资源并定义解析方式
			 */
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			/*
				将 css 转换成 AST
			 */
			loader: `postcss-loader`,
		},
		{
			/*
				需一并安装 less 
			 */
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}
const lessModuleLoader = {
	test: /\.module\.less$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}
const cssLoader = {
	test: /\.css$/,
	exclude: /\.module\.css$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}
const cssModuleLoader = {
	test: /\.module\.css$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
	],
}

const urlFileLoader = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	// exclude: /node_modules/,
	use: [
		{
			loader: `url-loader`,
			options: {
				/*
					若
						使用较高版本的 css-loader(ver >= 6.x.x) 且 在配置中设置 esModule = true (默认即为 true)
					当
						在当前 loader(url-loader) 中配置了局部输出路径( name 中携带路径或 outputPath 为有效的路径值)
					则
						需要在 MiniCssExtractPlugin.loader.options.publicPath 中讲该路径手动补充上去
					也即
						css-loader(ver >= 6.x.x) 不会将 url-loader 中的输出路径自动写入 MiniCssExtractPlugin.loader.options.publicPath
					否则
						无需补充该路径
				 */
				/* 配置生成文件名(可带路径) */
				name: `[name].[hash:8].[ext]`,
				/*
					指定输出的局部目录设置
						可附加到 name 设置项 
				 */
				outputPath: `assets/images/`,
				/* 
					设置 base64 转换上限
						图片尺寸小于此限制, 此 loader 会将其转换成 base64
						图片尺寸大于此限制, 将调用 file-loader 进行转换
				*/
				limit: 1024 * 8,
				esModule: false,
			},
		},
	],
}

const fileLoader = {
	test: /\.(woff|eot|ttf|svg|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 1024 * 8,
		name: `[name].[hash:8].[ext]`,
		esModule: false,
	},
}

module.exports = [
	{
		// oneOf: [
		// 	jsxBabelLoader,
		// 	tsxBabelLoader,
		// 	urlFileLoader,
		// 	lessModuleLoader,
		// 	cssModuleLoader,
		// 	lessLoader,
		// 	cssLoader,
		// 	iniFileLoader,
		// 	fileLoader
		// ],
		oneOf: [
			jsxEsbuildLoader,
			tsxEsbuildLoader,
			urlFileLoader,
			lessModuleLoader,
			cssModuleLoader,
			lessLoader,
			cssLoader,
			iniFileLoader,
			fileLoader,
		],
	},
]
