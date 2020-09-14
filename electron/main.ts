import { app, BrowserWindow, nativeImage } from 'electron';
import * as path from 'path';
import * as url from 'url';
let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  mainWindow = new BrowserWindow({
    icon,
    width: 1000,
    height: 600,
    backgroundColor: '#1e1f29',
    frame: process.platform === 'darwin',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    title: 'NoteList',
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
