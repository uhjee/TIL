const editor = new EditorJS({
  holderId: "editorjs",

  tools: {
    header: {
      class: Header,
      shortcut: "CMD+SHIFT+H",
      config: {
        placeholder: "제목을 쓰세요!",
        levels: [2, 3, 4],
        defaultLevel: 3,
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
  },

  data: {},
  onReady: () => {
    console.log("준비가 됐어요!");
  },
  onChange: () => {
    console.log("con");
  },
  autofocus: true,
  placeholder: "Write your dream:D",
});

editor.isReady
  .then(() => {
    console.log("준비가 됐다구요!");
  })
  .catch((e) => {
    console.log(e);
  });
