const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcR", {
  ipcRendererT: (data) => {
    ipcRenderer.send("ipcRenderer-t", data);
  },
  ipcMaximize: () => {
    ipcRenderer.send("ipc-maximize");
  },
  ipcUnmaximize: () => {
    ipcRenderer.send("ipc-unmaximize");
  },
  ipcMinimize: () => {
    ipcRenderer.send("ipc-minimize");
  },
  ipcClose: () => {
    ipcRenderer.send("ipc-close");
  },
  ipcIsMaximized: () => ipcRenderer.invoke("ipc-isMaximized"),
});

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 除函数之外，我们也可以暴露变量
});
