module.exports = {
	/* 
        是否以无头模式运行浏览器
            默认 true
            devtools 为 true 时该项自动设置为 false
     */
	headless: false,
	/*
        在导航期间自动忽略 HTTPS 错误
            默认 false 
     */
	ignoreHTTPSErrors: true,
	/*
        时间慢放
            将操作减少指定的 ms 数
     */
	slowMo: 0,
	/*
        指定用于唤起 Chromium 或 Chrome 的可执行文件路径 
     */
	// executablePath: null,
	/*
        按 Ctrl+C 组合键允许关闭浏览器进程
            默认 true 
     */
	handleSIGINT: true,
	/*
        等待浏览器实例被成功唤起的超时时间 
     */
	timeout: 30000,
	/*
        允许浏览器进程的标准输出和标准错误输入到 process.stdout 和 process.stderr 中
     */
	dumpio: true,
	/*
        用户数据目录 
     */
	// userDataDir: null,
	/*
        环境参数配置
            默认跟随 process.env 
     */
	// env: null,
	/*
        是否启用开发者工具 
     */
	devtools: true,
	/*
        通过管道而非 WebSocket 连接浏览器 
     */
	// pipe: false,
	args: ['–no-sandbox', '--start-maximized'],
	/*
        视口设置及设备设置
     */
	// defaultViewport: {
	// 	// 视口宽度
	// 	width: 1440,
	// 	// 视口高度
	// 	height: 960,
	// 	// 视口缩放比例
	// 	deviceScaleFactor: 1,
	// 	// 是否设置为移动设备状态
	// 	isMobile: false,
	// 	// 是否设置为允许触屏控制
	// 	hasTouch: false,
	// 	// 是否设置为横屏
	// 	isLandscape: false
	// }
}
