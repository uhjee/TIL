<template>
  <div>

    <ul>
      <TodoItem v-for="todo of todos" :key="todo.id" :todo="todo"/>
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  }

}
</script>
