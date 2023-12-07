import React, { useRef, useState, useEffect } from "react";
import "./index.scss";
import DataPanelViewer from './data-panel-viewer/index';
import ViewerModeler from 'bpmn-js';
import exampleXML from './testDiagram.bpmn';

const BpmnViewer = (props) => {
    const { xml, map } = props
    const bpmnViewerCanvas = useRef(null)
    const [bpmnViewerModeler, setBpmnViewerModeler] = useState(null)

    useEffect(() => {
        setBpmnViewerModeler(new ViewerModeler({
            container: bpmnViewerCanvas.current,
            additionalModules: [
            ],
            moddleExtensions: {
            }
        }))
    }, [])
    useEffect(() => {
        bpmnViewerModeler && xml && bpmnViewerModeler.importXML(xml).then(function (result) {
            const { warnings } = result;
            console.log('success !', warnings);
        }).catch(function (err) {
            const { warnings, message } = err;
            console.log('something went wrong:', warnings, message);
        });
        // bpmnViewerModeler && console.log("bpmnViewerModeler", bpmnViewerModeler)
    }, [bpmnViewerModeler, xml])
    return <div className="bpmn-viewer">
        <div className='bpmn-viewer-canvas' ref={bpmnViewerCanvas}></div>
        {bpmnViewerModeler && <DataPanelViewer modeler={bpmnViewerModeler} map={map}></DataPanelViewer>}
    </div>
}

export default BpmnViewer
