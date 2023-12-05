import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from "../../../utils/index"

const svgAttr = {
    ns: "http://www.w3.org/2000/svg"
}

const ARROW_NUM = 5;
const FIXED_SPACING = 50;

// 根据不同图形计算其中心和间距
const computingCenter = ({ tag, ...attr }) => {
    let o = {
        "rect": ({ x, y, width, height } = attr) => {
            return [x + width / 2, y + height / 2, width / 2, height / 2]
        },
        "circle": ({ cx, cy, r } = attr) => {
            return [cx, cy, r, r]
        }
    }
    return (tag && Object.hasOwn(o, tag) && o[tag](attr)) || new Array(4).fill(undefined)
}

// 根据中心和边距计算矩形的xy坐标和宽高
const rectOriginalCoordinates = (x, y, xr, yr, additionalX = 0, additionalY = 0) => {
    return {
        x: x - xr - additionalX,
        y: y - yr - additionalY,
        width: (xr + additionalX) * 2,
        height: (yr + additionalY) * 2
    }
}

// 连线
const countPolyline = ({ node1, node2 }, polyline) => {

    // 获取第一个图形的中心( x , y )和中心坐标到左右间距和上下间距( w , h )
    const [x1, y1, w1, h1] = computingCenter(node1)
    // 获取第二个图形的中心( x , y )和中心坐标到左右间距和上下间距( w , h )
    const [x2, y2, w2, h2] = computingCenter(node2)
    // 箭头方向 默认向右
    const attr = { fill: "transparent", markerEnd: "url(#arrow-right)", stroke: "#000", strokeWidth: "5", ...polyline }

    // 按需连接，计算图形中心点轴和上下左右边的交点坐标
    const calculateCoordinate = {
        left: ({ x, y, w }, flag = 0) => `${x - w - (flag && ARROW_NUM)} ${y}`,
        right: ({ x, y, w }, flag = 0) => `${x + w + (flag && ARROW_NUM)} ${y}`,
    }

    let points;
    // x轴
    // 同轴，折线为直线
    if (y1 == y2) points = [calculateCoordinate["right"]({ x: x1, w: w1, y: y1 }), calculateCoordinate["left"]({ x: x2, w: w2, y: y2 }, 1)]
    // 不同轴
    if (y1 != y2) {

        // 第二个图形在第一个图形前面 且 间距 大于等于 FIXED_SPACING 间距
        if (x2 - w2 - FIXED_SPACING >= x1 + w1) {
            // milestone 转折点，计算两图形间的中心点
            let milestone = (x1 + w1) + (x2 - w2 - x1 - w1) / 2
            let res = [`${milestone} ${y1}`, `${milestone} ${y2}`]
            points = [calculateCoordinate["right"]({ x: x1, w: w1, y: y1 }), ...res, calculateCoordinate["left"]({ x: x2, w: w2, y: y2 }, 1)]
        }
        // 第一个图形在第二个图形前面
        if (x2 - w2 - FIXED_SPACING < x1 + w1) {
            //  milestone 转折点，两个图形最右点 加上固定间距
            let milestone = Math.max(x1 + w1, x2 + w2) + FIXED_SPACING
            let res = [`${milestone} ${y1}`, `${milestone} ${y2}`]
            // 箭头方向 向左
            attr["markerEnd"] = "url(#arrow-left)"
            points = [calculateCoordinate["right"]({ x: x1, w: w1, y: y1 }), ...res, calculateCoordinate["right"]({ x: x2, w: w2, y: y2 }, 1)]
        }
    }
    attr["points"] = points
    return {
        tag: "polyline",
        ...attr
    }
}

// 合并计算后的xy
const mergeXY = {
    "rect": ((attr,{ x, y }) => { return { ...attr, x, y } }),
    "circle": ((attr,{ x, y }) => { return { ...attr, cx: x, cy: y } })
}

// 获取图形的原坐标
const obtainXY = {
    "rect": (({ x, y } = attr) => [x, y]),
    "circle": (({ cx, cy } = attr) => [cx, cy]),
}

