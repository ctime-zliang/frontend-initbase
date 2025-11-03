import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout, List } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.less'

const { Content } = Layout

const linkList: Array<any> = [
	{
		title: 'Article 1',
		path: `detail/a1`,
	},
	{
		title: 'Article 2',
		path: `detail/a2`,
	},
	{
		title: 'Article 3',
		path: `detail/a3`,
	},
]

function ListRoot(props: any): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Article List</title>
			</Helmet>
			<section className={styles['list-container']}>
				<section className={styles['list-wrapper']}>
					<div className={styles['list-header']}>
						<span>Article List</span>
					</div>
					<Content>
						<List
							size="small"
							bordered
							dataSource={linkList}
							renderItem={(item: any, index: number): React.ReactElement => {
								const number: string = (++index, index) <= 9 ? '0' + index : String(index)
								return (
									<List.Item className="entry-linklist" style={{ justifyContent: 'flex-start' }}>
										<span style={{ paddingRight: '6px' }}>{number}.</span>
										<Link className={styles['link-item']} to={{ pathname: `${item.path}` }}>
											{item.title}
										</Link>
									</List.Item>
								)
							}}
						/>
					</Content>
				</section>
			</section>
		</>
	)
}

export default React.memo(ListRoot)
