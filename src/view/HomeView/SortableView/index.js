import "./index.scss"
import React, { useEffect, useState } from 'react';
import MySortable from "../../../components/MySortable/index"

const SortableView = () => {
    let _list = new Array(10).fill(null).map((_, index) => {
        return {
            name: "name" + (index + 1),
            index: index + 1
        }
    })
    let _list2 = new Array(10).fill(null).map((_, index) => {
        return {
            name: "name" + (index + 1 + 10),
            index: index + 1 + 10
        }
    })
    const [data, setData] = useState({ list: _list })
    const [data2, setData2] = useState({ list: _list2 })
    const changeList = (list) => {
        setData({ ...data, list: list })
    }
    const changeList2 = (list) => {
        setData2({ ...data2, list: list })
    }

    const callbackData = ({ list, leftList, rightList }) => {
        setData({ ...data, list: leftList })
        setData2({ ...data2, list: rightList })
    }


    return (
        <>


            {/* <div className="sortable-view">
                <MySortable list={data.list} changeList={changeList} delay={100} onClick={(key) => { console.log("123", key) }}>
                    {data.list.map((item, index) => {
                        return <div className="sortable-view-div" key={index}>{item.name}</div>
                    })}
                </MySortable>
            </div>
            <div className="sortable-view">
                <MySortable list={data2.list} changeList={changeList2} delay={100} onClick={(key) => { console.log("123", key) }}>
                    {data2.list.map((item, index) => {
                        return <div className="sortable-view-div" key={index}>{item.name}</div>
                    })}
                </MySortable>
            </div> */}
            <div className="sortable-view">
                <MySortable delay={1000}
                    leftList={data.list}
                    leftChildren={() => {
                        return data.list.map((item, index) => {
                            return <div className="sortable-view-div" key={index}>{item.name}</div>
                        })
                    }}
                    rightList={data2.list}
                    rightChildren={() => {
                        return data2.list.map((item, index) => {
                            return <div className="sortable-view-div" key={index}>{item.name}</div>
                        })
                    }}
                    callbackData={callbackData}
                >
                </MySortable>
                <button onClick={() => { console.log("data,", data, data2) }}>123</button>
            </div>
        </>
    )
}

export default SortableView