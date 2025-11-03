# husky 配置

#### 使用 husky

-   清楚历史 husky 设置

    ```
    git config  --unset core.hookspath
    ```

-   安装 husky

    ```
    npm install husky -D

    npm install lint-staged -D
    ```

-   将 husky 安装到 git

    ```
    npx husky install
    ```

-   针对某一个 git hook 增加一条指令

    ```
    npx husky add .husky/[git-hook name] "npm run [script name in package.json]"
    ```

    ```
    // 此命令将在 <rootDir>/.husky 下新建一条 pre-commit shell 脚本
    npx husky add .husky/pre-commit "npm run tsc:check"

    // 此命令将在 <rootDir>/.husky/ 下增加一个名称为 pre-commit 的无扩展名文件
    // 如果 add 命令无法正常生成该文件, 手抖创建即可(文件内容如下)
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    npm run tsc:check
    ```

#### 使用 lint-stage

-   增加 lint-stage 指令

    ```
    // 在 package.json 根层级中增加指令
    "lint-staged": {
    	"*.{js, ts, tsx, jsx}": [
    		"tsc:check"
    	]
    }
    ```

-   增加 npx 指令

    ```
    // 在 package.json scripts 中增加指令
    "lint:staged": "lint-staged"

    // 可以在 <rootDir>/.husky/pre-commit 中增加 npm run lint:staged 指令
    ```
