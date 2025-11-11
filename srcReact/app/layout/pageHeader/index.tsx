import React from 'react'
import { Layout, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import logoImage from '../../assets/images/log.jpg'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TStore as TGlobalStore } from '../../store/global/store'
import { TReduxToolkitActionCommonResult, TCombineStore } from '../../store/public/types'
import { EStoreModuleKey } from '../../store/public/config'
import './index.less'
import { changeLanguageSettingAction } from '../../store/global/slice'

export function PageHeaderRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageHeaderRoot ☆☆☆`, props)
	const { g_languageSetting, g_headLoadStatus } = useSelector((store: TCombineStore): TGlobalStore => {
		return store[EStoreModuleKey.global]
	})
	const dispatch = useDispatch()
	const location = useLocation()
	const state: any = location.state || {}
	const onLanguageSettingClickAction = (): void => {
		const res: TReduxToolkitActionCommonResult<any> = changeLanguageSettingAction()
		dispatch(res)
	}
	const BackIconSettingComponent = (): React.ReactElement => {
		const navigate = useNavigate()
		const onBackIconBtnClickAction = (): void => {
			navigate(-1)
		}
		if (state.showBackIcon) {
			return (
				<div className="back-icon-wrapper">
					<div className="back-icon" onClick={onBackIconBtnClickAction}></div>
				</div>
			)
		}
		return null!
	}
	return (
		<Layout className="app-page-header">
			<Layout.Header>
				<div className="home-wrapper">
					<BackIconSettingComponent />
					<a className="log-link" href="/" target="_blank" title="React App">
						<div className="protail-wrapper">
							<img className="log-img" src={logoImage} title="Logo Image" />
							<span>React App</span>
						</div>
					</a>
				</div>
				<div>
					Language:{' '}
					<Button size="small" style={{ marginLeft: '8px' }} onClick={onLanguageSettingClickAction}>
						{g_languageSetting || '-'}
					</Button>
					<span style={{ padding: '0 5px' }}>{g_headLoadStatus}</span>
				</div>
			</Layout.Header>
		</Layout>
	)
}
