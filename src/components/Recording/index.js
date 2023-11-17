import "./index.scss"
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input, Modal } from 'antd';



const Recording = () => {
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [mediaRecorderState, setMediaRecorderState] = useState(0)
    const [audioBlob, setAudioBlob] = useState(null)
    const [open, setOpen] = useState(false)
    const [audioSrc, setAudioSrc] = useState(null)
    const [fileName, setFileName] = useState("")

    useEffect(() => {
        initAudio()
    }, [])

    const initAudio = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream) => {
            // 创建 MediaRecorder 实例  
            setMediaRecorder(new MediaRecorder(stream))
        }).catch(function (error) {
            console.error('获取用户媒体许可失败', error);
        });
    }

    const suspendLabel = useMemo(() => {
        return mediaRecorderState ? "继续" : "暂停"
    }, [mediaRecorderState])

    const start = () => {
        if (mediaRecorder.state == "recording") return
        mediaRecorder.start();
    }
    const suspend = () => {
        if (mediaRecorderState) {
            mediaRecorder.resume();
            setMediaRecorderState(0)
        } else {
            mediaRecorder.pause();
            setMediaRecorderState(1)
        }
    }
    const end = () => {
        mediaRecorder.stop();
        mediaRecorder.addEventListener('dataavailable', (event) => {
            setAudioBlob(event.data)
            setAudioSrc(URL.createObjectURL(event.data))
        })
    }

    const download = () => {
        if (fileName == "") return
        let file = new File([audioBlob], `${fileName}.mp3`, { type: audioBlob.type })
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${fileName}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    const upload = () => {

    }

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className="recording">
            <Button disabled={!mediaRecorder} type="primary" onClick={start}>开始</Button>
            <Button disabled={!mediaRecorder} type="primary" onClick={suspend}>{suspendLabel}</Button>
            <Button disabled={!mediaRecorder} type="primary" onClick={end}>结束</Button>
            {audioBlob && <Button type="primary" onClick={showModal} >录音文件</Button>}
            <Modal
                destroyOnClose
                open={open}
                title="录音文件"
                onCancel={handleCancel}
                footer={(_, { CancelBtn }) => {
                    return (
                        <>
                            <Button type="primary" onClick={upload}>上传</Button>
                            <Button type="primary" onClick={download}>下载</Button>
                            <CancelBtn />
                        </>
                    )
                }}
            >
                <div><audio src={audioSrc} type="audio/mpeg" controls></audio></div>
                <div>文件名称：<Input placeholder="请输入文件名称" value={fileName} onInput={(e) => setFileName(e.target.value)} /></div>

            </Modal>
        </div>
    )
}


export default Recording