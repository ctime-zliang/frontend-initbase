import { TContextMenu } from '../types/type'

export type TCacheValue = TContextMenu & { id: string }

export const RuntimeCache: Map<string, TCacheValue> = new Map()
export const ActiveCmdLinkCache: Map<string, Array<string>> = new Map()
