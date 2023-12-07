import "./index.scss"
import React, { memo, useContext, useEffect, useMemo, useRef, useState, createContext } from 'react';
import { Button, Form, Input } from 'antd';
import { randomStr } from "../../../utils/index"
import Bpmn from '../../../components/Bpmn/index.js'
import BpmnViewer from '../../../components/BpmnViewer/index.js'
const PContext = createContext(null);

const flowPath = {
  common: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_LhYbP7iVnOZsfM5i4daW9ger7Qj3AP" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_jkFfchjd" isExecutable="false">
        <bpmn:startEvent id="Event_1cvlfit">
          <bpmn:outgoing>Flow_0480mus</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:userTask id="Activity_0369ewu">
          <bpmn:incoming>Flow_0480mus</bpmn:incoming>
          <bpmn:outgoing>Flow_1ify5bc</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_0480mus" sourceRef="Event_1cvlfit" targetRef="Activity_0369ewu" />
        <bpmn:endEvent id="Event_0z4b2pc">
          <bpmn:incoming>Flow_1ify5bc</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1ify5bc" sourceRef="Activity_0369ewu" targetRef="Event_0z4b2pc" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BpmnDiagram_83O6qe4u">
        <bpmndi:BPMNPlane id="BpmnPlane_3xQJyRCB" bpmnElement="Process_jkFfchjd">
          <bpmndi:BPMNShape id="Event_1cvlfit_di" bpmnElement="Event_1cvlfit">
            <dc:Bounds x="122" y="152" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0369ewu_di" bpmnElement="Activity_0369ewu">
            <dc:Bounds x="210" y="130" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0z4b2pc_di" bpmnElement="Event_0z4b2pc">
            <dc:Bounds x="362" y="152" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_0480mus_di" bpmnElement="Flow_0480mus">
            <di:waypoint x="158" y="170" />
            <di:waypoint x="210" y="170" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1ify5bc_di" bpmnElement="Flow_1ify5bc">
            <di:waypoint x="310" y="170" />
            <di:waypoint x="362" y="170" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`,
    map: { "id": "Process_jkFfchjd", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_1cvlfit"], "children": { "Event_1cvlfit": { "id": "Event_1cvlfit", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_0480mus"] }, "Activity_0369ewu": { "id": "Activity_0369ewu", "attrs": {}, "type": "bpmn:UserTask", "nextNodes": ["Flow_1ify5bc"] }, "Flow_0480mus": { "id": "Flow_0480mus", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_0369ewu"] }, "Event_0z4b2pc": { "id": "Event_0z4b2pc", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_1ify5bc": { "id": "Flow_1ify5bc", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0z4b2pc"] } }, "paths": ["Event_1cvlfit", "Flow_0480mus", "Activity_0369ewu", "Flow_1ify5bc", "Event_0z4b2pc"] }
  },
  branch: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_HW9crNMPJ3mLDdIXU8VgAACW8Cqq8p" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_YZncNBgf" isExecutable="false">
        <bpmn:startEvent id="Event_12l1ivw">
          <bpmn:outgoing>Flow_1cey2sn</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:exclusiveGateway id="Gateway_1iq1d33">
          <bpmn:incoming>Flow_1cey2sn</bpmn:incoming>
          <bpmn:outgoing>Flow_01zuzdg</bpmn:outgoing>
          <bpmn:outgoing>Flow_1a71k4r</bpmn:outgoing>
        </bpmn:exclusiveGateway>
        <bpmn:sequenceFlow id="Flow_1cey2sn" sourceRef="Event_12l1ivw" targetRef="Gateway_1iq1d33" />
        <bpmn:userTask id="Activity_0dvl3d8">
          <bpmn:incoming>Flow_01zuzdg</bpmn:incoming>
          <bpmn:outgoing>Flow_1qc2m0j</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_01zuzdg" sourceRef="Gateway_1iq1d33" targetRef="Activity_0dvl3d8" conditionId="1" />
        <bpmn:endEvent id="Event_1eo16wp">
          <bpmn:incoming>Flow_1qc2m0j</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1qc2m0j" sourceRef="Activity_0dvl3d8" targetRef="Event_1eo16wp" />
        <bpmn:endEvent id="Event_0klqtw4">
          <bpmn:incoming>Flow_1a71k4r</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_1a71k4r" sourceRef="Gateway_1iq1d33" targetRef="Event_0klqtw4" conditionId="2" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BpmnDiagram_sQTZtuUO">
        <bpmndi:BPMNPlane id="BpmnPlane_cCAiFXhV" bpmnElement="Process_YZncNBgf">
          <bpmndi:BPMNShape id="Event_12l1ivw_di" bpmnElement="Event_12l1ivw">
            <dc:Bounds x="132" y="162" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Gateway_1iq1d33_di" bpmnElement="Gateway_1iq1d33" isMarkerVisible="true">
            <dc:Bounds x="225" y="155" width="50" height="50" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0dvl3d8_di" bpmnElement="Activity_0dvl3d8">
            <dc:Bounds x="340" y="140" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_1eo16wp_di" bpmnElement="Event_1eo16wp">
            <dc:Bounds x="512" y="162" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0klqtw4_di" bpmnElement="Event_0klqtw4">
            <dc:Bounds x="342" y="272" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_1cey2sn_di" bpmnElement="Flow_1cey2sn">
            <di:waypoint x="168" y="180" />
            <di:waypoint x="225" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_01zuzdg_di" bpmnElement="Flow_01zuzdg">
            <di:waypoint x="275" y="180" />
            <di:waypoint x="340" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1qc2m0j_di" bpmnElement="Flow_1qc2m0j">
            <di:waypoint x="440" y="180" />
            <di:waypoint x="512" y="180" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_1a71k4r_di" bpmnElement="Flow_1a71k4r">
            <di:waypoint x="250" y="205" />
            <di:waypoint x="250" y="290" />
            <di:waypoint x="342" y="290" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>
    `,
    map: { "id": "Process_YZncNBgf", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_12l1ivw"], "children": { "Event_12l1ivw": { "id": "Event_12l1ivw", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_1cey2sn"] }, "Gateway_1iq1d33": { "id": "Gateway_1iq1d33", "attrs": {}, "type": "bpmn:ExclusiveGateway", "nextNodes": ["Flow_01zuzdg", "Flow_1a71k4r"] }, "Flow_1cey2sn": { "id": "Flow_1cey2sn", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Gateway_1iq1d33"] }, "Activity_0dvl3d8": { "id": "Activity_0dvl3d8", "attrs": {}, "type": "bpmn:UserTask", "nextNodes": ["Flow_1qc2m0j"] }, "Flow_01zuzdg": { "id": "Flow_01zuzdg", "attrs": { "conditionId": "1" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_0dvl3d8"] }, "Event_1eo16wp": { "id": "Event_1eo16wp", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_1qc2m0j": { "id": "Flow_1qc2m0j", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_1eo16wp"] }, "Event_0klqtw4": { "id": "Event_0klqtw4", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_1a71k4r": { "id": "Flow_1a71k4r", "attrs": { "conditionId": "2" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0klqtw4"] } }, "paths": { "Flow_01zuzdg": ["Event_12l1ivw", "Flow_1cey2sn", "Gateway_1iq1d33", "Flow_01zuzdg", "Activity_0dvl3d8", "Flow_1qc2m0j", "Event_1eo16wp"], "Flow_1a71k4r": ["Event_12l1ivw", "Flow_1cey2sn", "Gateway_1iq1d33", "Flow_1a71k4r", "Event_0klqtw4"] } }
  },
}


