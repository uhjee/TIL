<template>
  <div>pos: {{ x }}, {{ y }}</div>
  <div>is dark? {{ isDark }}</div>
  <div>name: {{ store.name }} / color: {{ store.color }}</div>
</template>

<script setup>
import { useDark, useLocalStorage, useMouse, useTitle } from '@vueuse/core';

const { x, y } = useMouse();

const store = useLocalStorage('my-storage', {
  name: 'Apple',
  color: 'red',
});

const isDark = useDark();
useTitle(() => (isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'));
</script>

<style lang="scss" scoped></style>
