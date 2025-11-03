#### - sideEffects

1. package.sideEffects === true

    即声明当前模块/文件均存在副作用代码

    development 模式下无法通过 webpack.optimization 中的 sideEffects = true 来剪枝

2. package.sideEffects === false

    即声明当前模块/文件均不存在副作用代码

    development 模式下, 可设置 webpack.optimization 中的 sideEffects = true 来实现剪枝, 该 sideEffects = false 时不会进行剪枝

    production 模式下, 依然会保留具有副作用的代码片段

3. package.sideEffects === [...]

    例如: package.sideEffects = ["<星号>.less" , "<星号>.css", "src/utils/<星号>.js" ]

    即表明在数组内的模块/文件具有副作用代码, development 模式下无法通过 webpack.optimization 中的 sideEffects = true 来剪枝

    非数组范围内的其他模块可以进行剪枝

    且 production 模式下, 依然会保留非数组范围内的其他模块/文件内的具有副作用的代码片段
