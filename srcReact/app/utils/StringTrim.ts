export class StringTrim {
	/**
	 * 删除首尾空白
	 */
	static removeAround(string: string): string {
		if (!string || typeof string !== 'string') {
			return string
		}
		if (String.prototype.trim instanceof Function) {
			return string.trim()
		}
		return string.replace(/(^\s*)|(\s*$)/g, '')
	}

	/**
	 * 删除HTML标签标记
	 */
	static removeHTMLTag(string: string): string {
		if (!string || typeof string !== 'string') {
			return string
		}
		return string.replace(/<\/?[^>]*>/g, '')
	}

	/**
	 * 删除 &nbsp;
	 */
	static removeNBSPTag(string: string): string {
		if (!string || typeof string !== 'string') {
			return string
		}
		return string.replace(/&nbsp;/gi, '')
	}

	/**
	 * 删除多余空行
	 */
	static removeBlankLine(string: string): string {
		if (!string || typeof string !== 'string') {
			return string
		}
		return string.replace(/\n[\s||]*\r/g, '\n')
	}

	/**
	 * 处理存储型 XSS 输入标签
	 */
	static handleXSS(string: string): string {
		if (!string || typeof string !== 'string') {
			return string
		}
		return string
			.replace(/<|&lt;/g, '&lt;')
			.replace(/>|&gt;/g, '&gt;')
			.replace(/\'|&#39;/g, '&#39;')
			.replace(/\"|&quot;/g, '&quot;')
	}
}
