const Lows = require.context('./', true, /\.vue$/)
const pages = require.context('./', true, /\page.js$/)

export const install = (app) => {
    app.config.globalProperties.strLows = pages.keys().map((item) => {
        const is = item.replace("./", "").replace("/page.js", "")
        return {...pages(item).default, is }
    })
    Lows.keys().forEach((item) => {
        const lowName = item.replace("./", "").replace("/index.vue", "")
        const lowComponent = Lows(item).default
        app.component(lowName, lowComponent);
    })
}