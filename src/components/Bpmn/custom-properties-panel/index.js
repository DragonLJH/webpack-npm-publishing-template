import "./index.scss"
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { getID } from '../../../utils/index'

import React, { Component, useEffect, useMemo, useState } from 'react';
import { Button, Modal, Select } from 'antd';

export const CustomPropertiesPanelHook = (props) => {
    const { modeler } = props
    const [selectedElements, setSelectedElements] = useState([])
    const [element, setElements] = useState(null)
    const [moddle, setModdle] = useState(null)
    // const businessObject = useMemo(() => {
    //     return element && element.businessObject
    // }, [element])
    useEffect(() => {
        setModdle(modeler.get("moddle"))
        modeler.on('selection.changed', (e) => {
            console.log("hook-selection.changed", e)
            setSelectedElements(e.newSelection)
            setElements(e.newSelection[0])
        });

        modeler.on('element.changed', (e) => {
            console.log("hook-element.changed", e)
            const currentElement = e.element;
            if (!element) return;
            // update panel, if currently selected element changed
            currentElement.id === element.id && setElements(currentElement)
        });
    }, [])
    useEffect(() => {
        // console.log("businessObject", businessObject)
    })

    const saveXML = async () => {
        const { xml } = await modeler.saveXML({ format: true });
        // console.log(xml);
        console.log('saveXML', element.businessObject)
    }
    return <div>
        <div>
            {selectedElements.length === 1 && <ElementProperties modeler={modeler} element={element} />}
            {selectedElements.length === 0 && <span>Please select an element.</span>}
            {selectedElements.length > 1 && <span>Please select a single element.</span>}
        </div>
        <button onClick={saveXML}>saveXML</button>
    </div>
}



export default class CustomPropertiesPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedElements: [], element: null };
    }
    componentDidUpdate() {
        const { modeler } = this.props;
        const { element } = this.state;
        const rootElement = modeler.get("canvas").getRootElement()
        if (rootElement.type == "bpmn:Process" && !element) {
            this.setState({
                element: rootElement
            });
        }
    }
    componentDidMount() {
        const { modeler, changeCustomData } = this.props;

        ["root", "shape", "connection",].forEach(item => {
            ["added", "changed", "remove"].forEach(value => {
                modeler.on(`${item}.${value}`, (e) => {
                    const { element } = e
                    const { businessObject, incoming, outgoing } = element
                    if (businessObject) {
                        const { $attrs: attrs, $type: type, id, sourceRef, targetRef, eventDefinitions, ...data } = element.businessObject
                        changeCustomData({ attrs, type, id, outgoing, targetRef, ...data }, value)
                    }
                });
            })
        });
        modeler.on('selection.changed', (e) => {
            const { element } = this.state;
            this.setState({
                selectedElements: e.newSelection,
                element: e.newSelection[0]
            });
        });
        modeler.on('element.changed', (e) => {
            const { element } = e;
            const { element: currentElement } = this.state;
            if (!currentElement) return;
            // update panel, if currently selected element changed
            if (element.id === currentElement.id) this.setState({
                element
            });
        });
    }
    async saveXML() {
        const { modeler } = this.props;
        const { xml } = await modeler.saveXML({ format: true });
        console.log(xml);
    }
    getBpmnData() {
        console.log(this.props.customData)
    }

    render() {
        const { modeler } = this.props;
        const { selectedElements, element } = this.state;

        return (
            <div className='custom-properties-panel'>
                <div>
                    {selectedElements.length > 1 ? <span>Please select a single element.</span> :
                        <ElementProperties modeler={modeler} element={element} />
                    }
                </div>
                <button onClick={() => this.saveXML()}>saveXML</button>
                <button onClick={() => this.getBpmnData()}>getBpmnData</button>
            </div>
        );
    }

}


