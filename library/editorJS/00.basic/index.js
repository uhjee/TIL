// import EditorJS from "@editorjs/editorjs";
// import List from "@editorjs/list";

const editor = new EditorJS({
  // 달라붙을 엘레먼트의 ID -> Editor.js의 Root
  holder: "editorjs",

  // 렌더링될 이전에 저장된 데이터
  data: {},

  // onReady callBack
  // 여기서 데이터 불러오면 되려나..
  onReady: () => {
    console.log("Editor.js is ready to work! onReady");
  },

  // onChange callBack
  onChange: () => {
    console.log("Now I know that Editor's content changed!");
  },

  autofocus: true,

  placeholder: "Let`s write an awesome 스토리",

  // 로그 레벨 설정
  logLevel: "INFO", // VERBOSE, INFO, WARN, ERROR

  // 읽기 전용
  // readOnly: true,

  // Inline Toolbar order
  inlineToolbar: ["link", "marker", "bold", "italic"],

  tools: {
    // 더 멋진 tool들은 여기서 찾자
    // https://github.com/editor-js/awesome-editorjs

    // 헤더 설정
    header: {
      class: Header,
      config: {
        placeholder: "Enter a header",
        levels: [2, 3, 4],
        defaultLevel: 3,
      },

      //아래 inlineToolbar 에 대한 설정
      inlineToolbar: ["marker", "link"],
      shortcut: "CMD+SHIFT+H",
    },

    // 리스트 설정
    list: {
      class: List,
      inlineToolbar: true,
    },

    // embed links 설정
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: "http://localhost:8080/", // 내 백엔드 엔드포인트 url 데이터를 보낼 곳
      },

      // embed 설정: 단어별 하이퍼링크인듯...
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true,
          },
        },
      },
    },
  },
});

// EditorJS Obj가 만들어진 후, 초기화할 수 있는 메소드 - Promise 객체 사용 (await-async 사용 가능)
editor.isReady
  .then(() => {
    console.log("Editor.js is ready to Work!!!!");
  })
  .catch((reason) => {
    console.log(`Editor.js is initialization failed because of ${reason}`);
  });

// 위의 onReady()
// async function 안에서 사용하라고 하는데 ???
// try {
//   await editor.isReady;
//   console.log("is ready?");
// } catch (reason) {
//   console.log(`Editor.js is initialization failed because of ${reason}`);
// }
