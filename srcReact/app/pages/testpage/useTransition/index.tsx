import React, { useState, useMemo, useCallback, useTransition } from 'react'
import styles from './index.module.less'

const LONG_LIST_COUNT: number = 50000

const fakeNames = Array.from(Array(LONG_LIST_COUNT), (): string => {
	return 'Index'
})

function ListItem({ name, highlight }: { name: string; highlight: string }): React.ReactElement {
	const index: number = name.toLowerCase().indexOf(highlight.toLowerCase())
	if (index === -1) {
		return <div>{name}</div>
	}
	return (
		<div>
			{name.slice(0, index)}
			<span className={styles['highlight']}>{name.slice(index, index + highlight.length)}</span>
			{name.slice(index + highlight.length)}
		</div>
	)
}

export function FilterList(): React.ReactElement {
	const [query, setQuery] = useState<string>('')
	const [highlight, setHighlight] = useState<string>('')
	const [isPending, startTransition] = useTransition()
	const changeHandler = ({ target: { value } }: { target: { value: any } }): void => {
		setQuery(value)
		const isUseTransition: boolean = true
		if (isUseTransition) {
			startTransition((): void => {
				setHighlight(value)
			})
		} else {
			setHighlight(value)
		}
	}
	return (
		<div>
			<input onChange={changeHandler} value={query} type="text" />
			{isPending && <span className={styles['pending']}>Loading...</span>}
			{fakeNames.map(
				(name: string, i: number): React.ReactElement => (
					<ListItem key={i} name={name} highlight={highlight} />
				)
			)}
		</div>
	)
}
