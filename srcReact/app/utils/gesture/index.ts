import { Gesture } from './Gesture'
import { TapRipple, TTapRippleOptional } from './TapRipple'
import { TExtendPointer, TListenerExtendPointerEvent, TPlainDot } from './types'

export type ListenerExtendPointerEvent = TListenerExtendPointerEvent
export type ExtendPointer = TExtendPointer
export type PlainDot = TPlainDot

export function attachGesture(hostElements: Array<HTMLElement>): Gesture {
	return new Gesture(hostElements)
}

export function attachTapRipple(name: string, optional: TTapRippleOptional = {}): TapRipple {
	return new TapRipple(name, optional)
}
