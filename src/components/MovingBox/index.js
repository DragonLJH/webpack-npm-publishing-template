import "./index.scss"
import React, { useState, useRef, useReducer, useMemo } from "react"
import { AppstoreOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { getID } from "../../utils/index.js"
import Control from "./Control/index.js"
import { addPxSuffix, debounce } from "../../utils/index.js"

const registerComponentMap = new Map()

const Compose = (props) => {
    const { compose } = props
    return compose.map((res, index) => {
        return <div key={index} style={{ ...res.style, position: "absolute" }}>
            {res.component(res.propValue)}
        </div>
    })
}

registerComponentMap.set("compose",
    {
        component: (data) => <Compose {...data} />,
        componentId: "compose",
        label: "组合",
        propValue: [],
        style: {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        },
        isShow: false
    }
)

const MovingBox = (props) => {
    const { registerComponent, mode } = props

    const registerComponentMomo = useMemo(
        () => {
            console.log(registerComponent)
            Object.entries(registerComponent).forEach(([k, v]) => {
                v["id"] = getID()
                v["componentId"] = k
                registerComponentMap.set(k, v)
            })
            return registerComponentMap
        }, [registerComponent]
    )

    const movingBox = useRef()

    const myAuth = useAuth()

    let { componentData, selectComponent, selectComponentIndex } = myAuth.state


    // const [mainInsideData, setMainInsideData] = useState({ top: 0, left: 0, width: 0, height: 0 }) //辅助线拖拽实时

    const [range, setRange] = useState({ top: 0, left: 0, width: 0, height: 0 }) //选中范围

    const [makeUpProps, setMakeUpProps] = useState({ compose: [], indexs: [] });

    const setComponentData = (data, index) => {
        let newComponentData = [...myAuth.state.componentData]
        newComponentData.splice(index, 1, data)
        myAuth.updataSelectComponent(data)
        myAuth.updataComponentData(newComponentData)
    }

    // 辅助线
    // const setMainInsideDataFun = (data) => {
    //     console.log("setMainInsideDataFun", data)
    //     setMainInsideData(data)
    // }

    const myDragstart = (e) => {
        e.dataTransfer.setData("index", e.target.dataset.index);
    }

    const useMyDrop = (e) => {  // 拖拽事件 
        let index = e.dataTransfer.getData("index"); // 获取拖拽组件的id
        let componentItem = registerComponentMomo.get(index)     // 获取拖拽组件
        let { clientX, clientY } = e  // 获取落点的 x y（clientX，clientY） 坐标
        let { x, y } = movingBox.current.getBoundingClientRect() // getBoundingClientRect()获取 movingBox 元素的左，上，右和下分别相对浏览器视窗的位置
        componentItem.style = { ...componentItem.style, left: clientX - x, top: clientY - y }  // 给组件添加 x y（clientX，clientY） 坐标
        // dispatch({ type: 'increment', data: { ...componentItem, id: "component" + getID() } })  // 添加组件
        let newComponentItem = { ...componentItem, id: "component" + getID() }
        myAuth.increment(newComponentItem)

        e.preventDefault();
        e.stopPropagation();
    }

    const myDragOver = (e) => {  // 让拖拽事件获取落点的 x y（clientX，clientY） 坐标 
        e.preventDefault();
        e.stopPropagation();
    }

    const myMouseDown = (e) => {
        myAuth.changeSelect()
        if (mode == "play") return
        setRange({ top: 0, left: 0, width: 0, height: 0 })
        // 初始节点
        let { clientX: InitialValueX, clientY: InitialValueY } = e

        const move = (moveEvent) => {
            // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
            // 移动后的坐标
            let { clientX: moveX, clientY: moveY } = moveEvent
            let { x, y } = movingBox.current.getBoundingClientRect() // getBoundingClientRect()获取 movingBox 元素的左，上，右和下分别相对浏览器视窗的位置 
            let sLeft = (InitialValueX - x)
            let sTop = (InitialValueY - y)
            let sWidth = (moveX - InitialValueX)
            let sHeight = (moveY - InitialValueY)

            rangeCheck(sLeft, sTop, sLeft + sWidth, sTop + sHeight)
            if (sWidth < 0) {
                sLeft += sWidth
            }
            if (sHeight < 0) {
                sTop += sHeight
            }
            setRange({ top: sTop, left: sLeft, width: Math.abs(sWidth), height: Math.abs(sHeight) })
        }
        const up = (e) => {  // 鼠标松开结束事件的监听
            // setRange({ top: 0, left: 0, width: 0, height: 0 })
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };
        // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }

    const debounceRange = debounce((param) => {
        const { maxX, minX, maxY, minY, res } = param
        // 计算出选中的组件
        for (let i = 0; i < componentData.length; i++) {
            let { top, left, width, height } = componentData[i].style
            if (minX < left && left + width < maxX && minY < top && top + height < maxY) {
                res.indexs.unshift(i)
                res.compose.push(componentData[i])
            }
        }
        // 根据选中的组件来调整选中框
        let rangeTop1 = 0, rangeLeft1 = 0, rangeTop2 = 0, rangeLeft2 = 0;
        res.compose.forEach((val, index) => {
            let { top, left, width, height } = val.style
            if (!index) {
                rangeTop1 = top
                rangeLeft1 = left
                rangeTop2 = top + height
                rangeLeft2 = left + width
            } else {
                rangeTop1 = rangeTop1 > top ? top : rangeTop1;
                rangeTop2 = rangeTop2 > top + height ? rangeTop2 : top + height;
                rangeLeft1 = rangeLeft1 > left ? left : rangeLeft1;
                rangeLeft2 = rangeLeft2 > left + width ? rangeLeft2 : left + width;
            }
        })
        setRange({ top: rangeTop1, left: rangeLeft1, width: rangeLeft2 - rangeLeft1, height: rangeTop2 - rangeTop1 })
        setMakeUpProps(res)
        // console.log(maxX, minX, maxY, minY)
        console.log(res)
    }, 100)

    // 选中框
    const rangeCheck = (x1, y1, x2, y2) => {
        let maxX = x1 > x2 ? x1 : x2
        let minX = x1 < x2 ? x1 : x2
        let maxY = y1 > y2 ? y1 : y2
        let minY = y1 < y2 ? y1 : y2
        let res = { compose: [], indexs: [] }
        debounceRange({ maxX, minX, maxY, minY, res })
    }

    // 拆分
    const breakUp = () => {
        if (selectComponent.componentId === "compose") {
            console.log("breakUp", selectComponentIndex)
            let res = []
            let flagSelectComponent = { ...selectComponent } // 选中组件
            let { top, left, width, height } = flagSelectComponent.style // 选中样式
            const calculation = (res, parentParam, flag = 0) => { // 计算拆分后的组件的{ top, left, width, height }
                if (flag) return parseInt((((parseFloat(res.replace("%", "")) / 100) * flag) + parentParam).toFixed(0))
                return parseInt(((parseFloat(res.replace("%", "")) / 100) * parentParam).toFixed(0))
            }
            // 查询组合内部的组件进行拆分操作
            flagSelectComponent.propValue.compose.forEach((item) => {
                let { top: itop, left: ileft, width: iwidth, height: iheight } = item.style
                item.style = { ...item.style, top: calculation(itop, top, height), left: calculation(ileft, left, width), width: calculation(iwidth, width), height: calculation(iheight, height) }
                // console.log("breakUp", calculation(itop, top, height), calculation(ileft, left, width), calculation(iwidth, width), calculation(iheight, height))
                // 把修改后的值赋给res
                res.push(item)
            })
            // selectComponentIndex存在问题，让删除的不是选中组合组件 （后续处理）
            // 查找 选中的组合组件的id并将组件删除
            // for (let i = 0; i < componentData.length; i++) {
            //     if (componentData[i].id === flagSelectComponent.id) {
            //         delSelect(i)
            //         break;
            //     }
            // }
            delSelect()
            // res将拆分好的组件新增
            res.forEach((item) => {
                myAuth.increment({ ...item, id: "component" + getID() })
            })
        }
    }

    const makeUp = () => {
        if (makeUpProps.compose.length > 1) {
            // 先把组合的组件删除再生产组合组件
            let newComponentData = [...myAuth.state.componentData]
            makeUpProps.indexs.forEach((val) => {
                newComponentData.splice(val, 1)
            })
            let componentItem = registerComponentMomo.get("compose")
            componentItem.style = range
            componentItem.propValue = getNewComposeProps(range, makeUpProps)
            myAuth.updataComponentData([...newComponentData, { ...componentItem, id: "component" + getID() }])
            console.log("makeUp", myAuth.state.componentData)
            // let componentItem = componentList[5]
            // componentItem.style = range
            // componentItem.propValue = getNewComposeProps(range, makeUpProps)
            // console.log("makeUp", { ...myAuth })
            // myAuth.increment({ ...componentItem, id: "component" + getID() })
            // 组合后清楚选中框中的数据
            setMakeUpProps({ compose: [], indexs: [] })
        }
        setRange({ top: 0, left: 0, width: 0, height: 0 })
        // console.log("makeUp", { ...componentItem, id: "component" + getID() })
    }

    // 计算组合后组件的样式百分比（top, left, width, height）
    const getNewComposeProps = (style, props) => {
        let { top, left, width, height } = style
        props.compose = props.compose.map((item) => {
            let { top: ist, left: isl, width: isw, height: ish } = item.style
            ist = (((ist - top) / height) * 100) + "%"
            isl = (((isl - left) / width) * 100) + "%"
            ish = ((ish / height) * 100) + "%"
            isw = ((isw / width) * 100) + "%"
            item.style = { ...item.style, top: ist, left: isl, width: isw, height: ish }
            return item
        })
        return props
    }

    const delSelect = () => {  //删除选中组件 
        if (selectComponentIndex !== -1) {
            myAuth.changeSelect()
            let newComponentData = [...myAuth.state.componentData]
            newComponentData.splice(selectComponentIndex, 1)
            myAuth.updataComponentData(newComponentData)
        }
    }

    // let guideList = [  //辅助线(absolute定位的辅助线)
    //     { guideName: "guideT", style: { top: mainInsideData.top, left: 0 } },
    //     { guideName: "guideB", style: { top: mainInsideData.top + mainInsideData.height, left: 0 } },
    //     { guideName: "guideL", style: { top: 0, left: mainInsideData.left } },
    //     { guideName: "guideR", style: { top: 0, left: mainInsideData.left + mainInsideData.width } },
    // ]


    return (
        <div className="moving-box" >
            <div className="moving-box-top">
                <Button type="primary" onClick={breakUp}>
                    拆分
                </Button>
                <Button type="primary" onClick={makeUp}>
                    组合
                </Button>
                <Button onClick={delSelect} type="primary" icon={<DeleteOutlined />}></Button>
            </div>
            {mode == "edit" && <div className="moving-box-left" onDragStart={myDragstart}>
                {registerComponentMomo && [...registerComponentMomo.values()].filter(item => item.isShow).map((item, index) => {
                    return <div className="moving-box-left-item" draggable data-index={item.componentId} key={index}>
                        <AppstoreOutlined />
                        <span style={{ marginLeft: "10px" }}>{item.label}</span>
                    </div>
                })}
            </div>}
            <div className="moving-box-right" ref={movingBox} onDrop={useMyDrop} onDragOver={myDragOver} onMouseDown={myMouseDown} >
                <div className="range" style={addPxSuffix({ ...range })}></div>
                {mode == "edit" && <Grid />}
                {myAuth.state.componentData.map((item, index) => {
                    return (<Control myAuth={myAuth}
                        mode={mode}
                        // setMainInsideData={setMainInsideDataFun}
                        setComponentData={setComponentData}
                        element={item} index={index} activeComponent={myAuth.state.selectComponent.id === item.id} key={item.id}>
                        {item.component(item.propValue)}
                    </Control>)
                })}
                {/* 辅助线 */}
                {/* {guideList.map((val) => {
                    return (<div key={val.guideName} className={`guide ${val.guideName} ${myAuth.state.selectComponentIndex !== -1 ? 'active' : ''}`}
                        style={addPxSuffix(val.style)}></div>)
                })} */}
            </div>

        </div >
    )
}

export default MovingBox


const useAuth = () => {
    const initialState = {
        componentData: [], selectComponent: {}, selectComponentIndex: -1
    };
    const reducer = (prevState, action) => {
        let { data, index } = action
        switch (action.type) {
            case 'increment':
                return { ...prevState, componentData: [...prevState.componentData, data] };
            case 'updata-component-data':
                return { ...prevState, componentData: data };
            case 'change-select':
                return { ...prevState, selectComponent: data, selectComponentIndex: index };
            case 'updata-select-component':
                return { ...prevState, selectComponent: data };
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const increment = (data) => {
        dispatch({ type: 'increment', data: data })
        dispatch({ type: 'change-select', data: data, index: state.componentData.length })
    }
    const changeSelect = (data = {}, index = -1) => {
        dispatch({ type: 'change-select', data: data, index: index })
    }
    const updataComponentData = (data) => {
        dispatch({ type: 'updata-component-data', data: data })
    }
    const updataSelectComponent = (data) => {
        dispatch({ type: 'updata-select-component', data: data })
    }
    return {
        state, increment, changeSelect, updataComponentData, updataSelectComponent
    }
}

//  网格线
const Grid = () => {
    return (
        <svg
            className="grid"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="smallGrid"
                    width="7.236328125"
                    height="7.236328125"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 7.236328125 0 L 0 0 0 7.236328125"
                        fill="none"
                        stroke="rgba(207, 207, 207, 0.3)"
                    // stroke-width="1"
                    >
                    </path>
                </pattern>
                <pattern
                    id="grid"
                    width="36.181640625"
                    height="36.181640625"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)"></rect>
                    <path
                        d="M 36.181640625 0 L 0 0 0 36.181640625"
                        fill="none"
                        stroke="rgba(186, 186, 186, 0.5)"
                    // stroke-width="1"
                    >
                    </path>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
    )
}

