<template>
  <div class="box">
    <item-box
      @changeDoneFlag="changeDoneFlag"
      :todo="todo"
      v-for="(todo, i) in todoArr"
      :key="`${todo}${i}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TodoType } from '@/types/TodoType';
import { makeTodoList } from '@/utils/TodoList';
import { find } from 'lodash';
import ItemBox from './ItemBox.vue';

export default defineComponent({
  name: 'List',
  components: {
    ItemBox,
  },
  data() {
    return {
      todoArr: [] as TodoType[],
      win: window,
      doc: document.documentElement,
    };
  },
  mounted() {
    this.loadData();
    window.addEventListener('scroll', this.appendData);
  },
  methods: {
    loadData() {
      this.todoArr = makeTodoList(10);
    },
    appendData(): void {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        const todoArr = [...this.todoArr];
        const newTodoArr = makeTodoList(10);

        this.todoArr = todoArr.concat(newTodoArr);
      }
    },
    changeDoneFlag(todo: TodoType): void {
      const foundTodo = find(this.todoArr, { id: todo.id }) as TodoType;
      foundTodo.isDone = !foundTodo?.isDone;
    },
  },
});
</script>

<style scoped lang="scss">
.box {
  padding: 15px;
  width: 100%;
}
</style>
