<template>
  <div>
    <h2>[{{todo.isDone ? '완료됨' : '해야 함'}}] {{todo.title}}</h2>
    <div>{{todo.description}}</div>
  </div>
</template>

<script>
export default {
  name: 'TodoDetail',
  data() {
    return {
      id: null,
    }
  },
  computed: {
    todo() {
      if (this.id === null) {
        return {
          title: '빈 값',
          description: '빈 값'
        };
      }
      return this.$store.state.todos.find(i => i.id === +this.id);

    }
  },
  watch: {
    $route: {
      handler(to) {
        this.id = to.params.id;
      },
      deep: true,
      immediate: true,
    }
  }
}
</script>
