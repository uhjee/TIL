<template>
  <div id="todolistapp">
    <div id="header" class="header">
      <h2>todo list App</h2>
      <!-- 단일 파일 컴포넌트의 name 속성 -->
      <input-todo></input-todo>
    </div>
    <list></list>
  </div>
</template>

<script>
// 사용할 단일 파일 컴포넌트 임포트
import InputTodo from "./InputTodo.vue";
import List from "./List.vue";
export default {
  name: "todo-list",
  //   components 속성으로 등록
  components: { InputTodo, List },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.header {
  background-color: rgb(32, 40, 112);
  padding: 30px 30px;
  color: white;
  text-align: center;
}
.header:after {
  content: "";
  display: table;
  clear: both;
}
</style>