export const SvgProvide = (props) => {
    const { svg, width = 100, height = 100, scale = 1, changeOperateState } = props

    useEffect(() => {
        debounceChangeOperateState(stateSvg)
    }, [stateSvg])

    const viewBox = [0, 0, width, height].map(item => item * scale).join(" ")
    const [stateSvg, setStateSvg] = useState(svg)
    const debounceChangeOperateState = debounce(changeOperateState, 1000)
    const changeAttr = (data, index) => {
        const newStateSvg = stateSvg.map((item, i) => {
            return i == index ? { ...data, custom: { ...data.custom, active: 1 } } : { ...item, custom: { ...item.custom, active: 0 } }
        })
        setStateSvg(newStateSvg)
    }

    const polylineList = useMemo(() => {
        let res = []
        let o = {}
        stateSvg.map(item => {
            const { id } = item
            o[id] = item
            return item
        }).filter(item => item?.custom?.connect?.length).forEach(item => {
            const { custom, id, ...attr } = item
            const { connect } = custom
            connect.forEach(({ id, ...attr } = c) => {
                res = [...res, countPolyline({ node1: item, node2: o[id] }, attr)]
            })
        })
        return res
    }, [stateSvg])


    const arrowList = ["arrow-top", "arrow-right", "arrow-bottom", "arrow-left"]
    const attr = {
        viewBox: `0 0 ${ARROW_NUM} ${ARROW_NUM}`, refX: `${ARROW_NUM / 2}`, refY: `${ARROW_NUM / 2}`,
        markerWidth: `${ARROW_NUM / 2}`, markerHeight: `${ARROW_NUM / 2}`,
    }

    return (<svg width={width} height={height} viewBox={viewBox} xmlns={svgAttr.ns}>
        <defs>
            {arrowList.map((item, index) => {
                const pathAttr = {
                    d: `M ${ARROW_NUM / 2} 0 L 0 ${ARROW_NUM} L ${ARROW_NUM} ${ARROW_NUM} z`, fill: "context-stroke",
                    transform: `rotate(${0 + index * 90} ${ARROW_NUM / 2} ${ARROW_NUM / 2})`
                }
                return (<marker {...{ id: item, ...attr }} key={index}>
                    <path {...pathAttr}></path>
                </marker>)

            })}
        </defs>
        {polylineList.map((item, index) => {
            const { custom, tag, ...attr } = item
            return <TagSvg {...{ custom, tag, attr, scale }} key={index} changeAttr={(data) => changeAttr(data, index)} />
        })}
        {stateSvg.map((item, index) => {
            const { custom, tag, ...attr } = item
            return <TagSvg {...{ custom, tag, attr, scale }} key={index} changeAttr={(data) => changeAttr(data, index)} />
        })}
    </svg>)
}



const TagSvg = (props) => {
    const { custom, tag, attr, changeAttr, scale } = props
    const mousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        changeAttr({ custom, tag, ...attr })

        // 判断图形
        const hasCoordinates = ({ countX, countY }) => {
            if (Object.hasOwn(obtainXY, tag)) {
                let [attrX, attrY] = obtainXY[tag](attr)
                let x = attrX + countX
                let y = attrY + countY
                return { custom, tag, ...mergeXY[tag](attr,{ x, y }) }
            } else {
                const { transform } = attr
                let countXY = []
                transform && transform.replace(/[0-9]+/g, (a, b, c) => countXY = [...countXY, Number(a)])
                const [x = 0, y = 0] = countXY
                return { custom, tag, ...attr, transform: `translate(${x + countX} ${y + countY})` }
            }
        }


        let { clientX: InitialValueX, clientY: InitialValueY } = e
        const move = ({ clientX: moveX, clientY: moveY } = moveEvent) => {
            let countX = (Number((moveX - InitialValueX).toFixed(0))) * scale
            let countY = (Number((moveY - InitialValueY).toFixed(0))) * scale
            changeAttr(hasCoordinates({ countX, countY }))
        }
        const up = (e) => {  // 鼠标松开结束事件的监听 
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };
        // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    };





    const o = {
        "rect": (({ id, ...publicAttr } = attr, { active } = custom) => {
            const rect = rectOriginalCoordinates(...computingCenter({ tag: "rect", ...publicAttr }), 10, 10)
            return <g className={`rect${active ? ' active' : ''}`}>
                <rect className='rect-outline' {...publicAttr} {...rect} ></rect >
                <rect onMouseDown={mousedown} {...attr}></rect>
            </g>
        }),
        "circle": (({ id, ...publicAttr } = attr, { active } = custom) => {
            const rect = rectOriginalCoordinates(...computingCenter({ tag: "circle", ...publicAttr }), 10, 10)
            return <g className={`circle${active ? ' active' : ''}`}>
                <rect className='rect-outline' {...publicAttr} {...rect} ></rect >
                <circle onMouseDown={mousedown} {...attr}></circle>
            </g>
        }),
        "polyline": ((attr) => <polyline {...attr}></polyline>),
        "g": ((attr, custom) => {
            const { childrenData, connector } = custom
            const connectorList = []
            if (connector) {
                childrenData.reduce((pre, cur) => {
                    const polyline = countPolyline({ node1: pre, node2: cur })
                    connectorList.push(polyline)
                    return cur
                })
            }

            const gChangeAttr = (data, index) => {
                const newChildrenData = childrenData.map((item, i) => {
                    const { custom, tag } = item
                    // return i == index ? { custom, tag, ...data } : item
                    return i == index ? { ...data, custom: { ...data.custom, active: 1 } } : { ...item, custom: { ...item.custom, active: 0 } }
                })
                changeAttr({ custom: { ...custom, childrenData: newChildrenData }, tag, ...attr })
            }
            return <g {...attr} onMouseDown={mousedown}>
                {connectorList.map((item, index) => {
                    const { custom, tag, ...attr } = item
                    return <TagSvg {...{ custom, tag, attr, scale }} key={index} />
                })}
                {childrenData.map((item, index) => {
                    const { custom, tag, ...attr } = item
                    return <TagSvg {...{ custom, tag, attr, scale }} key={index} changeAttr={(data) => gChangeAttr(data, index)} />
                })}
            </g>
        }),

    }
    return Object.hasOwn(o, tag) ? o[tag](attr, custom) : <></>
}




