import "./index.scss"
import React, { memo, useContext, useEffect, useMemo, useRef, useState, createContext } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { randomStr } from "../../../utils/index"
import Bpmn from '../../../components/Bpmn/index.js'
import BpmnViewer from '../../../components/BpmnViewer/index.js'
const PContext = createContext(null);


const flowPath = {
  Process_gSBCGZxU: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_2L73PYnVCAnhqmCGTvhm8UWvwSOPLi" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_gSBCGZxU" isExecutable="false">
        <bpmn:startEvent id="Event_00koaib">
          <bpmn:outgoing>Flow_0y18qd5</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:userTask id="Activity_0uas7c5" mode="rules-4" people="10,1,2,3,4,5,6,7,8,9">
          <bpmn:incoming>Flow_0y18qd5</bpmn:incoming>
          <bpmn:outgoing>Flow_1jtdvzf</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_0y18qd5" sourceRef="Event_00koaib" targetRef="Activity_0uas7c5" />
        <bpmn:endEvent id="Event_1h42deb">
          <bpmn:incoming>Flow_1jtdvzf</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1jtdvzf" sourceRef="Activity_0uas7c5" targetRef="Event_1h42deb" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BpmnDiagram_3gB3X1u6">
        <bpmndi:BPMNPlane id="BpmnPlane_kBnQSHx1" bpmnElement="Process_gSBCGZxU">
          <bpmndi:BPMNShape id="Event_00koaib_di" bpmnElement="Event_00koaib">
            <dc:Bounds x="152" y="182" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0uas7c5_di" bpmnElement="Activity_0uas7c5">
            <dc:Bounds x="240" y="160" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_1h42deb_di" bpmnElement="Event_1h42deb">
            <dc:Bounds x="392" y="182" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_0y18qd5_di" bpmnElement="Flow_0y18qd5">
            <di:waypoint x="188" y="200" />
            <di:waypoint x="240" y="200" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1jtdvzf_di" bpmnElement="Flow_1jtdvzf">
            <di:waypoint x="340" y="200" />
            <di:waypoint x="392" y="200" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`,
    bpmnMap: { "id": "Process_gSBCGZxU", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_00koaib"], "children": { "Event_00koaib": { "id": "Event_00koaib", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_0y18qd5"] }, "Activity_0uas7c5": { "id": "Activity_0uas7c5", "attrs": { "mode": "rules-4", "people": [10, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, "type": "bpmn:UserTask", "nextNodes": ["Flow_1jtdvzf"] }, "Flow_0y18qd5": { "id": "Flow_0y18qd5", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_0uas7c5"] }, "Event_1h42deb": { "id": "Event_1h42deb", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_1jtdvzf": { "id": "Flow_1jtdvzf", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_1h42deb"] } }, "paths": ["Event_00koaib", "Flow_0y18qd5", "Activity_0uas7c5", "Flow_1jtdvzf", "Event_1h42deb"] }
  },
  Process_8YQRSvsG: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_7s6Np7cI6rRtBcMwtJYyb9nfd7AxxP" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_8YQRSvsG" isExecutable="false">
        <bpmn:startEvent id="Event_03mtd5o">
          <bpmn:outgoing>Flow_0y752zc</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:exclusiveGateway id="Gateway_1atxfyi">
          <bpmn:incoming>Flow_0y752zc</bpmn:incoming>
          <bpmn:outgoing>Flow_0bbuzgc</bpmn:outgoing>
          <bpmn:outgoing>Flow_0865gg9</bpmn:outgoing>
        </bpmn:exclusiveGateway>
        <bpmn:sequenceFlow id="Flow_0y752zc" sourceRef="Event_03mtd5o" targetRef="Gateway_1atxfyi" />
        <bpmn:userTask id="Activity_1s3xqwp" mode="rules-1" people="10">
          <bpmn:incoming>Flow_0bbuzgc</bpmn:incoming>
          <bpmn:outgoing>Flow_06lrmny</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_0bbuzgc" sourceRef="Gateway_1atxfyi" targetRef="Activity_1s3xqwp" conditionId="1" />
        <bpmn:endEvent id="Event_0kxu7em">
          <bpmn:incoming>Flow_06lrmny</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_06lrmny" sourceRef="Activity_1s3xqwp" targetRef="Event_0kxu7em" />
        <bpmn:userTask id="Activity_0zuzo5o" mode="rules-4" people="10,1,2,3">
          <bpmn:incoming>Flow_0865gg9</bpmn:incoming>
          <bpmn:outgoing>Flow_1yrh9ag</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_0865gg9" sourceRef="Gateway_1atxfyi" targetRef="Activity_0zuzo5o" conditionId="2" />
        <bpmn:endEvent id="Event_0lnbkj6">
          <bpmn:incoming>Flow_1yrh9ag</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1yrh9ag" sourceRef="Activity_0zuzo5o" targetRef="Event_0lnbkj6" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BpmnDiagram_qGxP1Yh7">
        <bpmndi:BPMNPlane id="BpmnPlane_XS64VWkp" bpmnElement="Process_8YQRSvsG">
          <bpmndi:BPMNShape id="Event_03mtd5o_di" bpmnElement="Event_03mtd5o">
            <dc:Bounds x="122" y="582" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Gateway_1atxfyi_di" bpmnElement="Gateway_1atxfyi" isMarkerVisible="true">
            <dc:Bounds x="215" y="575" width="50" height="50" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_1s3xqwp_di" bpmnElement="Activity_1s3xqwp">
            <dc:Bounds x="330" y="560" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0kxu7em_di" bpmnElement="Event_0kxu7em">
            <dc:Bounds x="502" y="582" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0zuzo5o_di" bpmnElement="Activity_0zuzo5o">
            <dc:Bounds x="330" y="670" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0lnbkj6_di" bpmnElement="Event_0lnbkj6">
            <dc:Bounds x="502" y="692" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_0y752zc_di" bpmnElement="Flow_0y752zc">
            <di:waypoint x="158" y="600" />
            <di:waypoint x="215" y="600" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0bbuzgc_di" bpmnElement="Flow_0bbuzgc">
            <di:waypoint x="265" y="600" />
            <di:waypoint x="330" y="600" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_06lrmny_di" bpmnElement="Flow_06lrmny">
            <di:waypoint x="430" y="600" />
            <di:waypoint x="502" y="600" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0865gg9_di" bpmnElement="Flow_0865gg9">
            <di:waypoint x="240" y="625" />
            <di:waypoint x="240" y="710" />
            <di:waypoint x="330" y="710" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1yrh9ag_di" bpmnElement="Flow_1yrh9ag">
            <di:waypoint x="430" y="710" />
            <di:waypoint x="502" y="710" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`,
    bpmnMap: { "id": "Process_8YQRSvsG", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_03mtd5o"], "children": { "Event_03mtd5o": { "id": "Event_03mtd5o", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_0y752zc"] }, "Gateway_1atxfyi": { "id": "Gateway_1atxfyi", "attrs": {}, "type": "bpmn:ExclusiveGateway", "nextNodes": ["Flow_0bbuzgc", "Flow_0865gg9"] }, "Flow_0y752zc": { "id": "Flow_0y752zc", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Gateway_1atxfyi"] }, "Activity_1s3xqwp": { "id": "Activity_1s3xqwp", "attrs": { "mode": "rules-1", "people": 10 }, "type": "bpmn:UserTask", "nextNodes": ["Flow_06lrmny"] }, "Flow_0bbuzgc": { "id": "Flow_0bbuzgc", "attrs": { "conditionId": "1" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_1s3xqwp"] }, "Event_0kxu7em": { "id": "Event_0kxu7em", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_06lrmny": { "id": "Flow_06lrmny", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0kxu7em"] }, "Activity_0zuzo5o": { "id": "Activity_0zuzo5o", "attrs": { "mode": "rules-4", "people": [10, 1, 2, 3] }, "type": "bpmn:UserTask", "nextNodes": ["Flow_1yrh9ag"] }, "Flow_0865gg9": { "id": "Flow_0865gg9", "attrs": { "conditionId": "2" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_0zuzo5o"] }, "Event_0lnbkj6": { "id": "Event_0lnbkj6", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_1yrh9ag": { "id": "Flow_1yrh9ag", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0lnbkj6"] } }, "paths": { "Flow_0bbuzgc": ["Event_03mtd5o", "Flow_0y752zc", "Gateway_1atxfyi", "Flow_0bbuzgc", "Activity_1s3xqwp", "Flow_06lrmny", "Event_0kxu7em"], "Flow_0865gg9": ["Event_03mtd5o", "Flow_0y752zc", "Gateway_1atxfyi", "Flow_0865gg9", "Activity_0zuzo5o", "Flow_1yrh9ag", "Event_0lnbkj6"] } }
  },
}

const userList = [{ "user": "User_xFdVTAXA", "id": 10 },
{ "user": "User_DLt4WRqI", "id": 1 },
{ "user": "User_g8TwB329", "id": 2 },
{ "user": "User_h38JU6r8", "id": 3 },
{ "user": "User_PkAgPGAW", "id": 4 },
{ "user": "User_RVWBNEU3", "id": 5 },
{ "user": "User_T2FVwMbA", "id": 6 },
{ "user": "User_VpdJgMiw", "id": 7 },
{ "user": "User_S3AEs2jD", "id": 8 },
{ "user": "User_R3J5XTRQ", "id": 9 }]

const rulesList = [{ value: 'rules-1', label: '单人办理', },
{ value: 'rules-2', label: '多人并行', },
{ value: 'rules-3', label: '多人顺序', },
{ value: 'rules-4', label: '多人任意', }]


const FormView = () => {
  const cData = useContext(PContext);
  const [uForm] = Form.useForm()
  let resPath = []
  const submit = ({ flowId, conditionId, username }) => {
    const { saveMap } = cData
    const { paths, children } = flowPath[flowId].bpmnMap
    if (Object.prototype.toString.call(paths) === '[object Object]') {
      Object.keys(paths).forEach((item) => {
        const { attrs } = children[item]
        if (attrs["conditionId"] === conditionId) {
          resPath = paths[item]
        }
      })
    } else {
      resPath = paths
    }
    resPath = resPath.map(item => children[item])
    for (let i = 0; i < resPath.length; i++) {
      let item = resPath[i]
      if (item.type == "bpmn:UserTask") {
        item.state = 2
        break;
      } else {
        item.state = 1
      }
    }
    uForm.setFieldsValue({ flowId: "", username: `User_${randomStr(8).join("")}`, conditionId: "" })
    saveMap({ flowId, resPath, formMsg: { flowId, conditionId, username } })
  }
  return <div className="form-view">
    <Form form={uForm} onFinish={submit} layout="inline" initialValues={{ username: `User_${randomStr(8).join("")}` }}>
      <Form.Item name="flowId" >
        <Select
          style={{ width: 120 }}
          options={[
            { value: 'Process_gSBCGZxU', label: '流程1' },
            { value: 'Process_8YQRSvsG', label: '流程2' },
          ]}
        />
      </Form.Item>
      <Form.Item name="username" >
        <Input disabled />
      </Form.Item>
      <Form.Item name="conditionId" >
        <Input placeholder="条件Id" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}

const UserViews = () => {
  Object.keys(flowPath).forEach(flow => {
    let res = JSON.parse(localStorage.getItem(flow))
    res && res.forEach(({ resPath, formMsg }) => {
      let { attrs } = resPath.find(({ state }) => state == 2)
      console.log(attrs, formMsg.username)
    })
  })

  return <div className="user-views">
    {userList.map(item => {
      return <div className="user-view" key={item.id}>
        <div className="user-view-title">
          {item.user}
        </div>
        <div className="user-view-main">

        </div>
      </div>
    })}
  </div>
}

const BpmnView = () => {
  const [conditionId, setConditionId] = useState(null)
  const [bpmnView, setBpmnView] = useState(null)
  const [bpmnXml, setBpmnXml] = useState(null)
  useEffect(() => {
    // 本地数据测试
    // let bpmnMap = localStorage.getItem("bpmnMap")
    // let bpmnXml = localStorage.getItem("bpmnXml")
    // if (bpmnMap) {
    //     bpmnMap = JSON.parse(bpmnMap)
    //     console.log("bpmnMap", bpmnMap)
    //     setBpmnView(bpmnMap)
    //     setBpmnXml(bpmnXml)
    // }
    init()
  }, [])

  const init = (state = "Process_gSBCGZxU") => {
    setBpmnView(flowPath[state].bpmnMap)
    setBpmnXml(flowPath[state].xml)
  }
  const saveMap = (data) => {
    const { flowId } = data
    if (localStorage.hasOwnProperty(flowId)) {
      let item = JSON.parse(localStorage.getItem(flowId))
      localStorage.setItem(flowId, JSON.stringify([...item, data]))
    } else {
      localStorage.setItem(flowId, JSON.stringify([data]))
    }

  }

  return <PContext.Provider value={{ bpmnView, changeView: init, saveMap: saveMap }} >
    <div className="bpmn-view">
      <div className="bpmn-view-form">
        <FormView></FormView>
      </div>
      <div className="bpmn-view-flow">
        <UserViews></UserViews>
      </div>
      {bpmnView && <>
        {bpmnXml && <BpmnViewer xml={bpmnXml} map={bpmnView}></BpmnViewer>}
      </>}
      <Bpmn />
    </div>
  </PContext.Provider>
}

export default BpmnView