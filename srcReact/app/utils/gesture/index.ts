import { Gesture } from './Gesture'
import { TapRipple } from './TapRipple'
import { TExtendPointer, TListenerExtendPointerEvent } from './types'

export type ListenerExtendPointerEvent = TListenerExtendPointerEvent
export type ExtendPointer = TExtendPointer

export function attachGesture(hostElements: Array<HTMLElement>): Gesture {
	return new Gesture(hostElements)
}

export function attachTapRipple(name: string): TapRipple {
	return new TapRipple(name)
}
