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
import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import { TodoType } from '@/types/TodoType';
import { makeTodoList } from '@/utils/TodoList';
import { find } from 'lodash';
import ItemBox from './ItemBox.vue';

export default defineComponent({
  name: 'List',
  components: {
    ItemBox,
  },
  setup() {
    const todoArr: Ref<TodoType[]> = ref([]);

    const loadData = (): void => {
      todoArr.value = makeTodoList(10);
    };

    const appendData = (): void => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        const copiedTodoArr = [...todoArr.value];
        const newTodoArr = makeTodoList(10);

        todoArr.value = copiedTodoArr.concat(newTodoArr);
      }
    };

    const changeDoneFlag = (todo: TodoType) => {
      const foundTodo = find(todoArr.value, { id: todo.id }) as TodoType;
      foundTodo.isDone = !foundTodo?.isDone;
    };

    onMounted(() => {
      loadData();
      window.addEventListener('scroll', appendData);
    });

    return {
      todoArr,
      loadData,
      appendData,
      changeDoneFlag,
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  padding: 15px;
  width: 100%;
}
</style>
