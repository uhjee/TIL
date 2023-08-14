<template>
  <div>
    <div ref="el" class="inner" :style="{ backgroundColor: innerColorBoolaen ? 'red' : 'blue' }"></div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const el = ref();

const innerColorBoolaen = ref(false);

const close = () => {
  console.log('close');
  innerColorBoolaen.value = !innerColorBoolaen.value;
};

onClickOutside(el, close);
</script>

<style scoped>
.inner {
  width: 100px;
  height: 100px;
}
</style>
