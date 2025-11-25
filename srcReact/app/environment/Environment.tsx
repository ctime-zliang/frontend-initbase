import React from 'react'
import ReactDOMClient, { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import App from '../App'
import { reduxStore } from '../store/reduxToolkit'
import { resetFontsize } from '../utils/resetFontsize'
import I18nProvider from '../i18n/I18nProvider'
import { TapRipple } from '../utils/TapRipple'

export class Environment {
	private _isInit: boolean
	private _tapRippleInstance: TapRipple
	constructor() {
		this._isInit = false
		this._tapRippleInstance = new TapRipple('tap-ripple')
	}

	public init(): void {
		if (this._isInit) {
			return
		}
		this._isInit = true
		resetFontsize()
		this._tapRippleInstance.install()
		this.renderReactApp()
	}

	public get tapRippleInstance(): TapRipple {
		return this._tapRippleInstance
	}

	private renderReactApp(): void {
		console.log(`RenderReactApp ☆☆☆`)
		const __render_id__: number = Math.random()
		ReactDOMClient.createRoot(document.getElementById('reactApp') as HTMLElement).render(
			<Provider store={reduxStore}>
				<I18nProvider>
					<BrowserRouter>
						<HelmetProvider>
							<App __RenderProps__={{ __render_id__ }} reduxStore={reduxStore} />
						</HelmetProvider>
					</BrowserRouter>
				</I18nProvider>
			</Provider>
		)
	}
}

export const environment: Environment = new Environment()
