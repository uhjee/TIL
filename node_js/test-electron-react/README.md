# react-electron-app 테스트

## 프로젝트 생성

```sh
yarn create react-app --template typescript react-electron-app
```

```sh
yarn add -D electron electron-builder
```

```sh
yarn add -D concurrently wait-on
```

- concurrently

  - script에서 동시에 여러 명령을 실행할 수 있도록 도와주는 라이브러리

    ex) concurrently "command1 arg" "command2 arg"

- wait-on

  - 특정 스크립트 전에 다른 dev-server가 먼저 올라가도록 기다리게 하는 라이브러리

    ex) wait-on [link]



// package.json

아래 설정 추가

```json
{
  "main": "public/Main.js",
  "homepage": "./"
}
```

// package.json > scripts

```json
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "react-start": "yarn start",
     // wait-on 라이브러리를 사용해 3000번 포트가 활성화될 때까지 대기
    "electron-start": "wait-on http://localhost:3000 && set ELECTRON_START_URL=http://localhost:3000 && electron .",
    "electron-pack": "yarn build && electron-builder build -c.extraMetadata.main=build/Main.js",
     // 동시에 실행하도록 concurrently 라이브러리 사용
    "start:dev": "concurrently \"yarn start\" \"yarn electron-start\""
  },
```



### 브라우저 open 막기

// .env

```plain
BROWSER=none
```

### React App에서 Electron API 사용하기 - preload

Eelectron과 React는 별개의 환경과 thread에서 동작한다.

따라서 Electron API 사용 여부를 React App에 알려줘 React App 과 Electron 간의 ipc 통신을 하도록 설정해야 한다.

// public/preload.js

```js
window.ipcRenderer = require('electron').ipcRenderer;
```

// public/electron.js

```js
let win = new BrowserWindow({
    // ...
    webPreferences: {
        enableRemoteModule: true,
        preload: __dirname + '/preload.js'
    }
})
```





### ### 참고

- [Electron 에 React 적용해 보기
  ](https://pks2974.medium.com/electron-%EC%97%90-react-%EC%A0%81%EC%9A%A9%ED%95%B4-%EB%B3%B4%EA%B8%B0-ebcea2bbbd27)

- [[React 와 ElectronJS 로 데스크톱 앱 만들어보기] 프로젝트 세팅하기](https://blog.codefactory.ai/electron/create-desktop-app-with-react-and-electron/1-project-setting/)



