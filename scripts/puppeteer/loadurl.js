const createBrowser = require('../../config/puppeteer/createBrowser')

const TEST_URL = `http://www.baidu.com/`

async function main() {
	const browser = await createBrowser()
	const page = await browser.newPage()
	await page.goto(TEST_URL)
	await page.type(`#kw`, `puppeteer`, { delay: 100 })
	page.click(`#su`)
	await page.waitFor(1000)
	setTimeout(async () => {
		await page.close()
		await browser.close()
	}, 5000)
}

main()
