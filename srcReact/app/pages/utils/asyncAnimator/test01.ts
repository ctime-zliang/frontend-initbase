import { AsyncAnimator } from '../../../utils/AsyncAnimator'

export function createAnimators01(boxElement: HTMLElement): Array<AsyncAnimator> {
	const a1: AsyncAnimator = new AsyncAnimator(1000, progress => {
		const tx = 300 * progress
		boxElement.style.transform = 'translateX(' + tx + 'px)'
	})
	const a2: AsyncAnimator = new AsyncAnimator(1000, progress => {
		const ty = 300 * progress
		boxElement.style.transform = 'translate(300px,' + ty + 'px)'
	})
	const a3: AsyncAnimator = new AsyncAnimator(1000, progress => {
		const tx = 300 * (1 - progress)
		boxElement.style.transform = 'translate(' + tx + 'px, 300px)'
	})
	const a4: AsyncAnimator = new AsyncAnimator(1000, progress => {
		const ty = 300 * (1 - progress)
		boxElement.style.transform = 'translateY(' + ty + 'px)'
	})
	return [a1, a2, a3, a4]
}

export async function test01(animators: Array<AsyncAnimator>): Promise<void> {
	while (true) {
		for (let i: number = 0; i < animators.length; i++) {
			await animators[i].animate()
		}
	}
}
