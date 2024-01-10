import "./index.scss"
import React, { memo, useContext, useEffect, useMemo, useRef, useState, createContext, useCallback } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';
import { randomStr } from "../../../utils/index"
import Bpmn from '../../../components/Bpmn/index.js'
import BpmnViewer from '../../../components/BpmnViewer/index.js'
const PContext = createContext(null);


const defaultFlowPath = {
  Process_ujdLW1AD: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_q25SPiTR3Qdmn7GqG6uBbi3Gb6w7Hn" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_ujdLW1AD" isExecutable="false">
        <bpmn:startEvent id="Event_0ajllcv">
          <bpmn:outgoing>Flow_1mvusn3</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:userTask id="Activity_1ewp2vu" mode="rules-4" people="Id_xFdVTAXA,Id_DLt4WRqI,Id_g8TwB329,Id_h38JU6r8,Id_PkAgPGAW,Id_RVWBNEU3,Id_T2FVwMbA,Id_VpdJgMiw,Id_S3AEs2jD,Id_R3J5XTRQ">
          <bpmn:incoming>Flow_1mvusn3</bpmn:incoming>
          <bpmn:outgoing>Flow_0ogie6d</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_1mvusn3" sourceRef="Event_0ajllcv" targetRef="Activity_1ewp2vu" />
        <bpmn:endEvent id="Event_0apq816">
          <bpmn:incoming>Flow_0ogie6d</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_0ogie6d" sourceRef="Activity_1ewp2vu" targetRef="Event_0apq816" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BpmnDiagram_LYQnCSun">
        <bpmndi:BPMNPlane id="BpmnPlane_stc5GS6n" bpmnElement="Process_ujdLW1AD">
          <bpmndi:BPMNShape id="Event_0ajllcv_di" bpmnElement="Event_0ajllcv">
            <dc:Bounds x="102" y="132" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_1ewp2vu_di" bpmnElement="Activity_1ewp2vu">
            <dc:Bounds x="190" y="110" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0apq816_di" bpmnElement="Event_0apq816">
            <dc:Bounds x="342" y="132" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_1mvusn3_di" bpmnElement="Flow_1mvusn3">
            <di:waypoint x="138" y="150" />
            <di:waypoint x="190" y="150" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0ogie6d_di" bpmnElement="Flow_0ogie6d">
            <di:waypoint x="290" y="150" />
            <di:waypoint x="342" y="150" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`,
    bpmnMap: { "id": "Process_ujdLW1AD", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_0ajllcv"], "children": { "Event_0ajllcv": { "id": "Event_0ajllcv", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_1mvusn3"] }, "Activity_1ewp2vu": { "id": "Activity_1ewp2vu", "attrs": { "mode": "rules-4", "people": ["Id_xFdVTAXA", "Id_DLt4WRqI", "Id_g8TwB329", "Id_h38JU6r8", "Id_PkAgPGAW", "Id_RVWBNEU3", "Id_T2FVwMbA", "Id_VpdJgMiw", "Id_S3AEs2jD", "Id_R3J5XTRQ"] }, "type": "bpmn:UserTask", "nextNodes": ["Flow_0ogie6d"] }, "Flow_1mvusn3": { "id": "Flow_1mvusn3", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_1ewp2vu"] }, "Event_0apq816": { "id": "Event_0apq816", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_0ogie6d": { "id": "Flow_0ogie6d", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0apq816"] } }, "paths": ["Event_0ajllcv", "Flow_1mvusn3", "Activity_1ewp2vu", "Flow_0ogie6d", "Event_0apq816"] }
  },
  Process_O2QTtmQE: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Id_IZaI68pvHVBr6v9r1YUNupOh6Zrxeu" targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_O2QTtmQE" isExecutable="false">
        <bpmn:startEvent id="Event_0j2zm6k">
          <bpmn:outgoing>Flow_0le2d8j</bpmn:outgoing>
        </bpmn:startEvent>
        <bpmn:exclusiveGateway id="Gateway_12h51vm">
          <bpmn:incoming>Flow_0le2d8j</bpmn:incoming>
          <bpmn:outgoing>Flow_0z45twz</bpmn:outgoing>
          <bpmn:outgoing>Flow_0bdbnhj</bpmn:outgoing>
        </bpmn:exclusiveGateway>
        <bpmn:sequenceFlow id="Flow_0le2d8j" sourceRef="Event_0j2zm6k" targetRef="Gateway_12h51vm" />
        <bpmn:userTask id="Activity_0bo60at" mode="rules-1" people="Id_xFdVTAXA">
          <bpmn:incoming>Flow_0z45twz</bpmn:incoming>
          <bpmn:outgoing>Flow_0van6sg</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_0z45twz" sourceRef="Gateway_12h51vm" targetRef="Activity_0bo60at" conditionId="1" />
        <bpmn:endEvent id="Event_0w10hd9">
          <bpmn:incoming>Flow_0van6sg</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_0van6sg" sourceRef="Activity_0bo60at" targetRef="Event_0w10hd9" />
        <bpmn:userTask id="Activity_1xvgpib" mode="rules-4" people="Id_xFdVTAXA,Id_DLt4WRqI,Id_g8TwB329,Id_h38JU6r8,Id_PkAgPGAW,Id_RVWBNEU3,Id_T2FVwMbA,Id_VpdJgMiw,Id_S3AEs2jD,Id_R3J5XTRQ">
          <bpmn:incoming>Flow_0bdbnhj</bpmn:incoming>
          <bpmn:outgoing>Flow_0xtpuo3</bpmn:outgoing>
        </bpmn:userTask>
        <bpmn:sequenceFlow id="Flow_0bdbnhj" sourceRef="Gateway_12h51vm" targetRef="Activity_1xvgpib" conditionId="2" />
        <bpmn:endEvent id="Event_0oduh3f">
          <bpmn:incoming>Flow_0xtpuo3</bpmn:incoming>
        </bpmn:endEvent>
        <bpmn:sequenceFlow id="Flow_0xtpuo3" sourceRef="Activity_1xvgpib" targetRef="Event_0oduh3f" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BpmnDiagram_ND7I15cZ">
        <bpmndi:BPMNPlane id="BpmnPlane_ReuADHYB" bpmnElement="Process_O2QTtmQE">
          <bpmndi:BPMNShape id="Event_0j2zm6k_di" bpmnElement="Event_0j2zm6k">
            <dc:Bounds x="142" y="172" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Gateway_12h51vm_di" bpmnElement="Gateway_12h51vm" isMarkerVisible="true">
            <dc:Bounds x="235" y="165" width="50" height="50" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_0bo60at_di" bpmnElement="Activity_0bo60at">
            <dc:Bounds x="350" y="150" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0w10hd9_di" bpmnElement="Event_0w10hd9">
            <dc:Bounds x="522" y="172" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Activity_1xvgpib_di" bpmnElement="Activity_1xvgpib">
            <dc:Bounds x="350" y="260" width="100" height="80" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNShape id="Event_0oduh3f_di" bpmnElement="Event_0oduh3f">
            <dc:Bounds x="522" y="282" width="36" height="36" />
          </bpmndi:BPMNShape>
          <bpmndi:BPMNEdge id="Flow_0le2d8j_di" bpmnElement="Flow_0le2d8j">
            <di:waypoint x="178" y="190" />
            <di:waypoint x="235" y="190" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0z45twz_di" bpmnElement="Flow_0z45twz">
            <di:waypoint x="285" y="190" />
            <di:waypoint x="350" y="190" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0van6sg_di" bpmnElement="Flow_0van6sg">
            <di:waypoint x="450" y="190" />
            <di:waypoint x="522" y="190" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0bdbnhj_di" bpmnElement="Flow_0bdbnhj">
            <di:waypoint x="260" y="215" />
            <di:waypoint x="260" y="300" />
            <di:waypoint x="350" y="300" />
          </bpmndi:BPMNEdge>
          <bpmndi:BPMNEdge id="Flow_0xtpuo3_di" bpmnElement="Flow_0xtpuo3">
            <di:waypoint x="450" y="300" />
            <di:waypoint x="522" y="300" />
          </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`,
    bpmnMap: { "id": "Process_O2QTtmQE", "attrs": {}, "type": "bpmn:Process", "isExecutable": false, "nextNodes": [], "currently": ["Event_0j2zm6k"], "children": { "Event_0j2zm6k": { "id": "Event_0j2zm6k", "attrs": {}, "type": "bpmn:StartEvent", "nextNodes": ["Flow_0le2d8j"] }, "Gateway_12h51vm": { "id": "Gateway_12h51vm", "attrs": {}, "type": "bpmn:ExclusiveGateway", "nextNodes": ["Flow_0z45twz", "Flow_0bdbnhj"] }, "Flow_0le2d8j": { "id": "Flow_0le2d8j", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Gateway_12h51vm"] }, "Activity_0bo60at": { "id": "Activity_0bo60at", "attrs": { "mode": "rules-1", "people": "Id_xFdVTAXA" }, "type": "bpmn:UserTask", "nextNodes": ["Flow_0van6sg"] }, "Flow_0z45twz": { "id": "Flow_0z45twz", "attrs": { "conditionId": "1" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_0bo60at"] }, "Event_0w10hd9": { "id": "Event_0w10hd9", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_0van6sg": { "id": "Flow_0van6sg", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0w10hd9"] }, "Activity_1xvgpib": { "id": "Activity_1xvgpib", "attrs": { "mode": "rules-4", "people": ["Id_xFdVTAXA", "Id_DLt4WRqI", "Id_g8TwB329", "Id_h38JU6r8", "Id_PkAgPGAW", "Id_RVWBNEU3", "Id_T2FVwMbA", "Id_VpdJgMiw", "Id_S3AEs2jD", "Id_R3J5XTRQ"] }, "type": "bpmn:UserTask", "nextNodes": ["Flow_0xtpuo3"] }, "Flow_0bdbnhj": { "id": "Flow_0bdbnhj", "attrs": { "conditionId": "2" }, "type": "bpmn:SequenceFlow", "nextNodes": ["Activity_1xvgpib"] }, "Event_0oduh3f": { "id": "Event_0oduh3f", "attrs": {}, "type": "bpmn:EndEvent", "nextNodes": [] }, "Flow_0xtpuo3": { "id": "Flow_0xtpuo3", "attrs": {}, "type": "bpmn:SequenceFlow", "nextNodes": ["Event_0oduh3f"] } }, "paths": { "Flow_0z45twz": ["Event_0j2zm6k", "Flow_0le2d8j", "Gateway_12h51vm", "Flow_0z45twz", "Activity_0bo60at", "Flow_0van6sg", "Event_0w10hd9"], "Flow_0bdbnhj": ["Event_0j2zm6k", "Flow_0le2d8j", "Gateway_12h51vm", "Flow_0bdbnhj", "Activity_1xvgpib", "Flow_0xtpuo3", "Event_0oduh3f"] } }
  },
}

