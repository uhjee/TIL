<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <button @click="appendNum">appendNum</button>
      </div>
      <div class="row" v-for="(item, index) in arr" :key="item + index">{{ item }}</div>
    </div>
    <div class="col">
      <div class="row">
        <input v-model="message" @input="changeMessage($event.target.value)" type="text" />
        <button @click="appendTodo">appendTodo</button>
      </div>
      <div class="row" v-for="(todo, index) in todoArr" :key="todo + index">{{ todo }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
  data() {
    return {
      message: '' as string,
      arr: [0, 1] as number[],
      todoArr: ['d', 'dsfa'] as string[],
      lastNum: 0 as number,
    };
  },
  methods: {
    appendNum(): void {
      this.arr.push((this.lastNum += 1));
    },
    appendTodo() {
      if (this.message !== '') {
        this.todoArr.push(this.message);
        this.message = '';
      }
    },
    changeMessage(value: string): void {
      this.message = value.trim();
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  .row {
    display: flex;
    align-items: center;

    .col {
      margin: 10px 15px;
      width: 100%;
      border-right: 1px solid #888;

      &:last-child {
        border-right: none;
      }

      .row {
        margin: 5px 0;
      }
    }
  }
}
</style>
