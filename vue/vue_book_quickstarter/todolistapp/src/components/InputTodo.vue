<template>
  <div>
    <input
      type="text"
      class="input"
      id="task"
      v-model.trim="todo"
      placeholder="입력 후 엔터!"
      @keyup.enter="addTodo"
    />
    <span class="addbutton" @click="addTodo">추 가</span>
  </div>
</template>

<script>
// import 와 export 는 모두 상대경로로 작성
import eventBus from "./EventBus.vue";

export default {
  // 태그명은 반드시 케밥 케이스
  name: "input-todo",
  data: function () {
    return { todo: "" };
  },
  methods: {
    addTodo: function () {
      eventBus.$emit("add-todo", this.todo);
      this.todo = "";
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.input {
  border: none;
  width: 75%;
  height: 35px;
  padding: 10px;
  float: left;
  font-size: 16px;
}
.addbutton {
  padding: 10px;
  width: 25%;
  height: 35px;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  transition: 0.3s;
}
.addbutton:hover {
  background-color: #bbb;
}
</style>