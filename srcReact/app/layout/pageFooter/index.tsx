import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from 'antd'
import './index.less'
import { TCommonComponentBaseProps } from '../../types/comm.types'

export function PageFooterRoot(props: TCommonComponentBaseProps): React.ReactElement {
	// console.log(`PageFooterRoot ☆☆☆`, props)
	const { t } = useTranslation()
	return (
		<footer className="app-page-footer">
			<Layout
				style={{
					backgroundColor: `rgba(202, 202, 202, 0.5)`,
				}}
			>
				<Layout.Footer
					style={{
						backgroundColor: `rgba(202, 202, 202, 0.5)`,
					}}
				>
					Copyright Admin &copy;2010 - 2020, {t('China')}
				</Layout.Footer>
			</Layout>
		</footer>
	)
}