const ElementProperties = (props) => {
    let { element, modeler } = props;
    if (element && element.labelTarget) {
        element = element.labelTarget;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        element && console.log("ElementProperties", element)
    })

    function updateName(name) {
        const modeling = modeler.get('modeling');
        modeling.updateProperties(element, { name });
    }



    function updateAttr(key, value) {
        const o = {}
        o[key] = value
        const modeling = modeler.get('modeling');
        modeling.updateProperties(element, { ...o });
    }

    return (
        <>{element &&
            <div className="element-properties" key={element.id}>
                <fieldset>
                    <label>节点id</label>
                    <input disabled value={element.id} />
                </fieldset>
                <fieldset>
                    <label>节点名称</label>
                    <input value={element.businessObject.name || ""} onChange={(event) => { updateName(event.target.value) }} />
                </fieldset>
                {element.type == "bpmn:SequenceFlow" && element.source.type == "bpmn:ExclusiveGateway" && <fieldset>
                    <label>条件</label>
                    <input value={element.businessObject.$attrs["conditionId"] || ""} onChange={(event) => { updateAttr("conditionId", event.target.value) }} />
                </fieldset>}
                {element.type == "bpmn:UserTask" && (<><HandlingRules callback={(data) => {
                    Object.entries(data).forEach(([k, v]) => {
                        updateAttr(k, v)
                    })
                }} /> </>)}
            </div >

        }</>
    );
}



const HandlingRules = (props) => {
    const defaultRules = {
        mode: "",
        peopleStr: undefined,
        peopleList: [],
    }
    const { callback } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rules, setRules] = useState({ ...defaultRules });
    const pOptions = [{ "user": "User_xFdVTAXA", "id": 10 },
    { "user": "User_DLt4WRqI", "id": 1 },
    { "user": "User_g8TwB329", "id": 2 },
    { "user": "User_h38JU6r8", "id": 3 },
    { "user": "User_PkAgPGAW", "id": 4 },
    { "user": "User_RVWBNEU3", "id": 5 },
    { "user": "User_T2FVwMbA", "id": 6 },
    { "user": "User_VpdJgMiw", "id": 7 },
    { "user": "User_S3AEs2jD", "id": 8 },
    { "user": "User_R3J5XTRQ", "id": 9 }].map(({ user, id }) => {
        return {
            label: user,
            value: id
        }
    })

    const mOptions = [
        { value: 'rules-1', label: '单人办理', },
        { value: 'rules-2', label: '多人并行', },
        { value: 'rules-3', label: '多人顺序', },
        { value: 'rules-4', label: '多人任意', }
    ]
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const { mode, peopleStr, peopleList } = rules
        console.log("handleOk", { mode, peopleStr, peopleList })
        setIsModalOpen(false);
        if (peopleList.length) callback({ mode, people: peopleList })
        else callback({ mode, people: peopleStr })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setRules({ ...defaultRules })
    };
    const handleChange = (value) => {
        console.log("{ ...rules, ...value }", { ...rules, ...value })
        setRules({ ...rules, ...value })
    };
    return (<>
        <Button type="primary" onClick={showModal}>
            办理规则
        </Button>
        <Modal title="办理规则" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
            <div>办理方式</div>
            <Select allowClear style={{ width: '100%', }} value={rules.mode}
                onChange={value => handleChange({ ...defaultRules, mode: value })}
                options={mOptions}
            />
            <div>办理人</div>
            <Select allowClear value={rules.peopleStr}
                style={{ width: '100%', display: (!rules.mode || rules.mode == 'rules-1' ? "block" : "none") }}
                onChange={value => handleChange({ peopleStr: value, peopleList: [] })} options={pOptions}
            />
            <Select mode="multiple" value={rules.peopleList}
                allowClear style={{ width: '100%', display: (rules.mode && rules.mode != 'rules-1' ? "block" : "none") }}
                onChange={value => handleChange({ peopleList: value, peopleStr: undefined })} options={pOptions}
            />
        </Modal>
    </>)
}