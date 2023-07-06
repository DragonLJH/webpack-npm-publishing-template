const FETCHCONFIG = Symbol("FETCHCONFIG")
const MERGEURL = Symbol("MERGEURL")
const PARAMSSTR = Symbol("PARAMSSTR")
const FORMDATA = Symbol("FORMDATA")
const GETMERGEURL = Symbol("GETMERGEURL")
const DOMAIN = "http://localhost:8787"

export class Api {

    constructor() {

    }

    // 拼接域名
    [MERGEURL](url) {
        return DOMAIN + url
    }

    // 将参数转换成 & 和 = (xxx=xxx&yyy=yyy) 的形式
    [PARAMSSTR](params) {
        return Object.keys(params).map(item => {
            return item + "=" + params[item]
        }).join("&")
    }

    // 将参数转换成 表单 形式
    [FORMDATA](params) {
        const data = new FormData();
        Object.entries(params).map(([k, v]) => {
            data.append(k, v);
        })
        return data
    }

    // get 方法的拼接调用
    [GETMERGEURL](url, params) {
        if (params) {
            if (url.search(/\?/) !== -1) {
                url += this[PARAMSSTR](params)
            } else {
                url += "?" + this[PARAMSSTR](params)
            }
        }
        return this[MERGEURL](url)
    }


    // 拼接路径，文件方式获取参数
    montage(api = "", params) {
        return api + "/" + Object.values(params).join("/")
    }

    async GETAPI(api = "", params = {}) {
        let response = await fetch(this[GETMERGEURL](api, params), this[FETCHCONFIG]("GET"));
        return response.json()
    }

    async POSTAPI(api = "", params) {
        const config = {...this[FETCHCONFIG]("POST") }
        if (params) {
            if (Object.prototype.toString.call(params) == '[object Object]') {
                const data = new FormData();
                Object.entries(params).map(([k, v]) => {
                    data.append(k, v);
                })
                params = this[FORMDATA](params)
            }
            if (Object.prototype.toString.call(params) == '[object Array]') {
                params = JSON.stringify(params)
                config["headers"] = {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
            config["body"] = params
        }
        let response = await fetch(this[MERGEURL](api), config);
        return response.json()
    }

    [FETCHCONFIG](method) {
        return {
            mode: "cors",
            credentials: "include",
            method
        }
    }
}

export const apiInstall = (app) => {
    app.config.globalProperties.api = new Api();
}