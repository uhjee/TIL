<template>
  <div class="box">
    <item-box></item-box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as C from 'chance';
import * as R from 'ramda';
import { TodoType } from '@/types/TodoType';
import ItemBox from './ItemBox.vue';

const c = new C.Chance();

const COLORS = ['red', 'blue', 'grey', 'yellow', 'green'];

export default defineComponent({
  name: 'List',
  components: {
    ItemBox,
  },
  data() {
    return {
      todoArr: [] as TodoType[],
    };
  },
  mounted() {
    this.todoArr = R.range(1, 10 + 1).map(() => this.makeTodo());
  },
  methods: {
    makeTodo(): TodoType {
      return {
        color: COLORS[Math.floor(Math.random() * 10) % 5],
        content: c.paragraph(),
        date: ((d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)(c.date()),
        isDone: false,
      } as TodoType;
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
