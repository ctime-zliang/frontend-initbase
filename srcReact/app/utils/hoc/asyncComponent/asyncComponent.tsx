import React, { useEffect, useState } from 'react'

export const asyncComponent = function (importComponent: any) {
	const styleObj = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '30px',
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	}
	return (props: any) => {
		const [component, setComponent] = useState(null)
		useEffect((): void => {
			importComponent().then((compt: any) => {
				// setComponent(compt.default)
				window.setTimeout((): void => {
					setComponent(compt.default)
				}, 300)
			})
		}, [])
		const IComponent: any = component
		if (IComponent) {
			return <IComponent {...props} />
		}
		// @ts-ignore
		return <div style={styleObj}>Loading Async Component...</div>
	}
}

/*
	asyncComponent(() => {
		return import(URL of Modules Component)
	})
 */
