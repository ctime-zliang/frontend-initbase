const fs = require('fs')
const path = require('path')

const sortKeys = async function (keys) {
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(__dirname, '../package.json'), function (err, data) {
			if (err) {
				console.log(`Read File Error`, err)
				reject(err)
				return
			}
			const sourcePkgData = JSON.parse(data)
			const newPkgData = { ...sourcePkgData }
			for (let i = 0; i < keys.length; i++) {
				const sourceKeys = Object.keys(sourcePkgData[keys[i]])
				newPkgData[keys[i]] = {}
				sourceKeys
					.sort((a, b) => {
						return a.localeCompare(b)
					})
					.forEach((item, index) => {
						newPkgData[keys[i]][item] = sourcePkgData[keys[i]][item]
					})
				fs.writeFileSync(path.join(__dirname, './sort-package.json'), JSON.stringify(newPkgData, null, '\t'))
			}
			resolve(`Done!`)
			console.log(`Done!`)
		})
	})
}

async function main() {
	await sortKeys(['devDependencies', 'dependencies'])
}

main()
