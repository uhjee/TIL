<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <button @click="appendNum">appendNum</button>
      </div>
      <div class="row" v-for="(item, index) in numArr" :key="item + index">{{ item }}</div>
    </div>
    <div class="col">
      <div class="row">
        <input v-model="message" @input="changeMessage($event.target.value)" type="text" />
        <button @click="appendTodo">appendTodo</button>
      </div>
      <div class="row" v-for="(str, index) in strArr" :key="str + index">{{ str }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
  name: 'Setup',
  components: {},
  /**
   * ! Composition API :: vue3 기능(관심대상 별로 관리가 가능하다.)
   */
  setup() {
    // beforeCreate - create 사이에 동작
    const numArr: Ref<number[]> = ref([0]);
    const lastNum = ref(0);
    const appendNum = (): void => {
      numArr.value.push((lastNum.value += 1));
    };

    const message = ref('');
    const strArr: Ref<string[]> = ref(['lalalalala', 'what?']);
    const appendTodo = (): void => {
      if (message.value !== '') {
        strArr.value.push(message.value);
        message.value = '';
      }
    };
    const changeMessage = (value: string): void => {
      message.value = value.trim();
    };

    return {
      numArr,
      lastNum,
      appendNum,
      message,
      strArr,
      appendTodo,
      changeMessage,
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss"></style>
