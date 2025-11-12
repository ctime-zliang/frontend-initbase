import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout, List } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
import { getRandomInArea } from '../../../utils/utils'

function ArticleListRoot(props: any): React.ReactElement {
	console.log(`ArticleListRoot ☆☆☆`, props)
	const testListSize: number = 100
	const articleList: Array<any> = useMemo(() => {
		const articleList: Array<any> = []
		for (let i: number = 0; i < testListSize; i++) {
			const n: number = getRandomInArea(100, 100000)
			articleList.push({ title: `Article ${i}-${n}`, path: `detail/a-${i}-${n}`, id: `${i}-${n}` })
		}
		return articleList
	}, [])
	return (
		<>
			<Helmet>
				<title>Article List</title>
			</Helmet>
			<div className={styles['list-container']}>
				<div className={styles['list-wrapper']}>
					<div className={styles['list-header']}>
						<span>Article List</span>
					</div>
					<Layout.Content>
						<List
							className={styles['list-item-wrapper']}
							size="small"
							bordered
							dataSource={articleList}
							renderItem={(item: any, index: number): React.ReactElement => {
								const number: string = (++index, index) <= 9 ? '0' + index : String(index)
								return (
									<List.Item className={styles['list-item']}>
										<span style={{ paddingRight: '6px' }}>{number}.</span>
										<Link
											className={styles['link-item']}
											to={{ pathname: `${item.path}` }}
											state={{ showBackIcon: true, id: item.id }}
										>
											{item.title}
										</Link>
									</List.Item>
								)
							}}
						/>
					</Layout.Content>
				</div>
			</div>
		</>
	)
}

export const ArticleListRootMemo = React.memo(ArticleListRoot)
