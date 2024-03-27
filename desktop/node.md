### 进程间通信
`ipcMain.on` 主进程事件监听
    
    ipcMain.on('xxx', (e, data) => {
        console.log("xxx", data);
    })
`ipcMain.handle` 监听事件，返回值将作为一个 Promise 返回到最初的 invoke 调用

    ipcMain.handle('xxxx', () => win.isMinimized())

preload.js`contextBridge`暴露
调用 `ipcRenderer.send` 渲染器进程触发主进程事件(单向)
调用 `ipcRenderer.invoke` 渲染器进程获取主进程信息(双向)

    
    contextBridge.exposeInMainWorld('xxx',{
        xxx: (data) => ipcRenderer.send('xxx', data),
        xxxx: () => ipcRenderer.invoke('xxxx')
    })

渲染器进程中使用 window.electronAPI.xxx() 函数 触发主进程事件
