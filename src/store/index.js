import { reactive, defineComponent, h } from "vue"
import { defineStore } from 'pinia'
import { useThis } from '../utils/index';
import { useRoute, useRouter } from "vue-router"
import { Api } from "../api/index"

const api = new Api()




// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
    // 其他配置...
})

const getChildrenName = (data) => {
    let arr = []
    data.forEach((item) => {
        if (item.children.length) {
            item.children.forEach((val) => {
                arr.push(val.name)
            })
        }
    })
    return arr
}


export const useRouterStore = defineStore('my-router', () => {
    const data = reactive({
        router: []
    })
    async function getRouter() {
        const router = useRouter()
        const res = await api.GETAPI("/router/queryRouterByUser", { routerUser: "18022429170" })
        res.result.forEach(item => {
            const { routerName: name, routerPath: path, routerComponent: component } = item
            const routerView = defineComponent((props) => {
                return () => {
                    // 渲染函数或 JSX
                    return h('div', {
                        class: props.class
                    }, h('router-view'))
                }
            }, {
                props: ["class"]
            })
            router.addRoute({ name, path, component: () => routerView.setup({ class: component }) })

            // console.log({ name, path, component })
        });
        const routes = router.getRoutes().filter((item) => !getChildrenName(router.getRoutes()).includes(item.name))
        console.log("useRouterStore", routes)


        data.router = routes
    }

    return { data, getRouter }
})