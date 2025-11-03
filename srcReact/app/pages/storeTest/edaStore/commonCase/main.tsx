import React from 'react'
import { CountView } from './modules/attr/count'
import { PriceView } from './modules/attr/price'
import { ResultView } from './modules/attr/result'
import { AgeView } from './modules/info/age'
import { DisplayView } from './modules/info/display'
import { NameView } from './modules/info/name'
import { TitleView } from './modules/info/title'

export function Main(): React.ReactElement {
	return (
		<section>
			<div>Info: </div>
			<main>
				<TitleView />
				<NameView />
				<AgeView />
				<DisplayView />
			</main>
			<br />
			<div>Attr: </div>
			<main>
				<PriceView />
				<CountView />
				<ResultView />
			</main>
		</section>
	)
}
