<template>
  <li :class="['todo-item', todo.isDone ? 'done': '']">
    <span @click="routeToDetail(todo.id)">
      <span>
        제목: {{ todo.title }}
      </span>
      /
      <span>
        내용: {{ todo.description }}
      </span>
    </span>
    <button @click="changeDone(todo.id)">완료하기</button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      default: () => ({
        title: '빈값',
        description: '빈값',
      })
    }
  },
  methods: {
    changeDone(id) {
      this.$store.dispatch('changeDone', id);
    },
    routeToDetail(id) {
      this.$router.push(`/todo/${id}`)
    }
  }
}
</script>

<style>
.todo-item {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
}
</style>
