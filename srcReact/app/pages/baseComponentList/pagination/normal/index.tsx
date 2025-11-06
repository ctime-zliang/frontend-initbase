import React, { useEffect, useState } from 'react'
import { Pagination } from '../../../../componnet/pagination'

const pageToggle = (action: string, value: number): void => {
	console.log('pageToggle', action, value)
}
const pagePiecewise = (value: number): void => {
	console.log('pagePiecewise', value)
}

function PaginationNoraml(props: any): React.ReactElement {
	const [cutSizeOptions] = useState<Array<number>>([15, 25, 35, 45, 55])
	const [gDisabled, setGDisabled] = useState<boolean>(true)
	useEffect((): void => {
		window.setTimeout((): void => {
			setGDisabled(false)
		}, 1500)
	}, [])
	return (
		<section style={{ padding: `5px 5px 15px 5px` }}>
			<h3>$. 完整模式</h3>
			<Pagination
				pageNumber={1}
				countTotal={1000}
				middleDisplaySize={5}
				sideDislpaySize={2}
				cutSize={cutSizeOptions[0]}
				cutSizeOptions={cutSizeOptions}
				pageToggle={pageToggle}
				pagePiecewise={pagePiecewise}
				gDisabled={gDisabled}
			/>
		</section>
	)
}

export default React.memo(PaginationNoraml)
