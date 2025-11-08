import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'antd'
import styles from './index.module.less'
import { TStore as TGlobalStore, TLinkListItem } from '../../store/global/store'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TCombineStore } from '../../../app/store/public/types'
import { EStoreModuleKey } from '../../../app/store/public/config'

const { Content } = Layout

export function ListRoot(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
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
									<a data-id={sItem.id} href={sItem.path}>
										<div className={styles['list-groupcontent-card']}>
											<div className={styles['entry-title']}>{sItem.title}</div>
											<div className={styles['entry-description']}>{sItem.desc}</div>
										</div>
									</a>
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
