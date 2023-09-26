### 搭建React
#### 安装 react react-dom 依赖

    npm i react react-dom

#### 安装 babel 相关依赖

    npm i @babel/core @babel/preset-env @babel/preset-react babel-loader -D 

    1. webpack.config.js 配置
    module: {
        rules: [
            ...
            {
                test: /\.(js|jsx)$/i,
                use: ["babel-loader"]
            }
            ...
        ]
    }
    2. babel.config.json 配置
    {
        "presets": ["@babel/preset-react"],
        "env": {
            "development": {
            "presets": [["@babel/preset-react", { "development": true }]]
            }
        }
    }
    3. .babelrc 配置
    {
        "presets": [["@babel/preset-env", { "modules": false }]]
    }






   





