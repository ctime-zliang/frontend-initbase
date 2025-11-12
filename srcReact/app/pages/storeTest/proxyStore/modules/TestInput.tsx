import React, { useState } from 'react'

export function TestInput(): React.ReactElement {
	console.log(`Test Component: TestInput`)
	const [inputValue, setInputValue] = useState<string>('')
	const inputInputAction = (e: React.FormEvent<HTMLInputElement>): void => {
		const value: string = (e.target as HTMLInputElement).value
		setInputValue(value)
	}
	return (
		<main>
			<label>Input: </label>
			<input type="text" value={inputValue} onChange={inputInputAction} />
		</main>
	)
}
