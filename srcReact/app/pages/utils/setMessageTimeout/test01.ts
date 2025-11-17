import { setMessageTimeout } from '../../../utils/setMessageTimeout'
import { DiffJSON } from '../../../utils/DiffJSON'

function setTimeoutTest(): void {
	let a: number = performance.now()
	window.setTimeout((): void => {
		let b: number = performance.now()
		console.log(`native.level 01`, b - a)
		window.setTimeout((): void => {
			let c: number = performance.now()
			console.log(`native.level 02`, c - b)
			window.setTimeout((): void => {
				let d: number = performance.now()
				console.log(`native.level 03`, d - c)
				window.setTimeout((): void => {
					let e: number = performance.now()
					console.log(`native.level 04`, e - d)
					window.setTimeout((): void => {
						let f: number = performance.now()
						console.log(`native.level 05`, f - e)
						window.setTimeout((): void => {
							let g: number = performance.now()
							console.log(`native.level 06`, g - f)
							window.setTimeout((): void => {
								let h: number = performance.now()
								console.log(`native.level 07`, h - g)
								window.setTimeout((): void => {
									let i: number = performance.now()
									console.log(`native.level 08`, i - h)
									window.setTimeout((): void => {
										let j: number = performance.now()
										console.log(`native.level 09`, j - i)
										window.setTimeout((): void => {
											let k: number = performance.now()
											console.log(`native.level 10`, k - j)
										}, 0)
									}, 0)
								}, 0)
							}, 0)
						}, 0)
					}, 0)
				}, 0)
			}, 0)
		}, 0)
	}, 0)
}

function setMessageTimeoutTest(): void {
	let a: number = performance.now()
	setMessageTimeout((): void => {
		let b: number = performance.now()
		console.log(`-> polyfill.level 01`, b - a)
		setMessageTimeout((): void => {
			let c: number = performance.now()
			console.log(`-> polyfill.level 02`, c - b)
			setMessageTimeout((): void => {
				let d: number = performance.now()
				console.log(`-> polyfill.level 03`, d - c)
				setMessageTimeout((): void => {
					let e: number = performance.now()
					console.log(`-> polyfill.level 04`, e - d)
					setMessageTimeout((): void => {
						let f: number = performance.now()
						console.log(`-> polyfill.level 05`, f - e)
						setMessageTimeout((): void => {
							let g: number = performance.now()
							console.log(`-> polyfill.level 06`, g - f)
							setMessageTimeout((): void => {
								let h: number = performance.now()
								console.log(`-> polyfill.level 07`, h - g)
								setMessageTimeout((): void => {
									let i: number = performance.now()
									console.log(`-> polyfill.level 08`, i - h)
									setMessageTimeout((): void => {
										let j: number = performance.now()
										console.log(`-> polyfill.level 09`, j - i)
										setMessageTimeout((): void => {
											let k: number = performance.now()
											console.log(`-> polyfill.level 10`, k - j)
										})
									})
								})
							})
						})
					})
				})
			})
		})
	})
}

export function test01(): void {
	setTimeoutTest()
	setMessageTimeoutTest()
}
