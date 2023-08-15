<template>
  <div>
    <input v-model="titleText" type="text">
    <input v-model="descriptionText" type="text">
    <button @click="addTodo">추가</button>
  </div>
</template>

<script>
export default {
  name: 'TodoInputForm',
  data() {
    return {
      titleText: '',
      descriptionText: ''
    }
  },
  computed: {
    nextId() {
      return this.$store.getters.nextId;
    }
  },
  methods: {
    addTodo() {
      this.$store.dispatch('addTodo', {
        id: this.nextId,
        title: this.titleText,
        description: this.descriptionText,
        isDone: false,
      });
      this.initData();
      this.$router.push('/todos')
    },
    initData() {
      this.titleText = '';
      this.descriptionText = '';
    }
  }
}
</script>
