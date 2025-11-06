import React, { useCallback, useEffect, useRef } from 'react'
import { ClockCanvas } from '../../utils/ClockCanvas'
import styled from 'styled-components'

const Container = styled.section`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	flex-wrap: nowrap;
`

const BETWEEN_HEIGHT: number = 100
const RATIO: number = 0.55

function ClockCanvasRoot() {
	const clockReference = useRef<ClockCanvas>(null as unknown as ClockCanvas)
	const canvsElementReference = useRef<HTMLCanvasElement>(null as unknown as HTMLCanvasElement)
	const initClock = (): void => {
		clockReference.current = new ClockCanvas(canvsElementReference.current as HTMLCanvasElement)
	}
	const resizeHandler = useCallback((e?: any): void => {
		const rootElement: HTMLElement = document.documentElement || document.body
		const areaHeight: number = rootElement.getBoundingClientRect().height - BETWEEN_HEIGHT
		if (clockReference.current) {
			clockReference.current.stop()
			clockReference.current.setCanvasRect(areaHeight * RATIO, areaHeight * RATIO)
			clockReference.current.start()
		}
	}, [])
	useEffect((): (() => void) => {
		initClock()
		resizeHandler()
		window.addEventListener('resize', resizeHandler)
		return (): void => {
			if (clockReference.current) {
				clockReference.current.stop()
			}
			window.removeEventListener('resize', resizeHandler)
		}
	}, [])
	return (
		<Container>
			<canvas ref={canvsElementReference} width={0} height={0}></canvas>
		</Container>
	)
}

export default React.memo(ClockCanvasRoot)
