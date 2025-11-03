const baseStats = {
	assetsSpace: 15,
	modulesSpace: 15,
	chunkModulesSpace: 15,
	nestedModules: true,
	nestedModulesSpace: 15,
	/*
        是否展示资源信息 
     */
	assets: false,
	/*
        资源排序依据
            !name 表示反序 
     */
	// assetsSort: 'name',
	/*
        构建时增加时间与日期信息 
     */
	builtAt: true,
	/*
        是否添加模块内的资源信息 
     */
	moduleAssets: true,
	/*
        是否要缓存(非内置)模块的信息
            同  cachedAssets
     */
	cached: false,
	/*
        是否要缓存(非内置)模块的信息 
        是否添加关于缓存资源的信息
     */
	cachedAssets: false,
	/*
        否要添加运行时模块的信息 
     */
	runtimeModules: true,
	/*
        是否要展示该 chunk 依赖的其他模块的 chunk 模块 
     */
	dependentModules: false,
	/*
        是否按照 asset 与 chunk 的关系进行分组 
     */
	// groupAssetsByChunk: false,
	/* 
         是否按照 asset 的状态进行分组
            emitted, 对比 emit 或缓存
     */
	// groupAssetsByEmitStatus: false,
	/*
        是否根据它们的拓展名聚合静态资源 
     */
	groupAssetsByExtension: false,
	/*
        是否按照 asset 信息对 asset 进行分组
            immutable, development. hotModuleReplacement 等 
     */
	groupAssetsByInfo: false,
	/*
        是否根据它们的路径聚合静态资源 
     */
	groupAssetsByPath: false,
	/*
        是否按模块的属性进行分组
            errors, warnings, assets, optional, orphan 或者 dependent 
     */
	groupModulesByAttributes: false,
	/*
        是否按模块的缓存状态进行分组
            已缓存或者已构建并且可缓存 
     */
	groupModulesByCacheStatus: false,
	/* 
        是否按模块的拓展名进行分组
     */
	groupModulesByExtension: false,
	/*
        是否按模块的 layer 进行分组 
     */
	groupModulesByLayer: false,
	/*
        是否按模块的路径进行分组 
     */
	groupModulesByPath: false,
	/*
        是否按模块的类型进行分组 
     */
	groupModulesByType: false,
	groupReasonsByOrigin: false,
	/* 
        是否添加关于 chunk 的信息
            将 stats.chunks 设置为 false 会引发更少的输出
     */
	chunks: false,
	chunkModules: false,
	/*
        是否添加关于子模块的信息 
     */
	children: false,
	/*
        是否添加关于 namedChunkGroups 的信息 
     */
	chunkGroups: true,
	/*
        是否添加关于已构建模块和关于 chunk 的信息 
     */
	chunkModules: true,
	/*
        是不添加关于 chunks 的来源和 chunk 合并的信息 
     */
	chunkOrigins: false,
	/*
        基于给定的字段给 chunks 排序 
     */
	// chunksSort: 'id',
	/* 
        设置文件请求的上下文
     */
	// context: `./src/`,
	/*
        是否输出不同的颜色 
     */
	colors: true,
	/*
        是否展示每个模块与入口文件的距离 
     */
	depth: true,
	/*
        是否展示入口文件与对应的文件 bundles 
     */
	entrypoints: true,
	/*
        是否展示 --env 信息 
     */
	env: true,
	/*
        是否隐藏孤儿(orphan)模块 
            孤儿(orphan): 任意一个模块如果它不被包含在任何一个 chunk 里
     */
	orphanModules: false,
	/*
        是否展示错误 
     */
	errors: true,
	/*
        是否添加错误的详情
            auto - 当只有 2 个或更少的错误时，它将显示错误详情 
     */
	errorDetails: 'auto',
	/*
        是否展示错位的栈追踪信息 
     */
	errorStack: true,
	/*
        是否添加关于编译哈希值的信息 
     */
	hash: false,
	/*
        显示日志类型
            none - 禁用日志
            false - 禁用日志
            error - 仅显示错误日志
            warn - 仅显示错误与警告
            info - 显示错误, 警告与信息
            log - 显示错误, 告警与信息, 日志, 组别, 清理
            true - 同 log
            verbose - 输出所有日志除了调试与追踪
     */
	logging: `log`,
	/*
        启用错误
            告警与追踪的日志输出中的堆栈追踪 
     */
	loggingTrace: true,
	/*
        添加告警 
     */
	warnings: true,
	/*
        是否添加关于构建模块的信息 
     */
	modules: false,
	/*
        基于给定的字段对资源进行排序 
     */
	// modulesSort: 'id',
	/*
        展示依赖和告警/错误的来源 
     */
	// moduleTrace: false,
	/*
        展示模块优化失效的原因 
     */
	optimizationBailout: true,
	/* 
         展示 outputPath
     */
	outputPath: true,
	/*
         展示 publicPath 
     */
	publicPath: true,
	/*
        当文件大小超过 performance.maxAssetSize 配置值时, 展示性能提性 
     */
	performance: true,
	/*
        添加展示 errors 个数 
     */
	errorsCount: true,
	/*
        添加展示 warnings 个数 
     */
	warningsCount: true,
	/*
        添加关于模块被引用的原因信息 
     */
	reasons: true,
	/*
        是否需添加与其他 assets 相关的信息 
     */
	relatedAssets: true,
	/*
        添加模块的源码
     */
	source: true,
	/*
        添加时间信息 
     */
	timings: true,
	/*
        给 module 和 chunk 添加 id 
     */
	ids: true,
	/*
        是否展示模块用了哪些导出 
     */
	usedExports: true,
	/*
        添加关于 webpack 版本的信息 
     */
	version: true,
	/*
        显示 chunk 组的子 chunk 
     */
	chunkGroupChildren: true,
}

module.exports = { ...baseStats }
