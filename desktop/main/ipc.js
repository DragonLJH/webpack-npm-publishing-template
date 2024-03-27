const { ipcMain } = require("electron");
const ipcFun = (win) => {
  ipcMain.on("ipcRenderer-t", (e, data) => {
    console.log("ipcRenderer-t", data);
  });
  ipcMain.on("ipc-maximize", () => {
    win.maximize();
  });
  ipcMain.on("ipc-unmaximize", () => {
    win.unmaximize();
  });
  ipcMain.on("ipc-minimize", () => {
    win.minimize();
  });
  ipcMain.on("ipc-close", () => {
    win.close();
  });
  ipcMain.handle("ipc-isMaximized", () => win.isMaximized());
};

module.exports = { ipcFun };
