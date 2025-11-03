import { TUseStore } from './types'

export function flushListeners(store: TUseStore): void {
	const listeners = store.listeners || []
	for (let i: number = 0; i < listeners.length; i++) {
		if (listeners[i].run instanceof Function) {
			;(listeners[i].run as Function)(store.state)
		}
	}
}
