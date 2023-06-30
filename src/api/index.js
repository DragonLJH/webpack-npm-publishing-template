const FETCHCONFIG = Symbol("FETCHCONFIG")
const USERFILESTORAGE = Symbol("USERFILESTORAGE")
const GETMERGEURL = Symbol("GETMERGEURL")
const DOMAIN = "http://localhost:8787"

export class Api {

    constructor() {

    }

    [GETMERGEURL](url, params) {
        if (params) {
            let data = Object.keys(params).map((item) => {
                return item + "=" + (Object.prototype.toString.call(params[item]) == '[object Array]' ? JSON.stringify(params[item]) : params[item])
            })
            if (url.search(/\?/) !== -1) {
                url += data.join("&")
            } else {
                url += "?" + data.join("&")
            }
        }
        return DOMAIN + url
    }

    [USERFILESTORAGE](api, params) {
        let { userName, path } = params
        userName = userName && '/' + userName
        path = path && '/' + path
        api += userName ? userName : ""
        api += path ? path : ""
        return this[GETMERGEURL](api, params)
    }

    async GETAPI(api = "", params = {}) {
        let response = await fetch(this[USERFILESTORAGE](api, params), this[FETCHCONFIG]("GET"));
        return response.json()
    }

    async POSTAPI(api = "", params = { res: [] }) {
        let { userName, path } = params
        let response = await fetch(this[USERFILESTORAGE](api, { userName, path }), {
            ...this[FETCHCONFIG]("POST"),
            body: JSON.stringify(params.res)
        });
        return response.json()
    }

    [FETCHCONFIG](method) {
        return {
            mode: "cors",
            credentials: "include",
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    }
}

export const apiInstall = (app) => {
    app.config.globalProperties.api = new Api();
}