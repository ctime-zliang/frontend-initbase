const path = require('path')

module.exports = ({ port }) => {
	return {
		contentBase: path.join(__dirname, '/src/'),
		disableHostCheck: true,
		host: '127.0.0.1',
		compress: true,
		progress: true,
		port: port || 0,
		hot: true,
		open: false,
		inline: true,
		watchContentBase: true,
		historyApiFallback: true,
		writeToDisk: false,
		headers: {
			Cookie: `sessionKey=webpacdevsessionKey; PATH=/;`,
		},
		before(app) {
			app.get('/api/test', (req, res) => {
				res.json({ ret: 0, data: { timeStamp: new Date().getTime() }, msg: `` })
			})
		},
		proxy: {
			'/proxy': {
				target: 'https://cn.bing.com/?FORM=Z9FD1',
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	}
}
