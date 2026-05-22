import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from 'antd'
import './index.less'

export function PageFooterRoot(props: Partial<any>): React.ReactElement {
	// console.log(`PageFooterRoot ☆☆☆`, props)
	const { t } = useTranslation()
	return (
		<Layout className="app-page-footer">
			<Layout.Footer>
				<span>Copyright Admin &copy;2010 - 2020, {t('China')}</span>
			</Layout.Footer>
		</Layout>
	)
}
