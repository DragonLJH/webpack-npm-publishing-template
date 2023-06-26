import { ref, getCurrentInstance, watchEffect } from "vue"

const DOMAIN = "http://localhost:8787"
    // 固定对象属性得值添加 px 
export const toPx = (obj) => {
    const newObj = {...obj }
    Object.entries(newObj).forEach(([k, v]) => {
        if (Object.prototype.toString.call(v) == '[object Number]') newObj[k] += "px"
    })
    return newObj
}


export const getMergeUrl = (url, params) => {
    if (params) {
        let data = Object.keys(params).map((item) => {
            return item + "=" + params[item]
        })
        if (url.search(/\?/) !== -1) {
            url += data.join("&")
        } else {
            url += "?" + data.join("&")
        }
    }
    return DOMAIN + url
}

export const useRouter = () => {
    const instance = getCurrentInstance()
    const { $route, $router } = instance.appContext.config.globalProperties
    return { $route, $router }
}
export const useThis = () => {
    const instance = getCurrentInstance()
    const { strLows } = instance.appContext.config.globalProperties
    return { strLows }
}