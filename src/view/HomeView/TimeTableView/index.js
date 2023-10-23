import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import TimeTable from "../../../components/TimeTable/index"
import ViewModifications from "../../../components/ViewModifications/index"

import { randomNum, arrayToMap } from "../../../utils/index"

const TimeTableView = () => {
    const [mode, setMode] = useState("play")
    const [tableData, setTableData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewModificationsData, setViewModificationsData] = useState(null);
    const list = []

    const tableMap = useMemo(() => {
        return arrayToMap(tableData, (item, index) => [`${item.days}_${item.section}_${item.weekly}`, index])
    }, [tableData && tableData.length])

    const getZJW = () => {
        let days = randomNum(7)
        let section = randomNum(10)
        let weekly = randomNum(20)
        if (list.includes(`${days}_${section}_${weekly}`)) {
            const { days, section, weekly } = getZJW()
            return { days, section, weekly }
        } else {
            list.push(`${days}_${section}_${weekly}`)
        }
        return { days, section, weekly }
    }

    useEffect(() => {
        setTableData(
            new Array(200).fill(null).map((_, index) => {
                const { days, section, weekly } = getZJW()
                return getTableItem(
                    days, section, weekly,
                    (randomNum(9) + 1) + "",
                    "courseName_" + days + "_" + section,
                    "teacher_" + days + "_" + section,
                    "site_" + days + "_" + section
                )
            }))
    }, [])

    const getTableItem = (days, section, weekly, courseId, courseName, teacher, site) => {
        return { days, section, weekly, courseId, courseName, teacher, site }
    }

    const getViewModificationsData = ({ days, section, week }) => {
        if (tableMap.has(`${days}_${section}_${week}`)) {
            let index = tableMap.get(`${days}_${section}_${week}`)
            setViewModificationsData({ data: tableData[index], index })
        } else {
            let index = tableData.length
            setViewModificationsData({ data: getTableItem(days, section, week), index })
        }
    }

    const returnSubmit = ({ data, index }) => {
        let newData = tableData
        newData[index] = data
        setIsModalOpen(false)
        setTableData(newData)
        console.log("returnSubmit", newData[index])
    }

    const modalProps = {
        title: "课程详情",
        open: isModalOpen,
        onOk: () => {
            setIsModalOpen(false)
        },
        onCancel: () => {
            setIsModalOpen(false)
        },
        footer: null
    }


    const selected = (props) => {
        const { days, section, week } = props
        if (days && section && week) {
            setIsModalOpen(true)
            getViewModificationsData({ days, section, week })
        }
    }

    return (
        <>
            <div className="time-table-view">
                <Modal {...modalProps}>
                    {viewModificationsData && <ViewModifications data={viewModificationsData.data} index={viewModificationsData.index} mode={mode} returnSubmit={returnSubmit}></ViewModifications>}
                </Modal>
                <TimeTable data={tableData} mergeKey="courseId" defaultWeek={6} selected={selected} mode={mode}
                    randerItem={(params) => {
                        return (<>
                            <div slot="courseId" >{params && params.courseId}</div>
                            <div slot="courseName" >{params && params.courseName}</div>
                            <div slot="teacher" >{params && params.teacher}</div>
                            <div slot="site" >{params && params.site}</div>
                        </>)
                    }}
                >
                </TimeTable>
            </div>
        </>
    )
}

export default TimeTableView