import React, { useState, useMemo, useCallback } from 'react'

export const UserProfile = () => {
	// 所有状态都在一个对象里
	const [user, setUser] = useState({
		name: 'John',
		age: 25,
		theme: 'light',
		preferences: {
			language: 'en',
			notifications: true,
		},
	})

	const updateName = () => {
		setUser((prev: any) => ({ ...prev, name: 'Jane' }))
	}

	const updateAge = () => {
		setUser((prev: any) => ({ ...prev, age: 26 }))
	}

	console.log('UserProfile 组件重渲染') // 每次状态更新都会打印

	return (
		<div>
			<NameDisplay name={user.name} />
			<AgeDisplay age={user.age} />
			<ThemeDisplay theme={user.theme} />
			<PreferencesDisplay preferences={user.preferences} />
			<button onClick={updateName}>更新名字</button>
			<button onClick={updateAge}>更新年龄</button>
		</div>
	)
}

// 子组件
const NameDisplay = React.memo(({ name }: { name: string }) => {
	console.log('NameDisplay 重渲染')
	return <div>Name: {name}</div>
})

const AgeDisplay = React.memo(({ age }: { age: number }) => {
	console.log('AgeDisplay 重渲染')
	return <div>Age: {age}</div>
})

const ThemeDisplay = React.memo(({ theme }: { theme: string }) => {
	console.log('ThemeDisplay 重渲染')
	return <div>Theme: {theme}</div>
})

const PreferencesDisplay = React.memo(({ preferences }: { preferences: any }) => {
	console.log('PreferencesDisplay 重渲染')
	return <div>Language: {preferences.language}</div>
})
