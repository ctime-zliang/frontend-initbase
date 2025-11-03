module.exports = {
	/*
		根目录 
	 */
	rootDir: './',
	/*
		以层级显示地方式在控制台展示测试结果 
	 */
	verbose: true,
	/*
		设置 jest 是否自动 mock 所有导入模块 
	 */
	automock: false,
	/*
		设置在每个测试前是否自动清理 mock 的调用和实例 instance 
	 */
	clearMocks: false,
	/*
		运行前置启动器 
	 */
	setupFiles: ['./config/jest/setup/setup.js'],
	/*
		适用于 jest 运行的基础 json 预设配置 
	 */
	preset: 'jest-puppeteer',
	/* 
		自定义依赖的提取路径
	 */
	// dependencyExtractor: {},
	/*
		抛出有用的错误 
	 */
	errorOnDeprecated: true,
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		路径别名映射
	 */
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'.*\\.(css|less|styl|scss|sass)$': '<rootDir>/config/jest/mocks/cssModule.js',
		'.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/mocks/image.js',
	},
	/*
		文件名后缀缺省预置 
	 */
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	/* 
		模块目录
	 */
	moduleDirectories: ['node_modules', './src'],
	/*
		依赖缓存临时目录
			执行测试时需要读取的依赖的缓存目录
	 */
	cacheDirectory: `./.cache`,
	/*
		测试忽略文件 
	 */
	testPathIgnorePatterns: ['webpack/dist', 'node_modules'],
	/* 
		watch 忽略目录
	 */
	watchPathIgnorePatterns: ['webpack/dist'],
	/* 
		测试对象扫描规则
	 */
	testRegex: './tests/.*\\.(test|spec)\\.(js|jsx)?$',
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		定义测试环境: 
			node
			jsdom
			[path-to-js-file]
	 */
	testEnvironment: 'jsdom',
	// testEnvironment: `./puppeteer/puppeteer-environment.js`,
	/*
		jsdom 测试环境测试地址, 反应在 location.herf 属性上 
	 */
	testURL: 'http://localhost',
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		定义转换器 
	 */
	transform: {
		'^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.(css|less)$': '<rootDir>/config/jest/setup/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/setup/fileTransform.js',
	},
	/*
		在转换时需要被忽略的文件目录 
	 */
	// transformIgnorePatterns: ['./node_modules/'],
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		设置是否收集覆盖率信息 
	 */
	// collectCoverage: true,
	/*
		测试覆盖率输出目录 
	 */
	coverageDirectory: './coverage',
	/* 
		指定哪种程序确定代码覆盖率
			'v8' || 'babel'
	 */
	coverageProvider: 'babel',
	/*
		测试覆盖率收集源(文件/目录) 
	 */
	collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
	/*
		测试覆盖率忽略目录 
			过滤无需统计的代码范围
	 */
	coveragePathIgnorePatterns: ['node_modules', 'config', 'src/types'],
	/*
		测试覆盖率报告规则
	 */
	coverageReporters: ['json-summary', 'text', 'lcov'],
	/*
		指定覆盖率目标
			- branches: 分支覆盖率(是否执行到每个判断语句(块))
			- functions: 函数执行的覆盖率(是否调用到每个函数)
			- lines: 代码函数覆盖率(是否执行了所有代码行) 
			- statements: 表达式覆盖率(是否执行到每个表达式) 
	 */
	coverageThreshold: {
		global: {
			statements: 90,
			branches: 90,
			functions: 90,
			lines: 90,
		},
	},
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		快照 
	 */
	snapshotSerializers: ['enzyme-to-json/serializer'],
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		测试标签(多项目时使用) 
	 */
	// displayName: `jest-test`,
	/*
		最大并发数 
	 */
	// maxConcurrency: 5,
	/*
		最大线程数 
	 */
	// maxWorkers: `50%`,
	/*
		测试结果通知 
	 */
	// notify: true,
	// notifyMode: `always`,
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*********************************** ***********************************/
	/*
		全局变量定义 
	 */
	globals: {
		__DEV__: true,
	},
}
