import './index.css'
// import install from "./components/index.js"
// import install from "webpack-npm-publishing-template"
// install()
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import router from './router/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { install } from "./components/Lows/index.js"

const app = createApp(App)
app.use(router).use(ElementPlus).use(install)
app.mount('#app')