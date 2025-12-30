;(globalScope => {
	/**
	 * 模式
	 */
	const MODES = [0, 1, 2]
	/**
	 * 画布尺寸(各模式下画布尺寸设置)
	 * 		[MODES[0], MODES[1], MODES[2]]
	 */
	const CANVAS_RECTS = [
		[0, 0],
		[141, 64],
		[141, 78],
	]
	/**
	 * 记录数据配置项
	 * 		[参数项目采样数据集长度(数组长度), 参数项目每份数据渲染宽度]
	 */
	const RECORD_CONFIG = [24, 3]
	/**
	 * 区域尺寸
	 * 		[参数项目起始坐标 X, 参数项目起始坐标 Y, 参数项目占据宽度, 参数项目占据高度]
	 */
	const ELEMENTS_RECT = [
		[[0, 0, 0, 0]],
		[
			[0, 0, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // RAF 数值文本
			[0, 14, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // RAF 折线图示
			[0, 32, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // RIC 数值文本
			[42, 32, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // 刷新间隔数值文本
			[0, 46, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // RIC 折线图示
			[71, 0, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // CPU USAGE 数值文本
			[71, 14, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // CPU USAGE 折线图示
			[71, 32, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // MEMORY 数值文本
			[71, 46, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // MEMORY 折线图示
		],
		[
			[0, 0, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // RAF 数值文本
			[0, 14, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // RAF 折线图示
			[0, 32, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // RIC 数值文本
			[42, 32, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // 刷新间隔数值文本
			[0, 46, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // RIC 折线图示
			[0, 64, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // Performance 统计内存数值文本
			[71, 0, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // CPU USAGE 数值文本
			[71, 14, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // CPU USAGE 折线图示
			[71, 32, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 14], // Performance 统计内存数值文本
			[71, 46, (RECORD_CONFIG[0] - 1) * RECORD_CONFIG[1], 18], // Performance 统计内存折线图示
		],
	]
	/**
	 * 配置项
	 * 		[
	 * 			文本字体大小,
	 * 			文本颜色: [正常, 告警, 严重],
	 * 			折线图颜色: [描边颜色, 填充颜色]
	 * 		]
	 */
	const COMMON_SETTING = [
		10,
		['rgba(0, 255, 0, 1.0)', 'rgba(255, 126, 82, 1.0)', 'rgba(255, 0, 0, 1.0)'],
		['rgba(17, 125, 187, 1.0)', 'rgba(120, 233, 232, 0.85)'],
	]
	/**
	 * 阶段告警阈值
	 * 		[帧率(数值), CPU 使用率(比率), 系统内存占用率(比率)]
	 */
	const THRESHOLDS = [
		[20, 30],
		[0.8, 0.9],
		[0.8, 0.9],
	]
	/**
	 * 运行配置
	 * 		[显示运行模式, JavaScript 脚本统计数据刷新间隔, Chrome 插件系统参数刷新间隔]
	 */
	const RUN_PROFILE = [MODES[1], 200, 200 * 3]
	/* ... */
	const STYLE_CLASSNAME_PREFIEX = '_performance-monitor-container'
	const CONTAINER_STYLE = `
		display: flex;
		position: fixed; 
		top: 2px;
		left: 2px;
		padding: 3px 4px 4px 4px;
		opacity: 1;
		border: 1px solid rgba(50, 50, 50, 1);
		border-radius: 2px;
		background-color: rgba(25, 25, 25, 0.85);
		box-shadow: rgba(75, 75, 75, 0.35) 0 0 5px;
		z-index: 999999999;
		-webkit-transform: translate3d(0, 0, 1px) scale(1.0);
		-moz-transform: translate3d(0, 0, 1px) scale(1.0);
		transform: translate3d(0, 0, 1px) scale(1.0);
	`
	const CONTAINER_HOVER_STYLE = `
		display: none !important;
		opacity: 0.35 !important;
		background-color: rgba(25, 25, 25, 0) !important;
	`
	const styleProfile = {
		cssText: `
            .${STYLE_CLASSNAME_PREFIEX} {
                ${CONTAINER_STYLE}
            }
			.${STYLE_CLASSNAME_PREFIEX}-hidden {
                ${CONTAINER_HOVER_STYLE}
            }
        `,
	}
	const cacheProfile = {
		containerElement: null,
		mainCanvasElement: null,
		/* ... */
		panelRect: { x: 0, y: 0, left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 },
		/* ... */
		visiblityChangeTimer: null,
		visibilityState: 'visible',
		/* ... */
		ctx: null,
		maxBlockInterval: 0,
		refreshViewDiffTime1: 0,
		prevRefreshViewTimeStamp1: 0,
		refreshViewDiffTime2: 0,
		prevRefreshViewTimeStamp2: 0,
		/* ...*/
		totalJSHeapSizeValueList: [],
		/* ... */
		/**
		 * 每轮刷新周期内计算出的匹配帧率
		 */
		rAFRatioCycleAverage: 0,
		rAFRatioCycleAverageList: [],
		/**
		 * 生命周期内记录到的最大匹配帧率
		 */
		maxRAFRatioCycleAverage: 60,
		/**
		 * 由两次相邻 RAF 运行计算出的 RAF 瞬时帧率
		 */
		rAFRatioInstant: 0,
		/**
		 * 每轮刷新周期内 RAF 的执行次数
		 */
		rAFIntervalCount: 0,
		/**
		 * 每轮 RAF 的执行时间戳
		 */
		prevRAFExecuteTimeStamp: 0,
		/* ... */
		/**
		 * 每轮刷新周期内计算出的线程繁忙程度
		 */
		rIdleRatioCycleAverage: 0,
		rIdleRatioCycleAverageList: [],
		/**
		 * 每轮刷新周期内 RIC 的执行次数
		 */
		rICIntervalCount: 0,
		/* ... */
		/**
		 * CPU 使用率
		 */
		cpuUsageRatioCycleAverage: 0,
		cpuUsageRatioCycleAverageList: [],
		/* ... */
		memoryTotalSize: 0,
		memoryUsageSize: 0,
		/**
		 * 内存使用率
		 */
		memoryUsageRatioCycleAverage: 0,
		memoryUsageRatioCycleAverageList: [],
	}

	/****************************************************************************************************/
	/****************************************************************************************************/
	/****************************************************************************************************/

	const initManager = {
		createHtmlString() {
			return `<div class="${STYLE_CLASSNAME_PREFIEX}"><canvas></canvas></div>`
		},
		handleStorage() {
			try {
				const _performance_mode = globalScope.localStorage.getItem('_performance_mode')
				if (_performance_mode === null || isNaN(+_performance_mode) || !MODES.includes(+_performance_mode)) {
					globalScope.localStorage.setItem('_performance_mode', RUN_PROFILE[0])
					return
				}
				RUN_PROFILE[0] = +_performance_mode
			} catch (e) {}
		},
		initViewStyle() {
			const styleElement = document.createElement('style')
			styleElement.type = 'text/css'
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = styleProfile.cssText
			} else {
				styleElement.appendChild(document.createTextNode(styleProfile.cssText))
			}
			;(document.head || document.getElementsByTagName('head')[0]).appendChild(styleElement)
		},
		initViewElement() {
			;(document.body || document.getElementsByTagName('body')[0]).appendChild(
				document.createRange().createContextualFragment(initManager.createHtmlString())
			)
		},
		initDomElementHandler() {
			cacheProfile.containerElement = document.querySelector(`.${STYLE_CLASSNAME_PREFIEX}`)
			cacheProfile.mainCanvasElement = cacheProfile.containerElement.getElementsByTagName('canvas')[0]
		},
	}

	const operaManager = {
		updateContainerVisible() {
			if (!MODES.slice(1).includes(RUN_PROFILE[0])) {
				cacheProfile.containerElement.style.display = 'none'
				return
			}
			cacheProfile.containerElement.style.display = 'flex'
		},
		updateCanvasRect() {
			cacheProfile.mainCanvasElement.width = CANVAS_RECTS[RUN_PROFILE[0]][0]
			cacheProfile.mainCanvasElement.height = CANVAS_RECTS[RUN_PROFILE[0]][1]
			cacheProfile.mainCanvasElement.style.width = `${CANVAS_RECTS[RUN_PROFILE[0]][0]}px`
			cacheProfile.mainCanvasElement.style.height = `${CANVAS_RECTS[RUN_PROFILE[0]][1]}px`
		},
		calcMatchColor(nowValue, steps, isRatio, refValue, isPositive) {
			const [s0, s1] = [isRatio ? refValue * steps[0] : steps[0], isRatio ? refValue * steps[1] : steps[1]]
			if (isPositive) {
				return nowValue >= s1 ? COMMON_SETTING[1][2] : nowValue >= s0 && nowValue < s1 ? COMMON_SETTING[1][1] : COMMON_SETTING[1][0]
			}
			return nowValue < s0 ? COMMON_SETTING[1][2] : nowValue >= s0 && nowValue < s1 ? COMMON_SETTING[1][1] : COMMON_SETTING[1][0]
		},
		spliceOverSize(prop) {
			if (cacheProfile[prop].length >= RECORD_CONFIG[0] + 1) {
				cacheProfile[prop] = cacheProfile[prop].slice(cacheProfile[prop].length - RECORD_CONFIG[0], cacheProfile[prop].length)
			}
		},
	}

	const eventManager = () => {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message.action === 'USR_CHANGE_MODE') {
				if (MODES.includes(+message.data.modeValue)) {
					try {
						globalScope.localStorage.setItem('_performance_mode', ((RUN_PROFILE[0] = +message.data.modeValue), RUN_PROFILE[0]))
					} catch (e) {}
					refresh()
				}
				return
			}
			if (message.action === 'USR_GET_SYSINFO') {
				const AREA_RECT = ELEMENTS_RECT[RUN_PROFILE[0]]
				samplingCallbackManager.calcSystemInfoCommonData(message.data)
				samplingCallbackManager.calcSystemCpuUsageRatioPolylineData(AREA_RECT[6][1], AREA_RECT[6][3])
				samplingCallbackManager.calcSystemMemoryUsageRatioPolylineData(AREA_RECT[8][1], AREA_RECT[8][3])
				operaManager.spliceOverSize('cpuUsageRatioCycleAverageList')
				operaManager.spliceOverSize('memoryUsageRatioCycleAverageList')
				return
			}
		})
		const containerMouseEnterHandler = evte => {
			cacheProfile.panelRect = cacheProfile.containerElement.getBoundingClientRect()
			globalScope.setTimeout(() => {
				cacheProfile.containerElement.classList.add(`${STYLE_CLASSNAME_PREFIEX}-hidden`)
			})
		}
		const documentMouseMoveHandler = evte => {
			if (!MODES.slice(1).includes(RUN_PROFILE[0])) {
				return
			}
			if (
				evte.clientX >= cacheProfile.panelRect.left &&
				evte.clientX <= cacheProfile.panelRect.right &&
				evte.clientY >= cacheProfile.panelRect.top &&
				evte.clientY <= cacheProfile.panelRect.bottom
			) {
				cacheProfile.containerElement.classList.add(`${STYLE_CLASSNAME_PREFIEX}-hidden`)
				return
			}
			cacheProfile.containerElement.classList.remove(`${STYLE_CLASSNAME_PREFIEX}-hidden`)
		}
		const documentVisiblityChangeHandler = evte => {
			if (document.visibilityState === 'hidden') {
				globalScope.clearTimeout(cacheProfile.visiblityChangeTimer)
				cacheProfile.visibilityState = document.visibilityState
				return
			}
			cacheProfile.visiblityChangeTimer = globalScope.setTimeout(
				statusText => {
					cacheProfile.visibilityState = statusText
				},
				300,
				document.visibilityState
			)
		}
		cacheProfile.containerElement.addEventListener('mouseenter', containerMouseEnterHandler, true)
		document.addEventListener('visibilitychange', documentVisiblityChangeHandler)
		document.addEventListener('mousemove', documentMouseMoveHandler, true)
	}

	/**
	 * 配置刷新 - 初始化重置
	 */
	const profileManager = {
		$update() {
			const nowStamp = performance.now()
			profileManager.setCommonProfile(nowStamp)
			profileManager.setRAFCommonProfile()
			profileManager.setRICCommonProfile()
			profileManager.setPerformanceProfile()
			profileManager.setSystemInfoCommonProfile()
		},
		setCommonProfile(nowStamp) {
			RUN_PROFILE[1] = RUN_PROFILE[1] >= 1000 ? 1000 : RUN_PROFILE[1]
			cacheProfile.visibilityState = 'visible'
			cacheProfile.ctx = cacheProfile.mainCanvasElement.getContext('2d')
			cacheProfile.maxBlockInterval = RUN_PROFILE[1] * 1.5 >= 1000 ? 1000 : RUN_PROFILE[1] * 1.5
			cacheProfile.prevRefreshViewTimeStamp2 = cacheProfile.prevRefreshViewTimeStamp1 = cacheProfile.prevRAFExecuteTimeStamp = nowStamp
			cacheProfile.refreshViewDiffTime2 = cacheProfile.refreshViewDiffTime1 = 0
		},
		setRAFCommonProfile() {
			cacheProfile.rAFIntervalCount = cacheProfile.rAFRatioCycleAverage = cacheProfile.rAFRatioInstant = 0
			cacheProfile.rAFRatioCycleAverageList = []
			cacheProfile.maxRAFRatioCycleAverage = 60
		},
		setRICCommonProfile() {
			cacheProfile.rICIntervalCount = cacheProfile.rIdleRatioCycleAverage = 0
			cacheProfile.rIdleRatioCycleAverageList = []
		},
		setPerformanceProfile() {
			cacheProfile.totalJSHeapSizeValueList = []
		},
		setSystemInfoCommonProfile() {
			cacheProfile.cpuUsageRatioCycleAverage = 0
			cacheProfile.cpuUsageRatioCycleAverageList = []
			cacheProfile.memoryUsageRatioCycleAverage = cacheProfile.memoryTotalSize = cacheProfile.memoryUsageSize = 0
			cacheProfile.memoryUsageRatioCycleAverageList = []
		},
	}

	/**
	 * 原始数据采样
	 */
	const samplingCallbackManager = {
		requestIdleCallbackHandler(deadline) {
			if (!MODES.slice(1).includes(RUN_PROFILE[0])) {
				globalScope.requestIdleCallback(samplingCallbackManager.requestIdleCallbackHandler)
				return
			}
			cacheProfile.rICIntervalCount++
			globalScope.requestIdleCallback(samplingCallbackManager.requestIdleCallbackHandler)
		},
		requestAnimationFrameHandler(nowStamp) {
			if (!MODES.slice(1).includes(RUN_PROFILE[0])) {
				globalScope.requestAnimationFrame(samplingCallbackManager.requestAnimationFrameHandler)
				return
			}
			cacheProfile.refreshViewDiffTime1 = nowStamp - cacheProfile.prevRefreshViewTimeStamp1
			cacheProfile.refreshViewDiffTime2 = nowStamp - cacheProfile.prevRefreshViewTimeStamp2
			cacheProfile.rAFIntervalCount++
			cacheProfile.rAFRatioInstant = 1000 / (nowStamp - cacheProfile.prevRAFExecuteTimeStamp)
			let needRfreshView = false
			/**
			 * 当满足(且):
			 * 		- 当前页面处于可见状态
			 * 		- 运行时的刷新间隔时间大于定义的阻塞间隔时间(脚本死循环 or 密集计算 or ...)
			 */
			if (cacheProfile.visibilityState === 'visible' && cacheProfile.refreshViewDiffTime1 >= cacheProfile.maxBlockInterval) {
				const size = (cacheProfile.refreshViewDiffTime1 / RUN_PROFILE[1]) >> 0
				samplingCallbackManager.fillRAFRatioPolylineBlockData(size)
				samplingCallbackManager.fillRIdleRatioPolylineBlockData(size)
				needRfreshView = true
			}
			if (Math.abs(cacheProfile.refreshViewDiffTime1 - RUN_PROFILE[1]) <= 5 || cacheProfile.refreshViewDiffTime1 >= RUN_PROFILE[1]) {
				samplingCallbackManager.calcRAFRatioPolylineData()
				samplingCallbackManager.calcRIdleRatioPolylineData()
				samplingCallbackManager.calcPerformancePolylineData()
				needRfreshView = true
			}
			operaManager.spliceOverSize('rAFRatioCycleAverageList')
			operaManager.spliceOverSize('rIdleRatioCycleAverageList')
			operaManager.spliceOverSize('totalJSHeapSizeValueList')
			if (needRfreshView) {
				if (cacheProfile.refreshViewDiffTime2 >= RUN_PROFILE[2]) {
					chrome.runtime.sendMessage({ action: 'USR_GET_SYSINFO' })
					cacheProfile.prevRefreshViewTimeStamp2 = nowStamp
				}
				viewDataManager.$update()
				drawManager.$update()
				cacheProfile.prevRefreshViewTimeStamp1 = nowStamp
				cacheProfile.rICIntervalCount = cacheProfile.rAFIntervalCount = 0
			}
			cacheProfile.prevRAFExecuteTimeStamp = nowStamp
			globalScope.requestAnimationFrame(samplingCallbackManager.requestAnimationFrameHandler)
		},
		fillRAFRatioPolylineBlockData(size) {
			cacheProfile.rAFRatioCycleAverageList = [].concat(cacheProfile.rAFRatioCycleAverageList, new Array(size).fill(0))
		},
		calcRAFRatioPolylineData() {
			cacheProfile.rAFRatioCycleAverage = cacheProfile.rAFIntervalCount / (cacheProfile.refreshViewDiffTime1 / 1000)
			cacheProfile.maxRAFRatioCycleAverage = Math.max(cacheProfile.maxRAFRatioCycleAverage, cacheProfile.rAFRatioCycleAverage)
			cacheProfile.rAFRatioCycleAverageList.push(cacheProfile.rAFRatioCycleAverage / cacheProfile.maxRAFRatioCycleAverage)
		},
		fillRIdleRatioPolylineBlockData(size) {
			cacheProfile.rIdleRatioCycleAverageList = [].concat(cacheProfile.rIdleRatioCycleAverageList, new Array(size).fill(1))
		},
		calcRIdleRatioPolylineData() {
			cacheProfile.rIdleRatioCycleAverage =
				1 - cacheProfile.rICIntervalCount / (cacheProfile.maxRAFRatioCycleAverage * (cacheProfile.refreshViewDiffTime1 / 1000))
			cacheProfile.rIdleRatioCycleAverageList.push(cacheProfile.rIdleRatioCycleAverage)
		},
		calcPerformancePolylineData() {
			const totalJSHeapSize = ((performance.memory || {}).totalJSHeapSize || 0) / Math.pow(1024, 2)
			cacheProfile.totalJSHeapSizeValueList.push(totalJSHeapSize)
		},
		calcSystemInfoCommonData(messageData) {
			cacheProfile.cpuUsageRatioCycleAverage = messageData.cpuUsage
			cacheProfile.memoryUsageSize =
				((cacheProfile.memoryTotalSize = messageData.capacity), cacheProfile.memoryTotalSize) - messageData.availableCapacity
			cacheProfile.memoryUsageRatioCycleAverage = 1 - cacheProfile.memoryUsageSize / cacheProfile.memoryTotalSize
		},
		calcSystemCpuUsageRatioPolylineData() {
			cacheProfile.cpuUsageRatioCycleAverageList.push(cacheProfile.cpuUsageRatioCycleAverage)
		},
		calcSystemMemoryUsageRatioPolylineData() {
			cacheProfile.memoryUsageRatioCycleAverageList.push(1 - cacheProfile.memoryUsageRatioCycleAverage)
		},
	}

	/**
	 * 预处理渲染数据
	 */
	const viewDataManager = {
		data: {},
		$update() {
			viewDataManager.rAfCommonDataSubmit()
			viewDataManager.rAfPolylineDataSubmit()
			viewDataManager.rIdleCommonDataSubmit()
			viewDataManager.refreshTextDataSubmit()
			viewDataManager.rIdlePolylineDataSubmit()
			viewDataManager.performanceMemoryDataSubmit()
			viewDataManager.systemInfoCommonDataSubmit()
			viewDataManager.systemInfoPolylineDataSubmit()
		},
		rAfCommonDataSubmit() {
			viewDataManager.data.rAFRatioInstant = cacheProfile.rAFRatioInstant >> 0
			viewDataManager.data.rAFRatioCycleAverage = cacheProfile.rAFRatioCycleAverage
			viewDataManager.data.rAFIntervalCount = cacheProfile.rAFIntervalCount
		},
		rAfPolylineDataSubmit() {
			viewDataManager.data.rAFRatioCycleAverageList = [...cacheProfile.rAFRatioCycleAverageList]
		},
		rIdleCommonDataSubmit() {
			viewDataManager.data.rIdleRatioCycleAverage = cacheProfile.rIdleRatioCycleAverage
			viewDataManager.data.rICIntervalCount = cacheProfile.rICIntervalCount
		},
		refreshTextDataSubmit() {
			viewDataManager.data.refreshViewDiffTime1 = cacheProfile.refreshViewDiffTime1 >> 0
		},
		rIdlePolylineDataSubmit() {
			viewDataManager.data.rIdleRatioCycleAverageList = [...cacheProfile.rIdleRatioCycleAverageList]
		},
		performanceMemoryDataSubmit() {
			const memoryInfo = performance.memory || {}
			viewDataManager.data.jsHeapSizeLimit = (memoryInfo.jsHeapSizeLimit || 0) / Math.pow(1024, 2)
			viewDataManager.data.totalJSHeapSize = (memoryInfo.totalJSHeapSize || 0) / Math.pow(1024, 2)
			viewDataManager.data.usedJSHeapSize = (memoryInfo.usedJSHeapSize || 0) / Math.pow(1024, 2)
			if (viewDataManager.data.jsHeapSizeLimit >= 1000) {
				viewDataManager.data.jsHeapSizeLimit /= 1024
			}
			if (viewDataManager.data.totalJSHeapSize >= 1000) {
				viewDataManager.data.totalJSHeapSize /= 1024
			}
			if (viewDataManager.data.usedJSHeapSize >= 1000) {
				viewDataManager.data.usedJSHeapSize /= 1024
			}
			viewDataManager.data.totalJSHeapSizeRatioList = []
			const maxValue = Math.max(...cacheProfile.totalJSHeapSizeValueList)
			let maxValueExtend = 0
			if (maxValue >= 1000) {
				maxValueExtend = maxValue + 500
			} else if (maxValue >= 500 && maxValue < 1000) {
				maxValueExtend = maxValue + 300
			} else if (maxValue >= 300 && maxValue < 500) {
				maxValueExtend = maxValue + 200
			} else {
				maxValueExtend = maxValue + 100
			}
			for (let i = 0; i < cacheProfile.totalJSHeapSizeValueList.length; i++) {
				viewDataManager.data.totalJSHeapSizeRatioList[i] = cacheProfile.totalJSHeapSizeValueList[i] / maxValueExtend
			}
		},
		systemInfoCommonDataSubmit() {
			viewDataManager.data.cpuUsageRatioCycleAverage = cacheProfile.cpuUsageRatioCycleAverage
			viewDataManager.data.memoryTotalSize = cacheProfile.memoryTotalSize / Math.pow(1024, 3)
			viewDataManager.data.memoryUsageSize = cacheProfile.memoryUsageSize / Math.pow(1024, 3)
		},
		systemInfoPolylineDataSubmit() {
			viewDataManager.data.cpuUsageRatioCycleAverageList = [...cacheProfile.cpuUsageRatioCycleAverageList]
			viewDataManager.data.memoryUsageRatioCycleAverageList = [...cacheProfile.memoryUsageRatioCycleAverageList]
		},
	}

	/**
	 * 绘制渲染
	 */
	const drawManager = {
		$update() {
			cacheProfile.ctx.clearRect(0, 0, CANVAS_RECTS[RUN_PROFILE[0]][0], CANVAS_RECTS[RUN_PROFILE[0]][1])
			cacheProfile.ctx.lineWidth = 1
			cacheProfile.ctx.font = `${COMMON_SETTING[0]}px arial, sans-serif`
			cacheProfile.ctx.textBaseline = 'top'
			const AREA_RECT = ELEMENTS_RECT[RUN_PROFILE[0]]
			if (RUN_PROFILE[0] === MODES[1]) {
				drawManager.drawRAFText(AREA_RECT[0][0], AREA_RECT[0][1], AREA_RECT[0][2], AREA_RECT[0][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[1][0],
					AREA_RECT[1][1],
					AREA_RECT[1][2],
					AREA_RECT[1][3],
					viewDataManager.data.rAFRatioCycleAverageList
				)
				drawManager.drawRICText(AREA_RECT[2][0], AREA_RECT[2][1], AREA_RECT[2][2], AREA_RECT[2][3], COMMON_SETTING[0])
				drawManager.drawRAFRefreshText(AREA_RECT[3][0], AREA_RECT[3][1], AREA_RECT[3][2], AREA_RECT[3][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[4][0],
					AREA_RECT[4][1],
					AREA_RECT[4][2],
					AREA_RECT[4][3],
					viewDataManager.data.rIdleRatioCycleAverageList
				)
				drawManager.drawSystemCpuUsageText(AREA_RECT[5][0], AREA_RECT[5][1], AREA_RECT[5][2], AREA_RECT[5][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[6][0],
					AREA_RECT[6][1],
					AREA_RECT[6][2],
					AREA_RECT[6][3],
					viewDataManager.data.cpuUsageRatioCycleAverageList
				)
				drawManager.drawPerformanceMemoryText(AREA_RECT[7][0], AREA_RECT[7][1], AREA_RECT[7][2], AREA_RECT[7][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[8][0],
					AREA_RECT[8][1],
					AREA_RECT[8][2],
					AREA_RECT[8][3],
					viewDataManager.data.totalJSHeapSizeRatioList
				)
				return
			}
			if (RUN_PROFILE[0] === MODES[2]) {
				drawManager.drawRAFText(AREA_RECT[0][0], AREA_RECT[0][1], AREA_RECT[0][2], AREA_RECT[0][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[1][0],
					AREA_RECT[1][1],
					AREA_RECT[1][2],
					AREA_RECT[1][3],
					viewDataManager.data.rAFRatioCycleAverageList
				)
				drawManager.drawRICText(AREA_RECT[2][0], AREA_RECT[2][1], AREA_RECT[2][2], AREA_RECT[2][3], COMMON_SETTING[0])
				drawManager.drawRAFRefreshText(AREA_RECT[3][0], AREA_RECT[3][1], AREA_RECT[3][2], AREA_RECT[3][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[4][0],
					AREA_RECT[4][1],
					AREA_RECT[4][2],
					AREA_RECT[4][3],
					viewDataManager.data.rIdleRatioCycleAverageList
				)
				drawManager.drawPerformanceMemoryText(AREA_RECT[5][0], AREA_RECT[5][1], AREA_RECT[5][2], AREA_RECT[5][3], COMMON_SETTING[0])
				drawManager.drawSystemCpuUsageText(AREA_RECT[6][0], AREA_RECT[6][1], AREA_RECT[6][2], AREA_RECT[6][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[7][0],
					AREA_RECT[7][1],
					AREA_RECT[7][2],
					AREA_RECT[7][3],
					viewDataManager.data.cpuUsageRatioCycleAverageList
				)
				drawManager.drawSystemMemoryUsageText(AREA_RECT[8][0], AREA_RECT[8][1], AREA_RECT[8][2], AREA_RECT[8][3], COMMON_SETTING[0])
				drawManager.drawPolyline(
					AREA_RECT[9][0],
					AREA_RECT[9][1],
					AREA_RECT[9][2],
					AREA_RECT[9][3],
					viewDataManager.data.memoryUsageRatioCycleAverageList
				)
				return
			}
		},
		drawRAFText(startX, startY, width, height, fontSize) {
			cacheProfile.ctx.fillStyle = operaManager.calcMatchColor(
				viewDataManager.data.rAFRatioInstant >> 0,
				THRESHOLDS[0],
				false,
				undefined,
				false
			)
			cacheProfile.ctx.fillText(
				`${viewDataManager.data.rAFRatioCycleAverage.toFixed(2)}/${viewDataManager.data.rAFRatioInstant}`,
				startX,
				startY + fontSize / 4
			)
		},
		drawRAFRefreshText(startX, startY, width, height, fontSize) {
			cacheProfile.ctx.fillStyle = COMMON_SETTING[1][0]
			cacheProfile.ctx.fillText(`${viewDataManager.data.refreshViewDiffTime1}`, startX, startY + fontSize / 4)
		},
		drawRICText(startX, startY, width, height, fontSize) {
			cacheProfile.ctx.fillStyle = COMMON_SETTING[1][0]
			cacheProfile.ctx.fillText(
				`${(Math.max(0, viewDataManager.data.rIdleRatioCycleAverage) * 100).toFixed(2)}%`,
				startX,
				startY + fontSize / 4
			)
		},
		drawPerformanceMemoryText(startX, startY, width, height, fontSize) {
			cacheProfile.ctx.fillStyle = COMMON_SETTING[1][0]
			cacheProfile.ctx.fillText(
				`${viewDataManager.data.usedJSHeapSize.toFixed(2)}/${viewDataManager.data.totalJSHeapSize.toFixed(2)}`,
				startX,
				startY + fontSize / 4
			)
		},
		drawSystemCpuUsageText(startX, startY, width, height, fontSize) {
			cacheProfile.ctx.fillStyle = operaManager.calcMatchColor(
				viewDataManager.data.cpuUsageRatioCycleAverage,
				THRESHOLDS[1],
				false,
				undefined,
				true
			)
			cacheProfile.ctx.fillText(
				`${(Math.max(0, viewDataManager.data.cpuUsageRatioCycleAverage) * 100).toFixed(2)}%`,
				startX,
				startY + fontSize / 4
			)
		},
		drawSystemMemoryUsageText(startX, startY, width, height, fontSize) {
			cacheProfile.ctx.fillStyle = operaManager.calcMatchColor(
				viewDataManager.data.memoryUsageSize,
				THRESHOLDS[2],
				true,
				viewDataManager.data.memoryTotalSize,
				true
			)
			cacheProfile.ctx.fillText(
				`${viewDataManager.data.memoryUsageSize.toFixed(2)}/${viewDataManager.data.memoryTotalSize.toFixed(2)}`,
				startX,
				startY + fontSize / 4
			)
		},
		drawPolyline(startX, startY, width, height, ratios) {
			const polylineRectAreaBottomY = startY + height
			const polylineRectAreaLeftX = startX
			if (!ratios.length) {
				return
			}
			cacheProfile.ctx.beginPath()
			const sx = (RECORD_CONFIG[0] - ratios.length) * RECORD_CONFIG[1]
			cacheProfile.ctx.moveTo(polylineRectAreaLeftX + sx, (1 - ratios[0]) * height + startY)
			let i = 0
			for (i = 1; i < ratios.length; i++) {
				cacheProfile.ctx.lineTo(polylineRectAreaLeftX + sx + i * RECORD_CONFIG[1], (1 - ratios[i]) * height + startY)
			}
			cacheProfile.ctx.stroke()
			cacheProfile.ctx.strokeStyle = COMMON_SETTING[2][0]
			if (ratios.length >= 2) {
				cacheProfile.ctx.lineTo(polylineRectAreaLeftX + sx + (i - 1) * RECORD_CONFIG[1], polylineRectAreaBottomY)
				cacheProfile.ctx.lineTo(polylineRectAreaLeftX + sx, polylineRectAreaBottomY)
				cacheProfile.ctx.stroke()
			}
			cacheProfile.ctx.fillStyle = COMMON_SETTING[2][1]
			cacheProfile.ctx.fill()
		},
	}

	/****************************************************************************************************/
	/****************************************************************************************************/
	/****************************************************************************************************/

	const refresh = () => {
		initManager.handleStorage()
		profileManager.$update()
		operaManager.updateCanvasRect()
		operaManager.updateContainerVisible()
	}
	const load = () => {
		initManager.initViewStyle()
		initManager.initViewElement()
		initManager.initDomElementHandler()
		eventManager()
		refresh()
		globalScope.requestAnimationFrame(samplingCallbackManager.requestAnimationFrameHandler)
		globalScope.requestAnimationFrame(samplingCallbackManager.requestIdleCallbackHandler)
	}

	globalScope.addEventListener('DOMContentLoaded', () => {
		globalScope.setTimeout(load)
	})
})(window)
