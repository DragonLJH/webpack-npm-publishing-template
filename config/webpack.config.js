const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "../src/index.js"),
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'Development',
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
    ],
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "../dist"),
        clean: true,
    }
}