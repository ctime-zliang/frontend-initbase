import React from 'react'
import ReactDOMClient, { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import I18nProvider from 'srcReact/app/i18n/I18nProvider'
import App from '../app/App'
import { reduxStore } from '../app/store/reduxToolkit'

export function renderReactApp(): void {
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

renderReactApp()
