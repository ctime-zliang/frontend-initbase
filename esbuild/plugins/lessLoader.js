const esbuild = require('esbuild')
const less = require('less')
const path = require('path')
const fs = require('fs')

module.exports = {
	name: 'less',
	setup(build) {
		build.onLoad({ filter: /\.less$/ }, async args => {
			try {
				const lessSource = await fs.promises.readFile(args.path, 'utf8')
				const result = await less.render(lessSource, {
					filename: args.path,
					paths: [path.dirname(args.path)],
				})
				return {
					contents: result.css,
					loader: 'css',
					resolveDir: path.dirname(args.path),
				}
			} catch (error) {
				return {
					errors: [
						{
							text: error.message,
							detail: error,
						},
					],
				}
			}
		})
	},
}
