import "./index.scss"
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate
} from "tiny-svg";
import { query as domQuery } from "min-dom";

const DataPanelViewer = (props) => {
    const { modeler, map } = props
    const [flag, setFlag] = useState(true)
    const [selectedElements, setSelectedElements] = useState([])
    const [element, setElement] = useState(null)

    const mapState = useMemo(() => {
        let o = {}
        console.log("map", map)
        map && map.forEach(item => {
            const { id } = item
            o[id] = item
        })
        return o
    }, [map])
    const initArrow = (id) => {
        const marker = svgCreate("marker");
        svgAttr(marker, {
            id,
            viewBox: "0 0 20 20",
            refX: "11",
            refY: "10",
            markerWidth: "10",
            markerHeight: "10",
            orient: "auto"
        });
        const path = svgCreate("path");
        svgAttr(path, {
            d: "M 1 5 L 11 10 L 1 15 Z",
            style:
                " stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; "
        });
        const defs = domQuery("defs");
        svgAppend(marker, path);
        svgAppend(defs, marker);
    }
    const colorStr = useCallback((id) => {
        let res = ""
        switch (mapState[id]?.state) {
            case 0: res = "state-Incomplete"
                break;
            case 1: res = "state-complete"
                break;
            case 2: res = "state-carry-out"
                break;
            case 3: res = "state-finish"
                break;
            default: res = ""
                break;
        }
        return res
    }, [map])

    useEffect(() => {
        modeler.on("import.render.complete", () => {
            ['complete', 'carry-out', 'Incomplete', 'finish'].forEach(item => {
                initArrow('sequenceflow-arrow-state-' + item)
            });
            const overlays = modeler.get('overlays')
            const canvas = modeler.get("canvas")
            const rootElement = canvas.getRootElement()
            rootElement.children.forEach((item, index) => {
                const { id, type } = item
                colorStr(id) && canvas.addMarker(item, colorStr(id));
                if (type == "bpmn:UserTask" && mapState[id]) {
                    console.log("bpmn:UserTask123123", mapState[id])
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