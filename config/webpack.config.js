const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require("webpack");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "../src/index.js"),
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'Development',
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "main.min.css" // 提取后的css的文件名
        }),
        new DefinePlugin({ __VUE_OPTIONS_API__: "true", __VUE_PROD_DEVTOOLS__: "false" }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.vue$/i,
                use: "vue-loader"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: "file-loader"
                    // type: "asset/resource"
            }
        ]
    },
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "../dist"),
        clean: true,
    },
    devServer: {
        compress: true,
        host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
        port: 3005, // 启动端口为 3001 的服务
        open: false // 自动打开浏览器
    },
}