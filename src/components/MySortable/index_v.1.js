import "./index.scss"
import React, { useRef } from "react"
import { debounce } from "../../utils/index"



const MySortable = (props) => {
    const { children, list, changeList, onClick } = props

    const timer = useRef(null)

    const updateList = (list, start, end) => {
        console.log('updateList', start, end)
        let flag = list.splice(start, 1)[0]
        list.splice(end, 0, flag)
        changeList(list)
    }
    const debounceUpdateList = debounce(updateList, 100)


    console.log("MySortable", changeList)
    const drag = (ev) => {
        ev.dataTransfer.setData("key", ev.currentTarget.dataset.id);

    }
    const drop = (ev) => {
        ev.preventDefault();
        var key = ev.dataTransfer.getData("key");
        let end = ev.currentTarget.dataset.id
        // updateList(list, key, end)
    }
    const allowDrop = (ev) => {
        ev.preventDefault();
        var key = ev.dataTransfer.getData("key");
        let end = ev.currentTarget.dataset.id
        ev.dataTransfer.setData("key", end);
        // debounceUpdateList(list, key, end)
        // updateList(list, key, end)

        console.log("allowDrop", debounceUpdateList(list, key, end))
    }

    return (<>
        <div className="my-sortable"
        //  onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}
        >
            {children && React.Children.map(children, (child) => {
                // console.log("MySortable-ReactChildren", child)
                return React.cloneElement(child, {
                    "data-id": child.key,
                    draggable: true,
                    onDrop: (e) => drop(e),
                    onDragOver: (e) => allowDrop(e),
                    onDragStart: (e) => drag(e)
                });
            })}
        </div>
    </>)
}

export default MySortable