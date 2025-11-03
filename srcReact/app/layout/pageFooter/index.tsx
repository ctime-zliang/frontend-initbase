import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from 'antd'
import './index.less'
import { TCommonComponentBaseProps } from 'srcReact/app/types/comm.types'

const { Footer } = Layout

const layoutStyle: { [key: string]: string | number } = {
	backgroundColor: `rgba(202, 202, 202, 0.5)`,
}

function PageFooterRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageFooterRoot ☆☆☆`, props)
	const { t } = useTranslation()
	return (
		<footer className="app-page-footer">
			<Layout style={layoutStyle}>
				<Footer style={layoutStyle}>Copyright Admin &copy;2010 - 2020, {t('China')}</Footer>
			</Layout>
		</footer>
	)
}

export default React.memo(PageFooterRoot)
