import React from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import { Layout, Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
import { TLinkListItem } from '../../store/globalDefault/types'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TCombineState } from '../../store/redux'

const { Content } = Layout

function ListRoot(props: TProps): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	const { linkData } = props
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

type TReduxStoreState = {
	linkData: Array<{
		subject: string
		list: Array<TLinkListItem>
	}>
}

type TReduxStoreActions = {}

type TProps = TReduxStoreState & TReduxStoreActions & TCommonComponentBaseProps

const mapStateToProps = (combineState: TCombineState): TReduxStoreState => {
	return {
		linkData: combineState.globalDefault.linkData,
	}
}

const mapActionsToProps = {}

const ListRootContainer = connect(mapStateToProps, mapActionsToProps)(ListRoot)

export default React.memo(ListRootContainer)
