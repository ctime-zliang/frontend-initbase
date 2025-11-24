import React from 'react'
import { CountView } from './modules/attr/CountView'
import { PriceView } from './modules/attr/PriceView'
import { ResultView } from './modules/attr/ResultView'
import { AgeView } from './modules/info/AgeView'
import { DisplayView } from './modules/info/DisplayView'
import { NameView } from './modules/info/NameView'
import { TitleView } from './modules/info/TitleView'

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
