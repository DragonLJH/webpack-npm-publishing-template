import "./index.scss"
import React, { useState, useEffect, useRef, useReducer, createContext } from "react"
import { addPxSuffix, debounce } from "../../../utils/index.js"


const MovingBoxControl = (props) => {
    const { children, activeComponent, element, index, setComponentData, setMainInsideData, myAuth, mode } = props;


    const [insideData, setInsideData] = useState({ top: 0, left: 0, width: 0, height: 0 }) //拖拽实时
    useEffect(() => {
        element && setInsideData(element.style)
    }, [element])  // 监听element的修改（同步由表单控件修改的数据）

    const circleWc = 3  //circle宽高6px ，误差3px
    let moveList = [  //8个点控制组件大小
        "t", "r", "b", "l", "lt", "rt", "rb", "lb"
    ]

    const debounceSetComponentData = debounce(setComponentData, 100)

    const relocation = (e, name = "acquiesce") => {  // name（默认值：acquiesce（默许））不传值默认为整体移动
        if (mode == "play") return
        myAuth.changeSelect(element, index)  //点击改变选中对象
        e.stopPropagation();
        e.preventDefault();

        const switchSet = (x, y) => { // 根据 name 节点（8个控制节点）控制组件的大小 （宽高）（放大缩小）
            let { top, left, width, height } = insideData
            if (name.indexOf("t") !== -1) {
                top += y
                height -= y
            }
            if (name.indexOf("b") !== -1) {
                height += y
            }
            if (name.indexOf("r") !== -1) {
                width += x
            }
            if (name.indexOf("l") !== -1) {
                left += x
                width -= x
            }
            if (name === "acquiesce") {
                top += y
                left += x
            }
            if (width > 10 && height > 10 && top > 0 && left > 0) {  //当宽度高度小于10的时候停止缩小,当 x y 坐标小于0时停止移动
                let newStyle = { top, left, width, height }

                if (myAuth.state.componentData.length <= 1) {  //只存在一个组件的时候调用
                    setInsideData({ ...insideData, ...newStyle })
                    setMainInsideData && setMainInsideData({ ...newStyle })
                    // 防抖
                    debounceSetComponentData({ ...element, style: { ...insideData, ...newStyle } }, index)
                    // 
                } else {    //多个组件的时候调用
                    adsorbGuide({ ...newStyle })
                }
            }
        }

        //吸附功能
        const adsorbGuide = (data) => {
            let ADSORB_SPACING = 5 //吸附界限
            let { top: stop, left: sleft, width: swidth, height: sheight } = data;
            let { id: sid } = myAuth.state.selectComponent;
            if (myAuth.state.componentData.length > 1) {
                for (let i = 0; i < myAuth.state.componentData.length; i++) {  // 对比
                    if (myAuth.state.componentData[i].id !== sid) {
                        let { top, left, width, height } = myAuth.state.componentData[i].style
                        // 吸附
                        if (Math.abs((stop + sheight) - top) < ADSORB_SPACING) {
                            stop = top - sheight
                        }
                        if (Math.abs((sleft + swidth) - left) < ADSORB_SPACING) {
                            sleft = left - swidth
                        }
                        if (Math.abs(stop - top) < ADSORB_SPACING) {
                            stop = top
                        }
                        if (Math.abs(sleft - left) < ADSORB_SPACING) {
                            sleft = left
                        }
                        if (Math.abs(stop - (top + height)) < ADSORB_SPACING) {
                            stop = top + height
                        }
                        if (Math.abs(sleft - (left + width)) < ADSORB_SPACING) {
                            sleft = left + width
                        }
                        if (Math.abs((stop + sheight) - (top + height)) < ADSORB_SPACING) {
                            stop = top + height - sheight
                        }
                        if (Math.abs((sleft + swidth) - (left + width)) < ADSORB_SPACING) {
                            sleft = left + width - swidth
                        }
                        let newStyle = { top: stop, left: sleft, width: swidth, height: sheight }
                        setInsideData({ ...insideData, ...newStyle })
                        setMainInsideData && setMainInsideData({ ...newStyle })
                        // 防抖
                        debounceSetComponentData({ ...element, style: { ...insideData, ...newStyle } }, index)
                    }
                }
            }


        }


        // 解构赋值 给 InitialValueX 和 InitialValueY 分别赋值 clientX 和 clientY
        // 初始坐标
        let { clientX: InitialValueX, clientY: InitialValueY } = e
        const move = (moveEvent) => {
            // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
            // 移动后的坐标
            let { clientX: moveX, clientY: moveY } = moveEvent
            switchSet(moveX - InitialValueX, moveY - InitialValueY)
            // console.log(myAuth.state)
            // adsorbGuide()
        }

        const up = (e) => {  // 鼠标松开结束事件的监听
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        };

        // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }
    return (
        <div className={"moving-box-control"} style={{ ...addPxSuffix(insideData), "--circle-wc": circleWc + "px" }} onMouseDown={relocation}>
            <div className={`moveComponent ${activeComponent ? 'active' : ''}`} >
                {children}
                {moveList.map((circleName) => {
                    return <div key={circleName} className={`circle ${circleName}`} onMouseDown={(e) => relocation(e, circleName)} ></div>
                })}
                {/* {guideList.map((val) => {
                    return <div key={val.guideName} className={`guide ${val.guideName}`} style={addPxSuffix(val.style)}></div>
                })} */}
            </div>
        </div>
    )
}


export default MovingBoxControl 