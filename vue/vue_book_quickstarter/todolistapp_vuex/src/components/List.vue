<template>
  <ul id="todolist">
    <li
      v-for="(item, index) in todolist"
      :class="checked(item.done)"
      :key="index"
      @click="doneToggle({ index: index })"
    >
      <span>{{ item.todo }}</span>
      <span v-if="item.done">(완료)</span>
      <span class="close" @click.stop="deleteTodo({ index: index })"
        >&#x00D7;</span
      >
    </li>
  </ul>
</template>

<script>
// import eventBus from "./EventBus.vue";
import Constant from "../constant";

// 변이를 직접 commit하지 않기 위한 헬퍼 메소드사용
import { mapState, mapMutations, mapActions } from "vuex";
import _ from "lodash";

export default {
  // methods: {
  //   checked: function (done) {
  //     if (done) {
  //       return { checked: true };
  //     } else {
  //       return { checked: false };
  //     }
  //   },
  //   addTodo: function (todo) {
  //     if (todo != "") {
  //       this.todolist.push({ todo: todo, done: false });
  //     }
  //   },
  //   doneToggle: function (index) {
  //     // 화면에서 일어나는 이벤트를 받아 처리하는 메서드에서 변이를 일으키기 위해 commit() 호출, payload는 변이를 위해 전달할 데이터
  //     this.$store.commit(Constant.DONE_TOGGLE, { index: index });
  //   },
  //   deleteTodo: function (index) {
  //     // this.todolist.splice(index, 1);
  //     this.$store.commit(Constant.DELETE_TODO, { index: index });
  //   },
  // },
  // computed: {
  //   todolist() {
  //     return this.$store.state.todolist;
  //   },
  // },

  // 헬퍼메소드 사용----------------------------------------------------
  // mapState() :: todolist의 상태 데이터를 List.vue 컴포넌트의 computed에 자동으로 바인딩 - 배열값에 상태의 이름 나열
  // 저장소의 상태 이름과 동일한 이름으로 바인딩 .. getter 느낌
  // computed: mapState(["todolist"]),

  // 저장소의 상태 이름과 다른 이름 으로 하려면 아래와 같이 ..
  computed: mapState({ todolist: (state) => state.todolist }),

  // 변이를 일으키지 않는 메소드와 변이를 일으키는 메소드를 병합.. lodash의 _.extend () 사용
  methods: _.extend(
    {
      // 변이를 일으키지 않는 메소드(store의 상태에 영향을 주지 않는 메소드)
      checked(done) {
        if (done) return { checked: true };
        else return { checked: false };
      },
    },
    // 메소드와 동일한 이름의 액션 호출.. helper 메소드 사용
    mapActions([Constant.DELETE_TODO, Constant.DONE_TOGGLE])
  ),
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
