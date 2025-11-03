import { TUseStore } from './types'

export function associateActions(store: TUseStore, actions: { [key: string]: any } = {}): { [key: string]: any } {
	const assActions: { [key: string]: any } = {}
	const actionsKeys: Array<string> = Object.keys(actions)
	for (let i: number = 0; i < actionsKeys.length; i++) {
		const item: any = actions[actionsKeys[i]]
		if (item instanceof Function) {
			assActions[actionsKeys[i]] = item.bind(undefined, store)
			continue
		}
		if (typeof item === 'object') {
			assActions[actionsKeys[i]] = associateActions(store, item)
			continue
		}
	}
	return assActions
}
