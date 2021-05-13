const editor = new EditorJS({
  holder: "editorjs",
  data: {},
  autofocus: true,

  tools: {
    header: Headers,
    // Block의 type 이름은 설정한 대로 출력
    lililist: List,
    image: SimpleImage,
  },

  onReady: () => {
    console.log("Editor.js is ready to work! onReady");
  },
});

function saveData() {
  editor
    // EditorJS 객체는  save() 메소드를 갖고 있다.
    .save()
    .then((outputData) => {
      console.log("article Data: ", outputData);
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
}
