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


#### 安装路由 react-router-dom 依赖

    npm i react-router-dom@5 -D


#### 安装 scss 预处理器

    npm i sass --save-dev

    npm i node-sass@6.0.1 --save-dev

    npm i sass-loader@10.2.1 --save-dev
   
    1. webpack 配置
    {
        test: /\.s?([ac])ss$/,
        use: ['style-loader','css-loader','sass-loader'],
        exclude: /\.min\.css$/,
    }






