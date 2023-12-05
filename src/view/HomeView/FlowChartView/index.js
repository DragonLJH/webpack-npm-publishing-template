import "./index.scss"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Svg, { SvgProvide } from "./utils"

const FlowChartView = () => {
    const flowJson = {
        "flowId": "123456789",     // 流程ID
        "title": "流程审核",        // 流程标题
        "description": "请审核流程内容", // 流程描述
        "steps": [
            {
                "stepId": 1,                   // 步骤ID
                "stepName": "填写申请表单",     // 步骤名称
                "requiredFields": [            // 必填字段
                    "name",
                    "email",
                    "department"
                ],
                "optionalFields": [            // 可选字段
                    "phone",
                    "comments"
                ]
            },
            {
                "stepId": 2,
                "stepName": "审核领导审批",
                "assignees": [
                    {
                        "userId": "123",
                        "name": "张三"
                    },
                    {
                        "userId": "456",
                        "name": "李四"
                    }
                ],
                "requiredApprovals": 2          // 需要的审批数量
            },
            {
                "stepId": 3,
                "stepName": "最终审批",
                "assignees": [
                    {
                        "userId": "789",
                        "name": "王五"
                    }
                ]
            }
        ]
    }

    return <div className="flow-chart-view">
        <FlowSetUp></FlowSetUp>
        <div className="view"></div>
    </div>
}

export default FlowChartView

const FlowSetUp = () => {
    const operate = [
        {
            name: "g",
            label: "组合g",
            width: 500, height: 300,
            scale: 2,
            svg: [
                { id: "a1", custom: { connect: [{ id: "a2" }, { id: "a3" }], active: 0, }, tag: "circle", stroke: "#000", strokeWidth: "5", cx: 25, cy: 50, r: 20, fill: "#fff", fillOpacity: "0.9" },
                { id: "a2", custom: { connect: [{ id: "a4" }], active: 0, }, tag: "rect", stroke: "#000", strokeWidth: "5", x: 300, y: 20, width: 80, height: 40, fill: "#fff", fillOpacity: "0.9" },
                { id: "a3", custom: { connect: [{ id: "a4" }], active: 0, }, tag: "rect", stroke: "#000", strokeWidth: "5", x: 100, y: 150, width: 80, height: 40, fill: "#fff", fillOpacity: "0.9" },
                { id: "a4", custom: { connect: [{ id: "a5", className: "red" }], active: 0, }, tag: "rect", stroke: "#000", strokeWidth: "5", x: 100, y: 150, width: 80, height: 40, fill: "#fff", fillOpacity: "0.9" },
                { id: "a5", custom: { connect: [], active: 0, }, tag: "circle", stroke: "#000", strokeWidth: "5", cx: 300, cy: 50, r: 20, fill: "#fff", fillOpacity: "0.9" },

            ]
        },
        {
            name: "g",
            label: "组合g",
            width: 500, height: 300,
            scale: 2,
            svg: [
                {
                    custom: {
                        connect: [],
                        connector: true, childrenData: [
                            { custom: { active: 0, }, tag: "circle", cx: 25, cy: 50, r: 20, fill: "#fff", fillOpacity: "0.9" },
                            { custom: { active: 0, }, tag: "rect", x: 300, y: 20, width: 80, height: 40, fill: "#fff", fillOpacity: "0.9", stroke: "#000" },
                            { custom: { active: 0, }, tag: "rect", x: 100, y: 150, width: 80, height: 40, fill: "#fff", fillOpacity: "0.9", stroke: "#000" },
                            { custom: { active: 0, }, tag: "rect", x: 100, y: 150, width: 80, height: 40, fill: "#fff", fillOpacity: "0.9", stroke: "#000" },
                            { custom: { active: 0, }, tag: "circle", cx: 300, cy: 50, r: 20, fill: "#fff", fillOpacity: "0.9" },
                        ]
                    }, tag: "g", stroke: "#000", fill: "transparent", strokeWidth: "5", id: "a1",
                }
            ]
        }
    ]

    const [operateState, setOperateState] = useState(operate)

    const changeOperateState = (data, index) => {
        setOperateState(operateState.map((item, i) => {
            return i == index ? data : item
        }))
    }

    



    return (<div className="flow-set-up">
        <div className="flow-set-up-top"></div>
        <div className="flow-set-up-main">
            <div className="flow-set-up-main-left">
            </div>
            <div className="flow-set-up-main-canvas">
                {operate.map((item, index) => {
                    return <CreateSvg key={index} {...item} changeOperateState={(data) => changeOperateState({ ...item, svg: data }, index)} />
                })}

            </div>
            <div className="flow-set-up-main-right"></div>
        </div>
    </div >)
}

const CreateSvg = (props) => {
    const { name, label, svg, width, height, scale, index, changeOperateState } = props
    return <div className={name} title={label} >
        <SvgProvide {...{ name, label, svg, width, height, scale }} changeOperateState={changeOperateState}> </SvgProvide>
    </div>
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