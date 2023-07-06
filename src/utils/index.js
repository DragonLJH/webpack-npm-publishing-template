import { ref, getCurrentInstance, watchEffect } from "vue"

import { ElMessage, ElMessageBox } from 'element-plus'

const DOMAIN = "http://localhost:8787"
    // 固定对象属性得值添加 px 
export const toPx = (obj) => {
    const newObj = {...obj }
    Object.entries(newObj).forEach(([k, v]) => {
        if (Object.prototype.toString.call(v) == '[object Number]') newObj[k] += "px"
    })
    return newObj
}

export const useRouter = () => {
    const instance = getCurrentInstance()
    const { $route, $router } = instance.appContext.config.globalProperties
    return { $route, $router }
}
export const useThis = () => {
    const instance = getCurrentInstance()
    const { strLows, myPropsConfig, myStyleConfig, api } = instance.appContext.config.globalProperties
    const userName = "18022429170"
    return { strLows, myPropsConfig, myStyleConfig, api, userName }
}

export const repeatConfirmation = (data, fun, type) => {
    ElMessageBox.confirm(
            data, {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: type,
            }
        )
        .then(() => {
            fun()
            ElMessage({
                type: 'success',
                message: '操作成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '操作失败',
            })
        })
}