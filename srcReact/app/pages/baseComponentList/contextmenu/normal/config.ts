// SEPARATOR
// ITEM

export default [
	{
		title: `查看`,
		cmd: `checkView`,
		checked: true,
	},
	{
		title: `排序方式`,
		cmd: `sortBy`,
		subMenu: [
			{
				title: `名称`,
				cmd: 'fileName',
			},
			{
				title: `大小`,
				cmd: `fileSize`,
			},
			{
				title: `类型`,
				cmd: 'fileType',
			},
			{
				title: `修改日期`,
				cmd: `fileModifyTime`,
			},
		],
	},
	{
		title: `刷新`,
		cmd: 'refresh',
		tips: 'F5',
	},
	{
		type: `SEPARATOR`,
	},
	{
		title: `粘贴`,
		cmd: `pasate`,
		disabled: true,
	},
	{
		title: `Git GUI Here`,
		cmd: `gitGuiNow`,
	},
	{
		title: `Git Bash Here`,
		cmd: `gitBaseNow`,
	},
	{
		title: `图形选项`,
		cmd: `graphicOption`,
		subMenu: [
			{
				title: `输出至`,
				cmd: `outTo`,
				subMenu: [
					{
						title: `监视器`,
						cmd: `monitor`,
					},
					{
						title: `数字电视机`,
						cmd: `digitalTelevisionSet`,
					},
					{
						title: `克隆显示`,
						cmd: 'cloneDisplay',
						subMenu: [
							{
								title: `监视器 + 数字电视机`,
								cmd: `monitor+digitalTelevisionSet`,
							},
							{
								title: `数字电视机 + 监视器`,
								cmd: `digitalTelevisionSet+monitor`,
							},
						],
					},
				],
			},
			{
				title: `屏幕适配`,
				cmd: `screenAdaptation`,
				subMenu: [
					{
						title: `数字电视机`,
						cmd: `digitalTelevisionSet`,
						subMenu: [
							{
								title: `保持比例`,
								cmd: `keepRatio`,
							},
							{
								title: `图像居中`,
								cmd: `imageCentering`,
							},
						],
					},
					{
						title: `监视器`,
						cmd: `monitor`,
						subMenu: [
							{
								title: `保持比例`,
								cmd: `keepRatio`,
							},
							{
								title: `图像居中`,
								cmd: `imageCentering`,
							},
						],
					},
				],
			},
			{
				title: `分辨率`,
				cmd: `resolution`,
				subMenu: [
					{
						title: `数字电视机`,
						cmd: `digitalTelevisionSet`,
						subMenu: [
							{
								title: `1920*1080`,
								cmd: `1920*1080`,
								checked: true,
							},
							{
								title: `1600*900`,
								cmd: `1600*900`,
							},
							{
								title: `1440*900`,
								cmd: `1440*900`,
							},
							{
								title: `1366*768`,
								cmd: `1366*768`,
							},
							{
								title: `1280*1024`,
								cmd: `1280*1024`,
							},
						],
					},
					{
						title: `监视器`,
						cmd: `monitor`,
						subMenu: [
							{
								title: `1920*1080`,
								cmd: `1920*1080`,
								checked: true,
							},
							{
								title: `1600*900`,
								cmd: `1600*900`,
							},
							{
								title: `1440*900`,
								cmd: `1440*900`,
							},
							{
								title: `1366*768`,
								cmd: `1366*768`,
							},
							{
								title: `1280*1024`,
								cmd: `1280*1024`,
							},
						],
					},
				],
			},
			{
				title: `旋转`,
				cmd: `rotation`,
				subMenu: [
					{
						title: `数字电视机`,
						cmd: `digitalTelevisionSet`,
						subMenu: [
							{
								title: `0`,
								cmd: `0`,
								checked: true,
							},
							{
								title: `90`,
								cmd: `90`,
							},
							{
								title: `180`,
								cmd: `180`,
							},
							{
								title: `270`,
								cmd: `270`,
							},
						],
					},
					{
						title: `监视器`,
						cmd: `monitor`,
						subMenu: [
							{
								title: `0`,
								cmd: `0`,
								checked: true,
							},
							{
								title: `90`,
								cmd: `90`,
							},
							{
								title: `180`,
								cmd: `180`,
							},
							{
								title: `270`,
								cmd: `270`,
							},
						],
					},
				],
			},
			{
				title: `配置式`,
				cmd: `setting`,
				subMenu: [
					{
						title: `调整视频亮度`,
						cmd: `adjustVideoBrightness`,
					},
					{
						title: `调整视频色彩`,
						cmd: `adjustVideoColor`,
					},
				],
			},
		],
	},
	{
		type: `SEPARATOR`,
	},
	{
		title: `新建`,
		cmd: `new`,
		subMenu: [
			{
				title: `文件夹`,
				cmd: `folder`,
				tips: 'Ctrl + N',
			},
			{
				title: `快捷方式`,
				cmd: `shortcut`,
			},
			{
				type: `SEPARATOR`,
			},
			{
				title: `文本文件`,
				cmd: `textFile`,
			},
			{
				title: `日程`,
				cmd: `schedule`,
			},
		],
	},
	{
		type: `SEPARATOR`,
	},
	{
		title: `显示设置`,
		cmd: 'systemDisplaySetting',
		tips: `V`,
	},
	{
		title: `个性化`,
		cmd: `individuation`,
		tips: `Shift + Q`,
	},
]