const FormView = () => {
  const cData = useContext(PContext);
  let resPath = []
  const [conditionId, setConditionId] = useState("")
  const submit = () => {
    const { bpmnView } = cData
    const { id, paths, children } = bpmnView
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

    console.log("submit", { id, resPath, formMsg: { conditionId } })
  }
  return <div className="form-view">
    <Form onFinish={submit}>
      <Form.Item
        label="Username"
        name="username"
      >
        <Input disabled />
      </Form.Item>
    </Form>
  </div>
}

const UserView = (props) => {
  const cData = useContext(PContext);
  const { user, id } = props
  return <div className="user-view" onClick={() => cData.changeView(id % 2 ? "common" : "branch")}>
    <div>{user}</div>
    <div></div>
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

  const init = (state = "common") => {
    setBpmnView(flowPath[state].map)
    setBpmnXml(flowPath[state].xml)
  }


  const Steps = memo(() => {
    let res = []
    if (bpmnView) {
      const { currently, children } = bpmnView
      currently.forEach(item => {
        res = [...res, children[item]]
      })
    }
    return res.map(item => {
      return <div key={item.id}>{item.id}</div>
    })
  }, [bpmnView])






  return <PContext.Provider value={{ bpmnView, changeView: init }} >
    <div className="bpmn-view">
      <div className="bpmn-view-flow">
        <FormView></FormView>
        {new Array(3).fill(null).map((_, index) => {
          index = index + 1
          return {
            user: "user" + index,
            id: index
          }
        }).map((item, index) => <UserView key={index} {...item}></UserView>)}
      </div>
      {bpmnView && <>
        {bpmnXml && <BpmnViewer xml={bpmnXml} map={bpmnView}></BpmnViewer>}
      </>}
      <Bpmn />
    </div>
  </PContext.Provider>
}

export default BpmnView