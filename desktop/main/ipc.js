const { createwin, URL } = require("./mainWindow");
const { app, ipcMain, dialog } = require("electron");
const fs = require("fs");
const ipcFun = (win, winList) => {
  ipcMain.on("ipc-maximize", (_, routePath) => {
    winList.get(routePath).maximize();
  });
  ipcMain.on("ipc-unmaximize", (_, routePath) => {
    winList.get(routePath).unmaximize();
  });
  ipcMain.on("ipc-minimize", (_, routePath) => {
    winList.get(routePath).minimize();
  });
  ipcMain.on("ipc-close", (_, routePath) => {
    winList.get(routePath).close();
  });
  ipcMain.handle("ipc-isMaximized", (_, routePath) =>
    winList.get(routePath).isMaximized()
  );
  ipcMain.handle("ipc-dialogOpen", (_, { properties, filters }) => {
    console.log("ipcMain-dialogOpen", { properties, filters });
    return new Promise((resolve, reject) => {
      dialog
        .showOpenDialog(win, {
          properties,
          filters,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error("dialogOpen：", err);
        });
    });
  });
  ipcMain.handle("ipc-readFile", (_, path) => fs.readFileSync(path));
  ipcMain.handle("ipc-appPath", (_) => app.getAppPath());
  ipcMain.on("ipc-createwin", (_, { routeOp, routePath }) => {
    winList.set(
      routePath,
      createwin({ routeOp, parent: winList.get("Home") }, `${URL}#${routePath}`)
    );
  });
  ipcMain.handle("ipc-getWin", (_, routePath) => routePath);
};

module.exports = { ipcFun };
