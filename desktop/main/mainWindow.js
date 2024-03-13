const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";
let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1160,
    height: 752,
    minHeight: 632,
    minWidth: 960,
    show: false,
    frame: false,
    title: "Electron",
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, "../src/preload.js"),
    },
    // icon: path.resolve(__dirname, '../assets/logo.png')
  });
  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:3002/");
  } else {
    const entryPath = path.resolve(__dirname, "../../dist/index.html");
    mainWindow.loadFile(entryPath);
  }

  // 打开开发者工具栏，默认不打开
  mainWindow.webContents.openDevTools();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

module.exports = { createMainWindow };
