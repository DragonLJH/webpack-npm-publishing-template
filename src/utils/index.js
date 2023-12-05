var id = 0;

export const getID = () => {
    return id++
}

var str = "abcdefghijkmnpqrstuvwxyABCDEFGHIJLMNOPQRSTUVWXYZ123456789"
// 随机字符
export const randomStr = (num) => {
    let res = new Array(num).fill(null).map(_ => {
        let index = Math.round(Math.random() * (str.length - 1))
        return str[index]
    })
    return res 
}
// 随机颜色
export const randomColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8)
}
// 随机数
export const randomNum = (num, zero = false) => {
    const res = parseInt((Math.random() * num).toFixed(0))
    return res || zero ? res : res + 1
}

// 验证码 画板
export const codeCanvas = (el, num = 4) => {
    var str = randomStr(num)
    var ctx = el.getContext("2d");
    ctx.fillStyle = randomColor();
    ctx.fillRect(0, 0, 25 * num, 30);
    ctx.font = "30px Arial";
    str.forEach((item, index) => {
        ctx.fillStyle = randomColor();
        ctx.fillText(item, 16 * (index + 1), 25);
    })
    return str.join("")
}

// 防抖
export const debounce = (fn, delay = 500) => {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, delay)
    }
}

// 数组 转 map
export const arrayToMap = (data, target) => {
    let map = new Map()
    data && data.forEach(function (item, index) {
        const [key, value] = target(item, index)
        if (map.has(key)) {
            if (Object.prototype.toString.call(map.get(key)) === "[object Object]") {
                map.set(key, [map.get(key), value])
            }
            if (Object.prototype.toString.call(map.get(key)) === "[object Array]") {
                map.set(key, [...map.get(key), value])
            }
        } else {
            map.set(key, value)
        }

    })
    return map
}

export const addPxSuffix = (data) => {
    data = { ...data }
    const list = ["top", "left", "width", "height"]
    list.forEach(item => {
        if (Object.hasOwn(data, item)) {
            data[item] += "px"
        }
    })
    return data
}

// 将字符串转换成xml对象
export const stringToXML = (xmlString) => {
    let parser = new DOMParser();
    let xmlObject = parser.parseFromString(xmlString, "text/xml");
    return xmlObject;
}
// 将xml对象转换成字符串
export const xml2String = (xmlObject) => {
    return (new XMLSerializer()).serializeToString(xmlObject);
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};