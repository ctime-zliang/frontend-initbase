import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import './index.less'
import { Link } from 'react-router-dom'
import { TStore as TGlobalStore, TLinkListItem } from '../../store/global/store'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TCombineStore } from '../../store/public/types'
import { EStoreModuleKey } from '../../store/public/config'

export function LinkListRoot(props: TCommonComponentBaseProps): React.ReactElement {
	const { linkData } = useSelector((store: TCombineStore): TGlobalStore => {
		return store[EStoreModuleKey.global]
	})
	const dispatch = useDispatch()
	const listItems: () => Array<React.ReactElement> = (): Array<React.ReactElement> => {
		const viewItems: Array<React.ReactElement> = []
		linkData.forEach((item: { subject: string; list: Array<TLinkListItem> }, index: number): void => {
			viewItems.push(
				<div key={index} className="list-group-wrapper">
					<div className="list-grouptitle-wrapper">{item.subject}</div>
					<div className="list-groupcontent-wrapper">
						{item.list.map((sItem: TLinkListItem, sIndex: number): React.ReactElement => {
							return (
								<div key={sIndex + '' + index} className="list-groupcontent">
									<Link className="link-item" to={{ pathname: `${sItem.path}` }} state={{ showBackIcon: true }}>
										<div className="list-groupcontent-card">
											<div className="entry-title">{sItem.title}</div>
											<div className="entry-description">{sItem.desc}</div>
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
			<section className="list-container">
				<section className="list-wrapper">{listItems()}</section>
			</section>
		</>
	)
}
