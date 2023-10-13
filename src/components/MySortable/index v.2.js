import "./index.scss"
import React, { useRef, useState } from "react"
import { debounce } from "../../utils/index"



const MySortable = (props) => {
    const { children, list, changeList, delay, } = props
    const [key, setKey] = useState(null)

    const updateList = (list, start, end) => {
        let flag = list.splice(start, 1)[0]
        flag && list.splice(end, 0, flag)
        changeList(list)
    }
    // 防抖实现拖拽延迟
    const debounceUpdateList = debounce(updateList, delay || 1000)
    const test = () => (console.log("test"))
    // 设置
    const drag = (ev, key) => {
        setKey(key)
        ev.dataTransfer.setData("key", key);
    }

    const drop = (ev) => {
        ev.preventDefault();
        let key = ev.dataTransfer.getData("key");
        let end = ev.currentTarget.dataset.id
        console.log('drop', ev.currentTarget, key, end)
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
        let end = ev.currentTarget.dataset.id
        setKey(end)
        debounceUpdateList(list, key, end)
    }

    const dropOver = (ev) => {
        ev.preventDefault();
    }

    return (<>
        <div className="my-sortable"
            onDrop={(e) => drop(e)} onDragOver={(e) => dropOver(e)}
        >
            {children && React.Children.map(children, (child) => {
                // console.log(child)
                return React.cloneElement(child, {
                    className: `${child.props.className} ${child.key == key ? "my-sortable-active" : ""}`,
                    "data-id": child.key,
                    draggable: true,
                    onDragOver: (e) => allowDrop(e),
                    onDragStart: (e) => drag(e, child.key)
                });
            })}
        </div>
    </>)
}

export default MySortable