import "./index.scss"
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { getID } from '../../../utils/index'

import React, { Component, useEffect, useMemo, useState } from 'react';

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
                {element.type == "bpmn:UserTask" && <fieldset>
                    <label>userId</label>
                    <input value={element.businessObject.$attrs["userId"] || ""} onChange={(event) => { updateAttr("userId", event.target.value) }} />
                </fieldset>}
            </div>

        }</>
    );
}

