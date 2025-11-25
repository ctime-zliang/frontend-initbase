import { Gesture } from './Gesture'
import { TExtendPointer, TListenerExtendPointerEvent, TPlainDot } from './types'

export type ListenerExtendPointerEvent = TListenerExtendPointerEvent
export type ExtendPointer = TExtendPointer
export type PlainDot = TPlainDot

export function attachGesture(hostElements: Array<HTMLElement>): Gesture {
	return new Gesture(hostElements)
}
