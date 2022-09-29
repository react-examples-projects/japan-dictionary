const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const LOCAL_PATH_APP = path.join(__dirname, "../build/index.html");
const URL_APP = isDev ? "http://localhost:3000/" : `file://${LOCAL_PATH_APP}`;

require("@electron/remote/main").initialize();

function createWindow() {
  const window = new BrowserWindow({
    title: "Diccionario Japonés",
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    resizable: true,
    maximizable: true,
    center: true,
    //autoHideMenuBar: true,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  window.loadURL(URL_APP);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
