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

    [USERFILESTORAGE](api, { userName, value }) {
        return this[GETMERGEURL](`/userFileStorage/${api}/${userName}/${value}`)
    }

    async GETAPI(api = "", params = { userName: "", value: "" }) {
        let response = await fetch(this[USERFILESTORAGE](api, params), this[FETCHCONFIG]("GET"));
        return response.json()
    }

    async POSTAPI(api = "", params = { userName: "", value: "", res: [] }) {
        let response = await fetch(this[USERFILESTORAGE](api, params), {
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