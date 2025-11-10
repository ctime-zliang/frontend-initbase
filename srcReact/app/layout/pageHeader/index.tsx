import React from 'react'
import { Layout, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import logoImage from '../../assets/images/log.jpg'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TStore as TGlobalStore } from '../../store/global/store'
import { TReduxToolkitActionCommonResult, TCombineStore } from '../../../app/store/public/types'
import { EStoreModuleKey } from '../../../app/store/public/config'
import './index.less'
import { changeLanguageSettingAction } from '../../store/global/slice'

export function PageHeaderRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageHeaderRoot ☆☆☆`, props)
	const { g_languageSetting, g_headLoadStatus } = useSelector((store: TCombineStore): TGlobalStore => {
		return store[EStoreModuleKey.global]
	})
	const dispatch = useDispatch()
	const onLanguageSettingClickAction = (): void => {
		const res: TReduxToolkitActionCommonResult<any> = changeLanguageSettingAction()
		dispatch(res)
	}
	return (
		<Layout className="app-page-header">
			<Layout.Header>
				<a className="log-link" href="/" target="_blank" title="React App">
					<div className="protail-wrapper">
						<img className="log-img" src={logoImage} title="Logo Image" />
						<span>React App</span>
					</div>
				</a>
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
