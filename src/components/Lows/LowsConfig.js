const myPropsConfigData = Symbol("myPropsConfigData")
const myStyleConfigData = Symbol("myPropsConfigData")
export class myPropsConfig {
    [myPropsConfigData] = {
        "LowRouterLinks": {},
        "LowRouterView": {},
        "LowText": {
            textVal: {
                label: "值",
                type: "String"
            },
            display: {
                label: "显示方式",
                type: "Array",
                data: [
                    { label: "默认", value: "" },
                    { label: "Flex", value: "flex" },
                ]
            },
            aline: {
                label: "排列方式",
                type: "Array",
                data: [
                    { label: "默认", value: "" },
                    { label: "左", value: "left" },
                    { label: "中", value: "center" },
                    { label: "右", value: "right" },
                    { label: "中心(Flex)", value: "all-center" },
                ]
            },
        },

    }
    constructor() {}
    get(target) {
        return this[myPropsConfigData][target]
    }
}

export class myStyleConfig {
    [myStyleConfigData] = {
        top: {
            label: "Y",
            type: "Number",
            min: 0
        },
        left: {
            label: "X",
            type: "Number",
            min: 0
        },
        width: {
            label: "宽",
            type: "Number",
            min: 5
        },
        height: {
            label: "高",
            type: "Number",
            min: 5
        },
    }
    constructor() {
        return this[myStyleConfigData]
    }
}