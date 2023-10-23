import "./index.scss"
import React, { useEffect, useState, memo, useCallback } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { arrayToMap } from "../../utils/index"
const TimeTable = (props) => {
    const { children, data, days, section, mergeKey, defaultWeek, selected, mode, randerItem } = props
    console.log("randerItem", randerItem)

    const daysList = ["一", "二", "三", "四", "五", "六", "日"].slice(0, days || 7)
    const [week, setWeek] = useState(defaultWeek || 1)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [target, setTarget] = useState({
        days: null, section: null
    });

    useEffect(() => {
        if (target.days && target.section) {
            selected({ ...target, week })
            setTarget({
                days: null, section: null
            })
        }
    }, [target.days, target.section])


    const getMode = () => {
        return mode || "play"
    }

    const merge = useCallback((target = "courseId") => {
        // 生成默认表格
        let table = new Array(section || 10).fill(null).map((_, i) => {
            return new Array(days || 7 + 1).fill(null).map((__, j) => {
                return {
                    rowspan: 1
                }
            })
        })


        let mergeList = []
        let courseMap = data && arrayToMap(
            data.filter(item => item.weekly == week).map(item => {
                item["rowspan"] = 1
                return item
            }), (item) => [item[target], item])

        // 将符合合并的 数组 push 到 mergeList 中
        courseMap && courseMap.forEach(item => {
            if (item.length > 1) {
                let daysMap = arrayToMap(item, (item) => [item["days"], item])
                daysMap.forEach(value => {
                    if (value.length > 1) {
                        mergeList.push(value)
                    }
                })
            }
        })

        // 根据 mergeKey 判断是否合并
        mergeKey && mergeList.forEach(item => {
            // 数据合并算法
            // sort排序 对象数组 根据 节次 从大到小排序
            // reduce判断 数组相邻两个元素之间的 节次差的绝对值是否等于1
            // 相等：前一个对象的rowspan等于0，后一个对象的rowspan等于前一个对象的rowspan加上本身的rowspan
            item.sort((a, b) => {
                return b.section - a.section
            }).reduce((a, b) => {
                if (Math.abs(a.section - b.section) == 1) {
                    b.rowspan += a.rowspan
                    a.rowspan = 0
                }
                return b
            })

            // 根据 完成后的数据更新默认表格
            item.forEach((value) => {
                table[value.section - 1][value.days].rowspan = value.rowspan
            })
        })
        return table
    }, [data])



    // 根据 天次_节次_周次 缓存 对象
    const dataMap = new Map()
    data && data.forEach(item => {
        const { days, section, weekly } = item
        dataMap.set(`${days}_${section}_${weekly}`, item)
    })
    const getMsg = (days, section) => {
        return dataMap.get(`${days}_${section}_${week}`)
    }
    const hasMsg = (days, section) => {
        return dataMap.has(`${days}_${section}_${week}`)
    }

    const getDay = () => {
        // 获取当天 天次
        let nowDay = new Date().getDay()
        // 周日天次为0 ，换回 7
        nowDay = nowDay ? nowDay : 7
        return nowDay
    }


    const getDate = (index, fmt = "MM-dd") => {
        // 根据 下标 推断 天次
        // 一天 == 60 * 60 * 24 * 1000
        let nowDay = (index - getDay()) * 60 * 60 * 24 * 1000
        // 判断是否为当前周
        nowDay = nowDay + 60 * 60 * 24 * 1000 * (week - (defaultWeek || 1)) * 7
        return new Date(new Date().getTime() + nowDay).format(fmt)
    }

    const getState = (tc) => {
        let day = getDay()
        let res = tc >= day ? (tc == day ? "now" : "before") : "after"
        let aWeek = (week - (defaultWeek || 1))
        if (aWeek > 0) res = "before"
        if (aWeek < 0) res = "after"
        return res
    }


    return (
        <>
            <div className={"time-table " + getMode()}>
                <div className="time-table-top">
                    <div className="time-table-top-left" onClick={() => setWeek(week > 1 ? week - 1 : week)}><LeftOutlined /></div>
                    <div className="time-table-top-main">
                        <div>第{week}周</div>
                        <div>{getDate(1)}/{getDate(7)}</div>
                    </div>
                    <div className="time-table-top-right" onClick={() => setWeek(week < 20 ? week + 1 : week)}><RightOutlined /></div>
                </div>
                <div className="time-table-main">
                    <table className="time-table-main-table">
                        <thead>
                            <tr>
                                <th></th>
                                {daysList.map((item, index) => {
                                    return <th className={`${getState(index + 1)}`} key={index}>
                                        <div>{item}</div>
                                        <div>{getDate(index + 1)}</div>
                                    </th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {merge(mergeKey).map((_, i) => {
                                return <tr key={i}>
                                    {_.map((item, j) => {
                                        return <td className={`${j == 0 ? '' : getState(j) + "-bg"}`} key={j} rowSpan={item.rowspan} style={item.rowspan ? {} : { display: "none" }}>
                                            {/* {
                                                j == 0 ? i + 1 :
                                                    children &&
                                                    <div className={(j == 0 ? '' : getState(j)) + (hasMsg(j, i + 1) ? " exist" : " absent")}
                                                        // 解决 元素未能占满整个td的问题
                                                        style={{ "--row-span": item.rowspan ? item.rowspan : 1 }}
                                                        onClick={() => {
                                                            setTarget({ days: j, section: i + 1 })
                                                            setIsModalOpen(true)
                                                        }}
                                                    >
                                                        <ChildrenComponent item={getMsg(j, i + 1)}>{children}</ChildrenComponent>
                                                    </div>
                                            } */}
                                            {j == 0 ? i + 1 : < div className={(j == 0 ? '' : getState(j)) + (hasMsg(j, i + 1) ? " exist" : " absent")}
                                                // 解决 元素未能占满整个td的问题
                                                style={{ "--row-span": item.rowspan ? item.rowspan : 1 }}
                                                onClick={() => {
                                                    setTarget({ days: j, section: i + 1 })
                                                }}
                                            >
                                                {randerItem(getMsg(j, i + 1))}
                                            </div>
                                            }
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}

export default TimeTable

// 自定义模板
const ChildrenComponent = memo((props) => {
    const { children, item } = props
    return React.Children.map(children, (child, index) => {
        const { children, slot } = child.props
        return React.cloneElement(child, {}, [
            children && <ChildrenComponent key={index} item={item}>{children}</ChildrenComponent>,
            item && slot && item[slot]
        ])
    })
})