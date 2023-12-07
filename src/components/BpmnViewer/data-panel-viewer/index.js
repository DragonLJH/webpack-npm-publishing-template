import "./index.scss"
import React, { useEffect, useState } from 'react';


const DataPanelViewer = (props) => {
    const { modeler, map } = props
    const [flag, setFlag] = useState(true)
    const [selectedElements, setSelectedElements] = useState([])
    const [element, setElement] = useState(null)

    useEffect(() => {
        console.log("eventBus", map)
        modeler.on("import.render.complete", () => {
            const overlays = modeler.get('overlays')
            const canvas = modeler.get("canvas")
            const rootElement = canvas.getRootElement()
            rootElement.children.forEach((item, index) => {
                const { id, type } = item
                // canvas.addMarker(item, 'state-carry-out');
                if (type !== "bpmn:SequenceFlow") {
                    // overlays.add(item, 'note', {
                    //     position: {
                    //         bottom: -5,
                    //         right: -5
                    //     },
                    //     html: `<div>${index}</div>`
                    // });
                }

            })
        })
        modeler.on('selection.changed', (e) => {
            console.log("hook-selection.changed", e)
            setSelectedElements(e.newSelection)
            setElement(e.newSelection[0])
        });

        modeler.on('element.changed', (e) => {
            console.log("hook-element.changed", e)
            const currentElement = e.element;
            if (!element) return;
            // update panel, if currently selected element changed
            currentElement.id === element.id && setElement(currentElement)
        });
    }, [])
    useEffect(() => {
        const rootElement = modeler.get("canvas").getRootElement()
        if (rootElement.type == "bpmn:Process" && !element) {
            setElement(rootElement)
        }
    })

    return <div className="data-panel-viewer">
        {element && element.id}
    </div>
}

export default DataPanelViewer