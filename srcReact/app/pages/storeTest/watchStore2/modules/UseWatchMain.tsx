import React from 'react'
import { CountView } from './attr/CountView'
import { PriceView } from './attr/PriceView'
import { ResultView } from './attr/ResultView'
import { AgeView } from './info/AgeView'
import { DisplayView } from './info/DisplayView'
import { NameView } from './info/NameView'
import { TitleView } from './info/TitleView'

export function UseWatchMain(): React.ReactElement {
	return (
		<section>
			<div>UseWatchMain</div>
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
