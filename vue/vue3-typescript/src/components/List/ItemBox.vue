<template>
  <div class="item-box"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemBox',
});
</script>

<style scoped lang="scss">
.item-box {
  height: 70px;
  width: calc(100% - 10px);
  border: 2px solid #999;
}
</style>