const rulesList = [{ value: 'rules-1', label: '单人办理', },
{ value: 'rules-2', label: '多人并行', },
{ value: 'rules-3', label: '多人顺序', },
{ value: 'rules-4', label: '多人任意', }]


const FormView = () => {
  const [flowOptions, setFlowOptions] = useState([])
  const [customForm, setCustomForm] = useState({})
  useEffect(() => {
    initFlowOptions()
  }, [])
  const initFlowOptions = () => {
    fetch(`http://localhost:8687/bpmn/queryAllBpmn`, {
      method: 'GET'
    }).then((res) => {
      return res.json()
    }).then(({ result }) => {
      setFlowOptions(result.map(({ bpmnId }) => { return { value: bpmnId, label: bpmnId } }))
    })
  }

  const selectChange = (bpmnId) => {
    fetch(`http://localhost:8687/bpmn/queryBpmnMsgById/${bpmnId}`, {
      method: 'GET'
    }).then(item => {
      return item.json()
    }).then(({ result }) => result).then(({ bpmnMap }) => {
      console.log("***********", bpmnMap)
      if (bpmnMap) {
        const { paths, children } = JSON.parse(bpmnMap)
        let o = {}
        if (Object.prototype.toString.call(paths) === '[object Object]') {
          Object.keys(paths).forEach(item => {
            Object.entries(children[item].attrs).forEach(([k, v]) => {
              setMap(o, k, {
                value: item, label: v,
              })
            })
          })
        }
        setCustomForm(o)
      }


    })
  }


  const cData = useContext(PContext);

  const [uForm] = Form.useForm()

  const submit = async (formMsg) => {
    const { flowId, formId, conditionId } = formMsg
    const res = await fetch(`http://localhost:8687/bpmn/queryBpmnMsgById/${flowId}`, {
      method: 'GET'
    })
    res.json().then(res => res.result).then(({ bpmnMap }) => {
      let resPath = []
      if (bpmnMap) {
        const { paths, children } = JSON.parse(bpmnMap)
        if (conditionId) resPath = paths[conditionId]
        else resPath = paths
        resPath = resPath.map(item => children[item])
        for (let i = 0; i < resPath.length; i++) {
          let item = resPath[i]
          if (item.type == "bpmn:UserTask") {
            const { mode, people } = item.attrs
            const execute = async (userId) => {
              const data = new FormData();
              data.append('bpmnId', flowId)
              data.append('userId', userId)
              data.append('mode', mode)
              await fetch(`http://localhost:8687/userBpmn/save`, {
                method: 'POST',
                body: data
              });
            }
            if (Object.prototype.toString.call(people) == "[object Array]") {
              people.forEach(item => {
                execute(item)
              })
            } else {
              execute(people)
            }
            item.state = 2
            break;
          } else {
            item.state = 1
          }
        }
        const data = new FormData();
        data.append('formId', formId)
        data.append('bpmnId', flowId)
        data.append('formFile', new File([JSON.stringify(formMsg)], `${formId}.json`, {
          type: 'application/json'
        }));
        data.append('bpmnFile', new File([JSON.stringify(resPath)], `${formId}.json`, {
          type: 'application/json'
        }));

        fetch(`http://localhost:8687/formBpmn/saveOrUpdate`, {
          method: 'POST',
          body: data
        }).then(item => {
          return item.json()
        }).then(item => {
          console.log("insertFormBpmn", item)
        });
      }

    })

    // if (Object.prototype.toString.call(paths) === '[object Object]') {
    //   Object.keys(paths).forEach((item) => {
    //     const { attrs } = children[item]
    //     if (attrs["conditionId"] === conditionId) {
    //       resPath = paths[item]
    //     }
    //   })
    // } else {
    //   resPath = paths
    // }
    // resPath = resPath.map(item => children[item])
    // for (let i = 0; i < resPath.length; i++) {
    //   let item = resPath[i]
    //   if (item.type == "bpmn:UserTask") {
    //     item.state = 2
    //     break;
    //   } else {
    //     item.state = 1
    //   }
    // }  
    // uForm.setFieldsValue({ formId: `Form_${randomStr(8).join("")}`, flowId: "", username: `User_${randomStr(8).join("")}` })
    // saveMap({ flowId, resPath, formMsg })
    reset()
  }

  const reset = () => {
    uForm.resetFields()
    setCustomForm({})
  }
  return <div className="form-view">
    <Form form={uForm} onFinish={submit} layout="inline" initialValues={{ formId: `Form_${randomStr(8).join("")}`, username: `User_${randomStr(8).join("")}` }}>
      <Form.Item name="formId" >
        <Input disabled />
      </Form.Item>
      <Form.Item name="username" >
        <Input disabled />
      </Form.Item>
      <Form.Item name="flowId" >
        <Select
          onChange={selectChange}
          style={{ width: 200 }}
          options={flowOptions}
        />
      </Form.Item>
      {Object.entries(customForm).map(([k, v], index) => {
        return (<Form.Item name={k} key={index}>
          <Select
            style={{ width: 200 }}
            options={v}
          />
        </Form.Item>)
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}


const setMap = (map, key, value) => {
  if (map.hasOwnProperty(key)) {
    map[key] = [...map[key], value]
  } else {
    map[key] = [value]
  }
}

const ModalDiv = (props) => {
  const { formId, bpmnId } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bpmnXml, setBpmnXml] = useState(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    formId && init()
  }, [formId])
  const init = async () => {
    const resMap = await fetch(`http://localhost:8687/formBpmn/queryFormBpmnMsgById/${formId}`)
    resMap.json().then(res => res.result).then(({ bpmnMap }) => {
      bpmnMap && setMap(JSON.parse(bpmnMap))
      
    })
    const resXml = await fetch(`http://localhost:8687/bpmn/queryBpmnMsgById/${bpmnId}`)
    resXml.json().then(res => res.result).then(({ xml }) => {
      setBpmnXml(xml)
    })
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)

  }
  return <>
    <div className="modal-div">
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} destroyOnClose>
        <div style={{ width: 1000, height: "100vh" }}>
          {map && bpmnXml && <BpmnViewer xml={bpmnXml} map={map}></BpmnViewer>}
        </div>

      </Modal>
    </div>
  </>
}

