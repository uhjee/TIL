const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

/**
 * electron setting
 */

function createWindow() {
  const win = new BrowserWindow({
    width: 1920 * 0.7,
    height: 1080 * 0.7,

    webPreferences: {
      enableRemoteModule: true,
      // preload 기능 활성화 - react app 과 electron 간의 ipc 통신하도록 설정
      preload: __dirname + '/preload.js',
    },
  });

  /*
   * ELECTRON_START_URL을 직접 제공할경우 해당 URL을 로드합니다.
   * 만일 URL을 따로 지정하지 않을경우 (프로덕션빌드) React 앱이
   * 빌드되는 build 폴더의 index.html 파일을 로드합니다.
   * */
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file',
      slashes: true,
    });

  win.loadURL(startUrl);

  win.webContents.openDevTools(); // 개발자 도구 활성화
}

app.on('ready', createWindow);
