const Lows = require.context('./', true, /\.vue$/)
export const LowsConfigInstall = (app) => {
    Lows.keys().forEach((item) => {
        const lowName = item.replace("./", "").replace("/index.vue", "")
        const lowComponent = Lows(item).default
        app.component(lowName, lowComponent);
    })
}