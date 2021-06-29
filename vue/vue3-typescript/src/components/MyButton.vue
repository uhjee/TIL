<template>
  <div class="btn" :style="{ backgroundColor: getColor }">
    <slot name="text"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  props: {
    color: {
      type: String,
      default: 'blue',
    },
  },
  computed: {
    getColor() {
      switch (this.color) {
        case 'blue':
          return '#508cbf';
        case 'red':
          return '#e65353';
        case 'yellow':
          return '#e8c030';
        case 'green':
          return '#86b561';
        case 'grey':
          return '#bdbfb8';

        default:
          return '#222';
      }
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.btn {
  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 3px 4px;
  padding: 6px 15px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  transition: 0.13s;

  &:hover {
    font-size: 14px;
  }
}
</style>
