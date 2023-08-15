<template>
  <div id="app">
    <button @click="changeActiveComp('TodoList')">목록</button>
    <button @click="changeActiveComp('TodoInputForm')">추가</button>
<!--    <component :is="activeComp" @move-to-list="changeActiveComp('TodoList')"></component>-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      activeComp: 'TodoList',
    }
  },
  methods: {
    changeActiveComp(nextComp) {
      // this.activeComp = nextComp;
      if(nextComp === 'TodoList') {
        this.$router.push('/todos')
      } else if(nextComp === 'TodoInputForm') {
        this.$router.push('/add-todo')
      }
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
}
</style>
