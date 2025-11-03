function setClassStaticProperty(key: string, value: any) {
	return (target: any) => {
		target[key] = value
	}
}

function outputConsoleLog(target: any, name: string, descriptor: any) {
	/* 
        target: 被装饰的方法所在的类
        name: 被装饰的方法名称
        descriptor 对象初始值为:
            {
                value: target[name],
                enumerable: false,
                configurable: true,
                writable: true
            }
     */
	const oldValue = descriptor.value
	descriptor.value = function () {
		console.log(`Decorator: [OutputConsoleLog]: Calling ${name} with`, arguments)
		return oldValue.apply(this, arguments)
	}
}

@setClassStaticProperty('iden', 7854564)
@setClassStaticProperty('getNumber', (val: any) => {
	return val + ' ~~~ ' + Math.random()
})
class MyClass {
	private sindex: number

	static defaultProps = {
		sindex: 0,
	}

	static propTypes = {
		sindex: Number,
	}

	constructor(sindex: number = -1) {
		this.sindex = sindex
	}

	@outputConsoleLog
	add(num1: number, num2: number): number {
		return num1 + num2
	}
}

export default (): boolean => {
	const _MyClass: any = MyClass
	console.log(_MyClass.getNumber(_MyClass.iden))

	const myClass: MyClass = new MyClass()
	console.log(myClass.add(1, 2))
	console.log(myClass)
	return true
}