const GetMsg = (props) => {
  const { userId } = props
  const [list, setList] = useState([])
  const [formId, setFormId] = useState("")
  const [bpmnId, setBpmnId] = useState("")
  useEffect(() => {
    init(userId)
  }, [userId])
  const init = async (userId) => {
    const response = await fetch(`http://localhost:8687/userBpmn/queryUserBpmnByUserId/${userId}`)
    response.json().then(res => res.result).then(item => {
      return Promise.all(item.map(async ({ bpmnId }) => {
        return await fetch(`http://localhost:8687/formBpmn/queryFormBpmnBybpmnId/${bpmnId}`)
      }))
      // setBpmnList(item.map(res=>res.bpmnId))  
    }).then(res => {
      return Promise.all(res.map(item => item.json()))
    }).then(res => {
      let list = []
      res.forEach(({ result }, index) => {
        list = [...list, ...result]
      })
      return list
    }).then(res => {
      setList(res)
    })
  }

  const formClick = ({ formId, bpmnId }) => {
    setFormId(formId)
    setBpmnId(bpmnId)
  }
  return <>
    <div className="get-msg">
      {list.map((item, index) => {
        console.log("get-msg", item)
        return <div key={index} onClick={() => formClick(item)}>{item.formId}</div>
      })}
      <ModalDiv formId={formId} bpmnId={bpmnId} />
    </div>
  </>
}
const UserViews = () => {
  const [userList, setUserList] = useState([])
  const cData = useContext(PContext);
  const initUserList = async () => {
    const response = await fetch('http://localhost:8687/user/queryAllUser')
    response.json().then(res => res.result).then(item => {
      setUserList(item)
    })
  }
  useEffect(() => {
    initUserList()
  }, [])

  return <div className="user-views">
    {userList.map(item => {
      return <div className="user-view" key={item.userId}>
        <div className="user-view-title">
          {item.userName}
        </div>
        <div className="user-view-main">
          <GetMsg userId={item.userId} />
          {/* {msg(item.id).map(({ resPath, formMsg, index }, i) => {
            return <div className="user-view-main-item" key={i} onClick={() => cData.changeView(formMsg.flowId)}>
              <div>{formMsg.formId}</div>
              <div className="user-view-main-item-operate"><div onClick={() => agree({ resPath, formMsg, index })}>同意</div><div>退回</div></div>
            </div>
          })} */}
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

  const changeView = (state) => { 
  }


  const init = async () => {
    changeView()
    // let response = await fetch(`http://localhost:8787/bpmn/queryBpmnFileMsg`, {
    //   method: 'GET'
    // }); 
    initFlowPath()
  }

  const initFlowPath = async () => { 
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

  return <PContext.Provider value={{ bpmnView, changeView, saveMap }} >
    <div className="bpmn-view">
      <div className="bpmn-view-form">
        <FormView></FormView>
      </div>
      <div className="bpmn-view-flow">
        <UserViews></UserViews>
      </div>
      {/* {bpmnView && <>
        {bpmnXml && <BpmnViewer xml={bpmnXml} map={bpmnView}></BpmnViewer>}
      </>} */}
      <Bpmn />
    </div>
  </PContext.Provider>
}

export default BpmnView