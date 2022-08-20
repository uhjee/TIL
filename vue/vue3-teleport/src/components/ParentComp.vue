<template>
  <div class="parent">
    <h2>부모 컴포넌트</h2>
    <ChildComp></ChildComp>
  </div>
</template>

<script setup lang="ts">
import ChildComp from "@/components/ChildComp";
</script>

<style scoped lang="scss">
.parent {
  padding: 10px 20px;
  border: 1px solid darkgray;
  border-radius: 6px;
}
</style>
