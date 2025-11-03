import axios, { AxiosResponse } from 'axios'

const RequestConfig: { [key: string]: any } = {
	defaultErrMsg: `System Error`,
}
export type TRequestResponse = {
	ret: number
	msg: string
	data: any
	remote?: any
}
export async function requestByGet(url: string, data: any = null, options: { [key: string]: any } = {}): Promise<TRequestResponse> {
	return new Promise(async (_): Promise<void> => {
		try {
			axios.defaults.withCredentials = true
			const sourceRes: AxiosResponse = await axios.get(url, { ...data, ...options })
			_({ ret: 0, msg: ``, data: sourceRes.data, remote: null })
		} catch (e: any) {
			if (typeof e.isAxiosError !== 'undefined') {
				_({ ret: e.response.status, msg: e.message, data: null, remote: e })
				return
			}
			_({ ret: -1, msg: RequestConfig.defaultErrMsg, data: null, remote: e })
		}
	})
}
