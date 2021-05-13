<template>
  <ul id="todolist">
    <li
      v-for="(item, index) in todolist"
      :class="checked(item.done)"
      :key="index"
      @click="doneToggle(index)"
    >
      <span>{{item.todo}}</span>
      <span v-if="item.done">(완료)</span>
      <span class="close" @click.stop="deleteTodo(index)">&#x00D7;</span>
    </li>
  </ul>
</template>

<script>
import eventBus from "./EventBus.vue";
export default {
  created: function () {
    eventBus.$on("add-todo", this.addTodo);
  },
  data() {
    return {
      todolist: [
        { todo: "영화보기", done: false },
        { todo: "주말 산책", done: true },
        { todo: "ES6 학습", done: false },
        { todo: "모니터 캘리", done: false },
      ],
    };
  },
  methods: {
    checked: function (done) {
      if (done) {
        return { checked: true };
      } else {
        return { checked: false };
      }
    },
    addTodo: function (todo) {
      if (todo != "") {
        this.todolist.push({ todo: todo, done: false });
      }
    },
    doneToggle: function (index) {
      this.todolist[index].done = !this.todolist[index].done;
    },
    deleteTodo: function (index) {
      this.todolist.splice(index, 1);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
ul {
  margin: 0;
  padding: 0;
}
ul li {
  cursor: pointer;
  position: relative;
  padding: 8px 8px 8px 40px;
  background: #eee;
  font-size: 14px;
  transition: 0.2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
ul li:hover {
  background: #ddd;
}
ul li.checked {
  background: #bbb;
  color: #fff;
  text-decoration: line-through;
}
ul li.checked::before {
  content: "";
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0px 1px 1px 0px;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 8px;
  width: 8px;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px 12px 8px 12px;
}
.close:hover {
  background-color: #f44336;
  color: white;
}
</style>