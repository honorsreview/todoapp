const { app, BrowserWindow, Tray } = require("electron");
const path = require("path");
let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 520,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new Tray(iconPath, mainWindow);
  let bounds = tray.getBounds();
  mainWindow.setPosition(
    bounds.x - Math.round(mainWindow.getBounds().width / 2) - 160,
    bounds.y - mainWindow.getBounds().height - 10
  );
  tray.on("click", (event, bounds) => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
});