class Selector {
    name;
    _el;
    constructor({ name, el }) {
        this.name = name
        this._el = el || this.$()
    }

    $() {
        return document.querySelector(this.name)
    }
}

class Svg extends Selector {
    svg;
    ARROW_NUM = 5;
    FIXED_SPACING = 50;
    constructor(name) {
        super(name);
        this.svg;
        this.defs;
    }
    // 初始化 根svg
    initSvg(width = 100, height = 100, scale = 1) {
        const viewBox = [0, 0, width, height].map(item => item * scale).join(" ")
        let svg = this.appendSvg({ tag: "svg", attr: { width, height, viewBox } })
        this._el.appendChild(svg)
        this.svg = svg


    }
    // 初始化 defs
    initDefs(fn) {
        const defs = this.appendSvg({ tag: "defs" })
        this.defs = defs
        fn(defs)
    }

    get svgMap() {
        return {
            "rect": ({ el, attr }, fn) => this.appendSvg({ el, tag: "rect", attr }, fn), // rect 矩形
            "circle": ({ el, attr }, fn) => this.appendSvg({ el, tag: "circle", attr }, fn), // circle 圆形
            "ellipse": ({ el, attr }) => this.appendSvg({ el, tag: "ellipse", attr }), // ellipse 椭圆
            "polyline": ({ el, attr }) => this.appendSvg({ el, tag: "polyline", attr }), // polyline 折线
            "g": ({ el, attr }, fn) => this.createSvg({ el, tag: "g", attr }, fn),
            "marker": ({ el, attr }) => this.appendSvg({ el, tag: "marker", attr }),
            "path": ({ el, attr }) => this.appendSvg({ el, tag: "path", attr }),
        }
    }

    appendSvg({ el, tag, attr }, fn) {
        let item = document.createElementNS(svgAttr.ns, tag)
        for (let name in attr) item.setAttribute(name, attr[name])
        if (tag === "svg") return item
        if (['rect', 'circle',].includes(tag)) this.addMousedown({ el: item, tag, attr }, fn)
        if (el) el.appendChild(item)
        else this.svg.appendChild(item)
        return item
    }

