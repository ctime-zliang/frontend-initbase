import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useContentBgColor } from '../../../utils/hooks/useContentBgColor'
import { Button } from 'antd'
import { Alert } from '@/app/componnet/alert'
import { EAlertButtonType } from '@/app/componnet/alert/config/config'

function AlertRoot(props: any): React.ReactElement {
	const MODULE_NAME: string = `Alert Component`
	useContentBgColor('rgba(255, 255, 255, 1)')
	const onBtnClickAction = (type: string): void => {
		switch (type) {
			case '1': {
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
				break
			}
			case '2': {
				Alert.open({
					title: '提示!',
					content: '您的内容已成功提交, 操作已完成',
					btns: [
						{
							text: '确认',
							type: EAlertButtonType.PRIMARY,
							onClick: (): void => {
								console.log('点击了确认按钮')
							},
						},
					],
				})
				break
			}
			case '3': {
				Alert.open({
					title: '警告!',
					content: '系统出现了异常, 请联系管理员处理',
					btns: [
						{
							text: '确认',
							type: EAlertButtonType.ERROR,
							onClick: (): void => {
								console.log('点击了确认按钮')
							},
						},
					],
				})
				break
			}
			case '4': {
				Alert.open({
					title: '提示!',
					content: '您的内容已成功提交, 操作已完成',
					btns: [
						{
							text: '确认',
							type: EAlertButtonType.PRIMARY,
							onClick: (): void => {
								console.log('点击了确认按钮')
							},
						},
					],
					lockMaskVisible: false,
				})
				break
			}
		}
	}
	return (
		<>
			<Helmet>
				<title>{MODULE_NAME}</title>
			</Helmet>
			<section style={{ padding: `10px 10px`, position: 'relative' }}>
				<h2 style={{ padding: `10px 10px`, margin: 0 }}>{MODULE_NAME}</h2>
				<div>
					<Button type="primary" onClick={(): void => onBtnClickAction('1')}>
						测试按钮 - [确认 & 取消]
					</Button>
				</div>
				<br />
				<div>
					<Button type="primary" onClick={(): void => onBtnClickAction('2')}>
						测试按钮 - [确认]
					</Button>
				</div>
				<br />
				<div>
					<Button type="primary" onClick={(): void => onBtnClickAction('3')}>
						测试按钮 - [错误确认]
					</Button>
				</div>
				<br />
				<div>
					<Button type="primary" onClick={(): void => onBtnClickAction('4')}>
						测试按钮 - [确认] - [遮罩层全透明]
					</Button>
				</div>
			</section>
		</>
	)
}

export const AlertRootMemo = React.memo(AlertRoot)
