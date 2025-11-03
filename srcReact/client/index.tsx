import React from 'react'
import ReactDOMClient, { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import I18nProvider from 'srcReact/app/i18n/I18nProvider'
import { configureStore } from 'srcReact/app/store/redux'
import App from 'srcReact/app/App'

export function renderReactApp(): void {
	const __render_id__: number = Math.random()
	const store = configureStore()
	ReactDOMClient.createRoot(document.getElementById('reactApp') as HTMLElement).render(
		<Provider store={store}>
			<I18nProvider>
				<BrowserRouter>
					<HelmetProvider>
						<App __RenderProps__={{ __render_id__ }} reduxStore={store} />
					</HelmetProvider>
				</BrowserRouter>
			</I18nProvider>
		</Provider>
	)
}

renderReactApp()
