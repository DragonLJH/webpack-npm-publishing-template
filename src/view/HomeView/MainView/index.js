import "./index.scss"
import React, { useEffect, useMemo, useState } from 'react';
import { Switch } from 'antd';
import MovingBox from "../../../components/MovingBox/index"
import TimeTableView from "../TimeTableView/index"
import { debounce } from "../../../utils/index"

const MainView = () => {
    const [mode, setMode] = useState(true)

    const [registerComponent, setRegisterComponent] = useState({
        "text": {
            component: (data) => {
                return <div className="resume-text" > {data.text} </div>
            },
            label: "文本",
            propValue: {
                text: "内容",
                icon: ""
            },
            style: {
                top: 0,
                left: 0,
                width: 80,
                height: 30,
                fontSize: 14,
                fontWeight: 100,
                backgroundColor: "#fff",
                textAlign: 'center',
                color: "rgba(0,0,0,1)",
                borderBottom: "solid 1px #ccc"
            },
            isShow: true
        },
        "TimeTableView": {
            component: (data) => {
                return <TimeTableView />
            },
            label: "课程表",
            propValue: {
            },
            style: {
                top: 0,
                left: 0,
                width: 80,
                height: 30
            },
            isShow: true
        }
    })
    useEffect(() => {
        setRegisterComponent({
            ...registerComponent,
            "card": {
                component: (data) => {
                    return <div className="card" >
                        <div className="card-top">卡片</div>
                        <div className="card-main">{data.text}</div>
                    </div>
                },
                label: "卡片",
                propValue: {
                    text: "卡片",
                    icon: ""
                },
                style: {
                    top: 0,
                    left: 0,
                    width: 80,
                    height: 30
                },
                isShow: true
            }
        })
    }, [])





    return (
        <>
            <div className="main-view" >
                <div style={{ height: "50px" }}><Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={mode} onClick={() => { setMode(!mode) }} /></div>
                <div style={{ height: "calc(100% - 50px)" }}><MovingBox mode={mode ? "edit" : "play"} registerComponent={registerComponent}></MovingBox></div>
            </div>
        </>
    )
}

export default MainView
