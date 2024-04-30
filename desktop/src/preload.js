const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcR", {
  ipcMaximize: (routePath) => {
    ipcRenderer.send("ipc-maximize", routePath);
  },
  ipcUnmaximize: (routePath) => {
    ipcRenderer.send("ipc-unmaximize", routePath);
  },
  ipcMinimize: (routePath) => {
    ipcRenderer.send("ipc-minimize", routePath);
  },
  ipcClose: (routePath) => {
    ipcRenderer.send("ipc-close", routePath);
  },
  ipcIsMaximized: (routePath) =>
    ipcRenderer.invoke("ipc-isMaximized", routePath),
  ipcDialogOpen: (data) => ipcRenderer.invoke("ipc-dialogOpen", data),
  ipcReadFile: (path) => ipcRenderer.invoke("ipc-readFile", path),
  ipcAppPath: () => ipcRenderer.invoke("ipc-appPath"),
  ipcCreatewin: ({ routeOp, routePath }) =>
    ipcRenderer.send("ipc-createwin", { routeOp, routePath }),
  ipcGetWin: (routePath) => ipcRenderer.invoke("ipc-getWin", routePath),
});

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 除函数之外，我们也可以暴露变量
});
