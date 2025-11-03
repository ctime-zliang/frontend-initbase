import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import i18nextXHRBackend from 'i18next-xhr-backend'
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider } from 'react-i18next'
import { useSelector } from 'react-redux'

/* ... */
import zhCN from './locales/zh_cn/translation.json'
import enUS from './locales/en_us/translation.json'
import { getLanguageSetting } from '../store/globalDefault/selectors'

const DEFAULT_NAMESPACE: string = 'DEFAULT_NAMESPACE'
const i18n = i18next
	.use(i18nextXHRBackend)
	.use(i18nextBrowserLanguageDetector)
	.init({
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
			// crossDomain: true
		},
		debug: false,
		lng: 'en_us',
		fallbackLng: 'en_us',
		defaultNS: DEFAULT_NAMESPACE,
		ns: [DEFAULT_NAMESPACE],
		partialBundledLanguages: true,
		resources: {
			zh_cn: { [DEFAULT_NAMESPACE]: zhCN },
			en_us: { [DEFAULT_NAMESPACE]: enUS },
		},
		parseMissingKeyHandler(missing: any) {
			// console.warn('MISSING TRANSLATION:', missing)
			return missing
		},
	})

i18next.languages = ['zh_cn', 'en_us']

export const i18Next = i18next

/************************************ ************************************/
/************************************ ************************************/
/************************************ ************************************/

function I18nProvider(props: any): React.ReactElement {
	const languageSetting: string = useSelector(getLanguageSetting)
	const [isInitial, setIsInitial] = useState<boolean>(true)
	console.log(`I18nProvider 🌙🌙🌙`, props, languageSetting)
	useEffect((): void => {
		i18next.changeLanguage(languageSetting)
	}, [languageSetting])
	if (isInitial) {
		setIsInitial(false)
		i18next.changeLanguage(languageSetting)
	}
	return <I18nextProvider i18n={i18next}>{props.children}</I18nextProvider>
}

export default React.memo(I18nProvider)
