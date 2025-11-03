import React from 'react'
import { TIconTagsProps } from '../types/type'

export function IconTags(props: TIconTagsProps): React.ReactElement {
	const { iconClassName = '' } = props
	if (!iconClassName) {
		return null as unknown as React.ReactElement
	}
	/* ... */
	const iconClassNameMixin: string = `ctxmenu-prep-icon` + (iconClassName ? ` ${iconClassName}` : '')
	return (
		<>
			<i className={iconClassNameMixin} />
		</>
	)
}

export default React.memo(IconTags)
