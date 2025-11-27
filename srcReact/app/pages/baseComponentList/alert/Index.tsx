import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { Button } from 'antd'
import { Alert } from '@/app/componnet/alert'
import { EAlertButtonType } from '@/app/componnet/alert/config/config'

function AlertRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Alert Component`
	useContentBgColor('rgba(255, 255, 255, 1)')
	const onBtnClickAction = (): void => {
		Alert.open({
			title: '确定要离开么?',
			content: '关闭后修改的内容将丢失, 请确认是否继续操作',
			btns: [
				{
					text: '确认',
					type: EAlertButtonType.PRIMARY,
					onClick: (): void => {
						console.log('点击了确认按钮')
					},
				},
				{
					text: '取消',
					type: EAlertButtonType.DEFAULT,
					onClick: (): void => {
						console.log('点击了取消按钮')
					},
				},
			],
		})
	}
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<Button type="primary" onClick={onBtnClickAction}>
					测试按钮 1
				</Button>
			</section>
		</>
	)
}

export const AlertRootMemo = React.memo(AlertRoot)
