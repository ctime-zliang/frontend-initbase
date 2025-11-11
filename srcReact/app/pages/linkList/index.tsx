import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'antd'
import styles from './index.module.less'
import { Link } from 'react-router-dom'
import { TStore as TGlobalStore, TLinkListItem } from '../../store/global/store'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TCombineStore } from '../../store/public/types'
import { EStoreModuleKey } from '../../store/public/config'

export function LinkListRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`LinkListRoot ☆☆☆`, props)
	const { linkData } = useSelector((store: TCombineStore): TGlobalStore => {
		return store[EStoreModuleKey.global]
	})
	const dispatch = useDispatch()
	const listItems: () => Array<React.ReactElement> = (): Array<React.ReactElement> => {
		const viewItems: Array<React.ReactElement> = []
		linkData.forEach((item: { subject: string; list: Array<TLinkListItem> }, index: number): void => {
			viewItems.push(
				<div key={index} className={styles['list-group-wrapper']}>
					<div className={styles['list-grouptitle-wrapper']}>{item.subject}</div>
					<div className={styles['list-groupcontent-wrapper']}>
						{item.list.map((sItem: TLinkListItem, sIndex: number): React.ReactElement => {
							return (
								<div key={sIndex + '' + index} className={styles['list-groupcontent']}>
									<Link className={styles['link-item']} to={{ pathname: `${sItem.path}` }} state={{ showBackIcon: true }}>
										<div className={styles['list-groupcontent-card']}>
											<div className={styles['entry-title']}>{sItem.title}</div>
											<div className={styles['entry-description']}>{sItem.desc}</div>
										</div>
									</Link>
								</div>
							)
						})}
					</div>
				</div>
			)
		})
		return viewItems
	}
	return (
		<>
			<Helmet>
				<title>Entry Link List</title>
			</Helmet>
			<section className={styles['list-container']}>
				<section className={styles['list-wrapper']}>{listItems()}</section>
			</section>
		</>
	)
}
