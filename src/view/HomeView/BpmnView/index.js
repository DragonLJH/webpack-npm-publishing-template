import "./index.scss"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Steps, Button } from 'antd';
import Bpmn from '../../../components/Bpmn/index.js'
import BpmnViewer from '../../../components/BpmnViewer/index.js'


// const conditionId = 1;
const TEST_XML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_7irs6cG48DGf9YXfOkuxZLaTgyskVm" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_Z14kjsgH" isExecutable="false">
    <bpmn:startEvent id="Event_0g69482">
      <bpmn:outgoing>Flow_1hv1t5d</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="Gateway_1jdwy9j">
      <bpmn:incoming>Flow_1hv1t5d</bpmn:incoming>
      <bpmn:outgoing>Flow_19br2ao</bpmn:outgoing>
      <bpmn:outgoing>Flow_1grrt74</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_1hv1t5d" sourceRef="Event_0g69482" targetRef="Gateway_1jdwy9j" />
    <bpmn:userTask id="Activity_1ejzwzo">
      <bpmn:incoming>Flow_19br2ao</bpmn:incoming>
      <bpmn:outgoing>Flow_0kpn0vu</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_19br2ao" sourceRef="Gateway_1jdwy9j" targetRef="Activity_1ejzwzo" conditionId="1" />
    <bpmn:endEvent id="Event_1f1ceyv">
      <bpmn:incoming>Flow_0kpn0vu</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0kpn0vu" sourceRef="Activity_1ejzwzo" targetRef="Event_1f1ceyv" />
    <bpmn:endEvent id="Event_1w4np5z">
      <bpmn:incoming>Flow_1grrt74</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1grrt74" sourceRef="Gateway_1jdwy9j" targetRef="Event_1w4np5z" conditionId="2" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_jOFMcRkF">
    <bpmndi:BPMNPlane id="BpmnPlane_jXPGVwQD" bpmnElement="Process_Z14kjsgH">
      <bpmndi:BPMNShape id="Event_0g69482_di" bpmnElement="Event_0g69482">
        <dc:Bounds x="92" y="122" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1jdwy9j_di" bpmnElement="Gateway_1jdwy9j" isMarkerVisible="true">
        <dc:Bounds x="185" y="115" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1ejzwzo_di" bpmnElement="Activity_1ejzwzo">
        <dc:Bounds x="300" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1f1ceyv_di" bpmnElement="Event_1f1ceyv">
        <dc:Bounds x="472" y="122" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1w4np5z_di" bpmnElement="Event_1w4np5z">
        <dc:Bounds x="302" y="232" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1hv1t5d_di" bpmnElement="Flow_1hv1t5d">
        <di:waypoint x="128" y="140" />
        <di:waypoint x="185" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_19br2ao_di" bpmnElement="Flow_19br2ao">
        <di:waypoint x="235" y="140" />
        <di:waypoint x="300" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0kpn0vu_di" bpmnElement="Flow_0kpn0vu">
        <di:waypoint x="400" y="140" />
        <di:waypoint x="472" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1grrt74_di" bpmnElement="Flow_1grrt74">
        <di:waypoint x="210" y="165" />
        <di:waypoint x="210" y="250" />
        <di:waypoint x="302" y="250" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
const TEST_MAP = { "id": "Process_Z14kjsgH", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_0g69482"], "children": { "Event_0g69482": { "id": "Event_0g69482", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_1hv1t5d"] }, "Gateway_1jdwy9j": { "id": "Gateway_1jdwy9j", "attrs": {}, "type": "bpmn:ExclusiveGateway", "nextNodes": ["Flow_19br2ao", "Flow_1grrt74"] }, "Flow_1hv1t5d": { "id": "Flow_1hv1t5d", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Gateway_1jdwy9j"] }, "Activity_1ejzwzo": { "id": "Activity_1ejzwzo", "attrs": {}, "type": "bpmn:UserTask", "nextNodes": ["Flow_0kpn0vu"] }, "Flow_19br2ao": { "id": "Flow_19br2ao", "attrs": { "conditionId": "1" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_1ejzwzo"] }, "Event_1f1ceyv": { "id": "Event_1f1ceyv", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_0kpn0vu": { "id": "Flow_0kpn0vu", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_1f1ceyv"] }, "Event_1w4np5z": { "id": "Event_1w4np5z", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_1grrt74": { "id": "Flow_1grrt74", "attrs": { "conditionId": "2" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_1w4np5z"] } } }


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

        setBpmnView(TEST_MAP)
        setBpmnXml(TEST_XML)
    }, [])

    const steps = useMemo(() => {
        let res = []
        if (bpmnView) {
            const { currently, children } = bpmnView
            currently.forEach(item => {
                res = [...res, children[item]]
            })
        }
        return res
    }, [bpmnView])




    const next = (_) => {
        const { currently, children } = bpmnView
        const target = currently[currently.length - 1]
        const { nextNodes } = children[target]
        if (nextNodes.length) {
            const tag = nextNodes.map(item => children[item]).find(item => {
                const { attrs } = item
                return !Object.keys(attrs).length || attrs["conditionId"] == conditionId
            })
            setBpmnView((item) => {
                const { currently } = item
                return {
                    ...item,
                    currently: [...currently, tag.id]
                }
            })
        }

    }



    return <div className="bpmn-view">
        <div className="bpmn-view-steps">
            {bpmnView && <>
                <Button type="primary" onClick={next}>next</Button>
                {steps.map(item => {
                    return <div key={item.id}>{item.id}</div>
                })}
            </>}
        </div>
        <div>
            条件：<input onInput={(e) => setConditionId(e.target.value)} />
        </div>
        {bpmnXml && <BpmnViewer xml={bpmnXml}></BpmnViewer>}
        <Bpmn />
    </div>
}

export default BpmnView