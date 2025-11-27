import { TAlertOptions } from '../types/type'

export type TCacheValue = TAlertOptions & { id: string }
export const RuntimeCache: Map<string, TCacheValue> = new Map()
