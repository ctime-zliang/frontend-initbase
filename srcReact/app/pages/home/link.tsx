import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './link.module.less'

function LinkRoot(props: any): React.ReactElement {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const onSpanClickAction = (): void => {
		navigate('/link', { state: { showBackIcon: true } })
	}
	return (
		<div className={styles['link-container']}>
			<span className={styles['link-text']} onClick={onSpanClickAction}>
				[{t('Click here to enter the Link List page')}]
			</span>
		</div>
	)
}

export const LinkRootMemo = React.memo(LinkRoot)
