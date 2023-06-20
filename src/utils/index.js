// 固定对象属性得值添加 px 
export const toPx = (obj) => {
    const newObj = {...obj }
    Object.entries(newObj).forEach(([k, v]) => {
        if (Object.prototype.toString.call(v) == '[object Number]') newObj[k] += "px"
    })
    return newObj
}