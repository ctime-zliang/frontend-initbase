const esbuild = require('esbuild')
const fs = require('fs-extra')
const path = require('path')
const lessLoader = require('./plugins/lessLoader')
const htmlInject = require('./plugins/htmlInject')

class DevelopmentBuidler {
	constructor() {
		this._startTime = Date.now()
	}

	async start() {
		try {
			await this.prepareDist()
			this.ctx = await esbuild.context(this.getBuildConfig())
			await this.initialBuild()
			await this.startWatching()
			await this.startServer()
		} catch (error) {
			console.error('❌ 开发服务器启动失败:', error)
			process.exit(1)
		}
	}

	getBuildConfig() {
		return {
			entryPoints: ['./srcReact/client/index.tsx'],
			bundle: true,
			outdir: './dist/srcReact',
			format: 'iife',
			platform: 'browser',
			target: 'es2015',
			loader: {
				'.ts': 'ts',
				'.tsx': 'tsx',
				'.js': 'jsx',
				'.jsx': 'jsx',
				'.png': 'file',
				'.jpg': 'file',
				'.svg': 'file',
				'.css': 'css',
				'.json': 'json',
			},
			jsx: 'automatic',
			sourcemap: 'linked',
			minify: false,
			metafile: true,
			logLevel: 'info',
			define: {
				'process.env.NODE_ENV': '"development"',
				global: 'window',
			},
			plugins: [htmlInject, lessLoader, this.getWatchPlugin()],
		}
	}

	getWatchPlugin() {
		return {
			name: 'dev-server-plugin',
			setup: build => {
				build.onEnd(result => {
					this.buildCount++
					this.onBuildEnd(result)
				})

				build.onStart(() => {
					console.log('🔨 开始构建...')
				})
			},
		}
	}

	onBuildEnd(result) {
		const time = new Date().toLocaleTimeString()
		const duration = Date.now() - this.startTime
		if (result.errors.length > 0) {
			console.log(`❌ [${time}] 构建失败 (${this.buildCount})`)
			result.errors.forEach((error, index) => {
				console.log(`  ${index + 1}. ${error.text}`)
			})
		} else {
			const files = Object.keys(result.metafile.outputs)
			const jsFiles = files.filter(f => f.endsWith('.js'))
			const cssFiles = files.filter(f => f.endsWith('.css'))
			console.log(`✅ [${time}] 构建成功 (${this.buildCount})`)
			console.log(`   📦 JS: ${jsFiles.length} 个, CSS: ${cssFiles.length} 个`)
			console.log(`   ⏱️  运行时间: ${duration}ms`)
		}
		this.startTime = Date.now()
	}

	async prepareDist() {
		await fs.emptyDir('./dist/srcReact')
		console.log('📁 输出目录已准备')
	}

	async initialBuild() {
		console.log('🚀 执行初始构建...')
		await this.ctx.rebuild()
	}

	async startWatching() {
		await this.ctx.watch()
		console.log('👀 开始监听文件变化...')
	}

	async startServer() {
		const result = await this.ctx.serve({
			servedir: './dist/srcReact',
			port: 12001,
			host: '127.0.0.1',
			fallback: './dist/srcReact/index.html',
		})
		console.log(`🌐 开发服务器: http://${result.hosts[0]}:${result.port}`)
	}
}

const builder = new DevelopmentBuidler()
builder.start().catch(console.error)
