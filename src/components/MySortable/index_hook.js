import "./index.scss"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { debounce } from "../../utils/index"

const MySortable = (props) => {
    const { children, list, delay, leftList, leftChildren, rightList, rightChildren, callbackData } = props
    // console.log('MySortable', children, list, changeList, delay, leftList, leftChildren, changeLeftList, rightList, rightChildren, changeRightList)
    const [data, setData] = useState({
        list: list,
        leftList: leftList,
        rightList: rightList
    })

    const [ckey, setCkey] = useState(null)

    useEffect(() => {
        callbackData(data)
    }, [data])


    const executeFn = () => {
        const updateAll = (left, right) => {
            setData({
                ...data,
                leftList: left,
                rightList: right
            })
        }
        return {
            left: (start, end) => {
                let flag = leftList.splice(start, 1)[0]
                flag && rightList.splice(end, 0, flag)
                updateAll(leftList, rightList)
            },
            right: (start, end) => {
                let flag = rightList.splice(start, 1)[0]
                flag && leftList.splice(end, 0, flag)
                updateAll(leftList, rightList)
            }
        }

    }

    const drop = useCallback((ev, flag) => {
        ev.preventDefault();
        let type = ev.dataTransfer.getData("type");
        let key = ev.dataTransfer.getData("key");
        let end = ev.currentTarget.dataset.id
        type && flag != type && executeFn()[type](key, end)

        console.log('drop', ckey)
    }, [ckey])


    const dropOver = (ev) => {
        ev.preventDefault();
    }

    const changeCKey = (key) => {
        console.log("changeCKey", key)
        setCkey(key)
    }


    return (<>
        <div className="my-sortable"
        // onDrop={(e) => drop(e)} onDragOver={(e) => dropOver(e)}
        >
            {leftChildren && <div className="my-sortable-left"
                onDrop={(e) => drop(e, "left")} onDragOver={(e) => dropOver(e)}
            >
                <ChildrenSortable list={data.leftList} changeList={(list) => {
                    setData({ ...data, leftList: list })
                }} delay={delay} type="left" setCkey={changeCKey}>
                    {leftChildren()}
                </ChildrenSortable>
            </div>}
            {rightChildren && <div className="my-sortable-right"
                onDrop={(e) => drop(e, "right")} onDragOver={(e) => dropOver(e)}
            >
                <ChildrenSortable list={data.rightList} changeList={(list) => {
                    setData({ ...data, rightList: list })
                }} delay={delay} type="right" setCkey={changeCKey}>
                    {rightChildren()}
                </ChildrenSortable>
            </div>}
            {children && <ChildrenSortable list={list} changeList={(list) => {
                setData({ ...data, list: list })
            }} delay={delay}>
                {children}
            </ChildrenSortable>}
        </div>
    </>)
}

export default MySortable


const ChildrenSortable = (props) => {
    const { children, list, changeList, delay, type, setCkey } = props
    const [key, setKey] = useState(null)
    const updateList = (list, start, end) => {
        let flag = list.splice(start, 1)[0]
        flag && list.splice(end, 0, flag)
        changeList(list)
    }
    // 防抖实现拖拽延迟
    const debounceUpdateList = debounce(updateList, delay || 1000)

    const drag = (ev, key) => {
        setKey(key)
        ev.dataTransfer.setData("key", key);
        type && ev.dataTransfer.setData("type", type);
    }
    const allowDrop = (ev) => {
        ev.preventDefault();
        if (key == null) return
        let end = ev.currentTarget.dataset.id
        setKey(end)
        debounceUpdateList(list, key, end)
        console.log(key, end)
    }
    const drop = (ev, key) => {
        ev.preventDefault();
        setCkey(key)
    }
    return (
        <>
            {children && React.Children.map(children, (child) => {
                // console.log(child)
                return React.cloneElement(child, {
                    className: `${child.props.className} ${child.key == key ? "my-sortable-active" : ""}`,
                    "data-id": child.key,
                    draggable: true,
                    onDrop: (e) => drop(e, child.key),
                    onDragOver: (e) => allowDrop(e),
                    onDragStart: (e) => drag(e, child.key)
                });
            })}
        </>
    )
}