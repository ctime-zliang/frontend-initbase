import { TCacheValue } from '../types/type'

export const RuntimeCache: Map<string, TCacheValue> = new Map()
export const ActiveCmdLinkCache: Map<string, Array<string>> = new Map()
