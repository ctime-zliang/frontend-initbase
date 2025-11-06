import React from 'react'
import { connect } from 'react-redux'
import { Layout, Button } from 'antd'
import './index.less'
import logoImage from '../../assets/images/log.jpg'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { changeLanguageSettingAction } from '../../store/globalDefault/actions'
import { TCombineState } from '../../store/redux'

type TReduxStoreState = {
	g_languageSetting: string
}
type TReduxStoreActions = {
	changeLanguageSettingAction: (...args: Array<any>) => void
}
type TProps = TReduxStoreState & TReduxStoreActions & TCommonComponentBaseProps
function PageHeaderRoot(props: TProps): React.ReactElement {
	console.log(`PageHeaderRoot ☆☆☆`, props)
	const { g_languageSetting, changeLanguageSettingAction } = props
	return (
		<header className="app-page-header">
			<Layout
				style={{
					backgroundColor: `rgba(202, 202, 202, 0.5)`,
				}}
			>
				<Layout.Header
					style={{
						backgroundColor: `rgba(202, 202, 202, 0.5)`,
					}}
				>
					<a className="log-link" href="/" target="_blank" title="React App">
						<div className="protail-wrapper">
							<img className="log-img" src={logoImage} title="Logo Image" />
							<span>React App</span>
						</div>
					</a>
					<div>
						Language:{' '}
						<Button size="small" style={{ marginLeft: '8px' }} onClick={changeLanguageSettingAction}>
							{g_languageSetting || '-'}
						</Button>
					</div>
				</Layout.Header>
			</Layout>
		</header>
	)
}

const mapStateToProps = (combineState: TCombineState): TReduxStoreState => {
	return {
		g_languageSetting: combineState.globalDefault.g_languageSetting,
	}
}
const mapActionsToProps = {
	changeLanguageSettingAction,
}

const PageHeaderRootContainer = connect(mapStateToProps, mapActionsToProps)(PageHeaderRoot)

export default PageHeaderRootContainer