    addMousedown({ el, tag, attr }, fn) {
        const returnCoordinate = {
            "rect": (({ x, y } = attr) => [x, y])(attr),
            "circle": (({ cx, cy } = attr) => [cx, cy])(attr),
        }
        const o = {
            "rect": (({ x, y }) => { return { ...attr, x, y } }),
            "circle": (({ x, y }) => { return { ...attr, cx: x, cy: y } })
        }
        el.addEventListener('mousedown', (e) => {
            let [attrX, attrY] = returnCoordinate[tag]
            let { clientX: InitialValueX, clientY: InitialValueY } = e
            const move = ({ clientX: moveX, clientY: moveY } = moveEvent) => {
                fn && fn(o[tag]({ x: attrX + Number((moveX - InitialValueX).toFixed(0)), y: attrY + Number((moveY - InitialValueY).toFixed(0)) }))
            }

            const up = (e) => {  // 鼠标松开结束事件的监听 
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });
    }



    // 新增重复使用图形
    addDefsItem(fn) {
        if (this.defs) {
            fn(this.defs)
        } else {
            this.initDefs(fn)
        }
    }

    // 初始化 箭头（上右下左），el === defs
    initArrow(el) {
        const attrs = (() => {
            const num = this.ARROW_NUM
            const attr = {
                viewBox: `0 0 ${num} ${num}`, refX: `${num / 2}`, refY: `${num / 2}`,
                markerWidth: `${num / 2}`, markerHeight: `${num / 2}`,
            }
            const arrowList = ["arrow-top", "arrow-right", "arrow-bottom", "arrow-left"]
            return arrowList.map((item, index) => {
                return {
                    id: item, ...attr, children: [
                        ["path", {
                            d: `M ${num / 2} 0 L 0 ${num} L ${num} ${num} z`, fill: "context-stroke",
                            transform: `rotate(${0 + index * 90} ${num / 2} ${num / 2})`
                        }]
                    ]
                }
            })
        })().forEach(attr => {
            this.createSvg({ el, tag: "marker", attr })
        })

    }

    createSvg({ el, tag, attr }) {
        // connector 判断是否连线
        const { children, connector, ...filterAttr } = attr
        const tagEl = this.appendSvg({ el, tag, attr: filterAttr })

        connector && children.reduce((pre, cur) => {
            this.countPolyline({ el: tagEl, node1: pre, node2: cur })
            return cur
        })

        children.forEach(([k, v], index) => this.svgMap[k] && this.svgMap[k]({ el: tagEl, attr: v }))

    }









    // 连线 ，两个图形之间的连线算法
    countPolyline({ el, node1, node2 }) {

        // 
        this.defs || this.addDefsItem((el) => {
            this.initArrow(el)
        })

        // 计算返回中心坐标( x , y )和中心坐标到左右间距和上下间距( w , h )
        const returnCoordinate = ([tag, attr]) => {
            let o = {
                "rect": (({ x, y, width, height } = attr) => {
                    return [x + width / 2, y + height / 2, width / 2, height / 2]
                })(attr),
                "circle": (({ cx, cy, r } = attr) => {
                    return [cx, cy, r, r]
                })(attr)
            }
            return tag, o[tag] || new Array(4).fill(undefined)
        }

        // 获取第一个图形的中心( x , y )和中心坐标到左右间距和上下间距( w , h )
        const [x1, y1, w1, h1] = returnCoordinate(node1)
        // 获取第二个图形的中心( x , y )和中心坐标到左右间距和上下间距( w , h )
        const [x2, y2, w2, h2] = returnCoordinate(node2)
        const [tag, attr] = ["polyline", { fill: "transparent" }]

        // 按需连接，计算图形中心点轴和上下左右边的交点坐标
        const calculateCoordinate = {
            left: ({ x, y, w }, flag = 0) => `${x - w - (flag && this.ARROW_NUM)} ${y}`,
            right: ({ x, y, w }, flag = 0) => `${x + w + (flag && this.ARROW_NUM)} ${y}`,
        }

        let points;
        // 同轴，折线为直线
        if (y1 == y2) points = [calculateCoordinate["right"]({ x: x1, w: w1, y: y1 }), calculateCoordinate["left"]({ x: x2, w: w2, y: y2 })]
        // 不同轴
        if (y1 != y2) {

            // 第二个图形在第一个图形前面 且 间距 大于等于 FIXED_SPACING 间距
            if (x2 - w2 - this.FIXED_SPACING >= x1 + w1) {
                // milestone 转折点，计算两图形间的中心点
                let milestone = (x1 + w1) + (x2 - w2 - x1 - w1) / 2
                let res = [`${milestone} ${y1}`, `${milestone} ${y2}`]
                // 箭头方向 向右
                attr["marker-end"] = "url(#arrow-right)"
                points = [calculateCoordinate["right"]({ x: x1, w: w1, y: y1 }), ...res, calculateCoordinate["left"]({ x: x2, w: w2, y: y2 }, 1)]
            }
            // 第一个图形在第二个图形前面
            if (x2 - w2 - this.FIXED_SPACING < x1 + w1) {
                //  milestone 转折点，两个图形最右点 加上固定间距
                let milestone = Math.max(x1 + w1, x2 + w2) + this.FIXED_SPACING
                let res = [`${milestone} ${y1}`, `${milestone} ${y2}`]
                // 箭头方向 向左
                attr["marker-end"] = "url(#arrow-left)"
                points = [calculateCoordinate["right"]({ x: x1, w: w1, y: y1 }), ...res, calculateCoordinate["right"]({ x: x2, w: w2, y: y2 }, 1)]
            }
        }
        attr["points"] = points
        this.svgMap[tag] && this.svgMap[tag]({ el, attr })

    }

}




export default Svg