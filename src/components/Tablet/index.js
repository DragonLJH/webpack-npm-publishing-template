import "./index.scss"
import React, { useEffect, useRef, useState } from 'react';



const Tablet = () => {
    const canvasRef = useRef(null)
    const [ctx, setCtx] = useState(null)
    const [arr, setArr] = useState([])
    const [canvasPosition, setCanvasPosition] = useState(null)
    const [initWH, setInitWH] = useState({
        width: 0,
        height: 0
    })
    useEffect(() => {
        const { x, y, width, height } = canvasRef.current.getBoundingClientRect()
        setInitWH({ ...initWH, width, height })
        setCanvasPosition({ x: x.toFixed(2), y: y.toFixed(2) })
        setCtx(canvasRef.current.getContext("2d"))
    }, [canvasRef.current])


    const onStart = (e) => {
        const { clientX, clientY } = e.touches[0]
        console.log("onStart", { clientX, clientY })
        setArr([...arr, {
            x: clientX.toFixed(2) - canvasPosition.x,
            y: clientY.toFixed(2) - canvasPosition.y,
        }])
    }
    const onMove = (e) => {
        const { clientX, clientY } = e.touches[0]
        console.log("onMove", { clientX, clientY })
        setArr([...arr, {
            x: clientX.toFixed(2) - canvasPosition.x,
            y: clientY.toFixed(2) - canvasPosition.y,
        }])
    }
    const onEnd = (e) => {
        const { clientX, clientY } = e.changedTouches[0]
        const executeArr = [...arr, {
            x: clientX.toFixed(2) - canvasPosition.x,
            y: clientY.toFixed(2) - canvasPosition.y,
        }]
        ctx.beginPath();
        executeArr.forEach(({
            x,
            y
        }, index) => {
            index || ctx.moveTo(x, y);
            index && ctx.lineTo(x, y);
        })
        ctx.stroke();
        setArr([])
    }


    return (
        <div className="tablet">
            <div className="tablet-canvas">
                <canvas ref={canvasRef} width={initWH.width} height={initWH.height} onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}></canvas>
            </div>
            <div className="tablet-operate">

            </div>
        </div>
    )
}


export default Tablet