module.exports = {
	/* 
        指定编译目录限定
            否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件 
     */
	include: ['./src/*'],
	/*
        指定编译文件(路径)限定
            否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件 
     */
	files: ['./src/**/*'],
	/* 需要排除的目录 */
	exclude: ['./tests/*'],
	compilerOptions: {
		/* 
            只编译修改过的文件
                这个时候会生成 tsconfig.tsbuildinfo, 下次编译的时候会进行对比只编译修改过的文件
         */
		incremental: true,
		target: 'es5',
		/*
            模块导出标准 
                'commonjs'
                'amd'
                'system'
                'umd'
                'es2015' 
         */
		module: 'commonjs',
		/* 
            如果未指定--lib, 则会注入默认的 librares 列表
            注入的默认库为:
                对于 --target ES5: DOM,ES5,ScriptHost
                对于 --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
         */
		lib: ['es5', 'dom', 'ScriptHost', 'es2015.promise'],
		/* 允许编译 js */
		allowJs: true,
		/* 检测 js 语法 */
		checkJs: true,
		/*
            指定 jsx 生成标准
                'preserve'
                'react-native'
                'react' 
         */
		jsx: react,
		/* 
            生成 .d.ts 声明文件 
                declaration 和 allowJs 不能同时设为 true
         */
		declaration: true,
		/* 
            为声明文件生成 map
         */
		declarationMap: true,
		/*
            module 为 'amd' 或 'system' 时, 使用此命令可以将ts文件打包到一个目录下 
         */
		outFile: './',
		/* 配置输出目录 */
		outDir: './build',
		/*
            需要编译的源文件根目录 
         */
		rootDir: './src',
		composite: true,
		/* 
            指定文件用来存储增量编译信息, 默认 tsconfig.tsbuildinfo
         */
		tsBuildInfoFile: './',
		/* 
            删除注释
         */
		removeComments: true,
		/* 
            是否生成编译文件(写入外存)
         */
		noEmit: false,
		importHelpers: true,
		/*
            当 target 为 'ES5' 或 'ES3', 为 'for-of', spread, 和 destructuring' 中的迭代器提供完全支持 
         */
		downlevelIteration: true,
		isolatedModules: true,
		/* 严格模式 */
		strict: false,
		/*
            不允许变量或函数参数具有隐式 any 类型
                通常用于函数参数定义
         */
		noImplicitAny: true,
		/* 
            null 类型检测
                const teacher: string = null 将被判定为不合法的声明
         */
		strictNullChecks: true,
		/* 对函数参数进行严格逆变比较 */
		strictFunctionTypes: true,
		/* 严格检查 bind call apply */
		strictBindCallApply: true,
		/* 验证构造函数内部初始化前后已定义的属性 */
		strictPropertyInitialization: true,
		/* 检测 this 是否隐式指定 */
		noImplicitThis: true,
		/* 
            使用 js 的严格模式
                声明 use strict 
         */
		alwaysStrict: false,
		/* 检测未使用的变量 */
		noUnusedLocals: true,
		/* 检测未使用的函数参数 */
		noUnusedParameters: true,
		/* 检测函数体是否存在显式 return */
		noImplicitReturns: true,
		/* 检测 switch 中是否有 case 未使用 break 跳出 switch */
		noFallthroughCasesInSwitch: true,
		/* Module Resolution Options */
		/*
            选择模块解析策略
                'node'
                'classic' 
         */
		moduleResolution: 'node',
		baseUrl: './',
		paths: {},
		rootDirs: [],
		/* 
            指定声明文件或文件夹的路径列表
                只有在列表中的声明文件才会被加载
         */
		typeRoots: [],
		/*
            指定需要包含的模块
                只有在列表中的声明文件才会被加载进来 
         */
		types: [],
		/* 允许从没有默认导出的模块中默认导入 */
		allowSyntheticDefaultImports: true,
		/* 
            通过为导入内容创建命名空间
                实现 CommonJS 和 ES 模块之间的互操作性 
         */
		esModuleInterop: true,
		/*
            禁止将符号链接解析为真实路径
         */
		preserveSymlinks: true,
		allowUmdGlobalAccess: true,
		/* 指定调试器应该找到TypeScript文件而不是源文件的位置 */
		sourceRoot: '',
		/* 
            指定调试器找到映射文件而非生成文件的位置, 指定 map 文件的根路径
                该选项会影响.map文件中的sources属性
         */
		mapRoot: '',
		/*
            指定是否将 map 文件和 js 文件编译在同一个 js 文件中
                为 true 则 map 的内容会以 //#soureMappingURL= 开头并采用 base64 字符串的形式插入在 js 文件底部 
         */
		inlineSourceMap: true,
		/* 指定是否进一步将 ts 文件的内容也包含到输出文件中 */
		inlineSources: true,
		/* 指定是否启用实验性的装饰器特性 */
		experimentalDecorators: true,
		emitDecoratorMetadata: true,
		/*
            编辑并保存项目中的文件时, IDE 会根据 tsconfig.json 中的配置重新生成文件
                此功能需要编辑器/IDE 支持 
         */
		compileOnSave: true,
		references: [],
	},
}
