export type TLinkListItem = {
	id: string
	title: string
	path: string
	desc: string
}

export type TStore = {
	g_languageSetting: string
	linkData: Array<{
		subject: string
		list: Array<TLinkListItem>
	}>
}

export enum ACTION_TYPE {
	MODIFY_GLOABL_LANG = 'MODIFY_GLOABL_LANG',
}
