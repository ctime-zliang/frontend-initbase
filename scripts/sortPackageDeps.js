const fs = require('fs')
const path = require('path')

const inputFile = path.resolve(process.cwd(), './package.json')
const outputFile = path.resolve(process.cwd(), './package.sorted.json')

function sortObjectKeys(obj) {
	return Object.keys(obj)
		.sort()
		.reduce((res, key) => {
			res[key] = obj[key]
			return res
		}, {})
}

function main() {
	if (!fs.existsSync(inputFile)) {
		console.error('❌ package.json 文件不存在！')
		process.exit(1)
	}

	const pkg = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

	if (pkg.dependencies) {
		pkg.dependencies = sortObjectKeys(pkg.dependencies)
	}

	if (pkg.devDependencies) {
		pkg.devDependencies = sortObjectKeys(pkg.devDependencies)
	}

	fs.writeFileSync(outputFile, JSON.stringify(pkg, null, 4), 'utf8')

	console.log(`✅ 已生成排序后的文件：${outputFile}`)
}

main()
