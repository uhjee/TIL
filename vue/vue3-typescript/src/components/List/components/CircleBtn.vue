<template>
  <div :class="getClass" :style="getStyle">
    <div class="flex center-h"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CircleBtn',
  props: {
    isDone: {
      type: Boolean,
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'grey',
    },
    whSize: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    getStyle() {
      return this.isDone
        ? {
          backgroundColor: this.getColor,
          border: 'none',
          height: `${this.whSize}px`,
          width: `${this.whSize}px`,
        }
        : {
          borderColor: this.getColor,
          height: `${this.whSize}px`,
          width: `${this.whSize}px`,
        };
    },
    getColor() {
      switch (this.color) {
        case 'grey':
          return '#6a7385';
        case 'red':
          return '#d94537';
        case 'yellow':
          return '#e8c030';
        case 'green':
          return '#86b561';
        case 'blue':
          return '#508cbf';
        default:
          throw new Error('색상을 선택해야합니다.');
      }
    },
    getClass() {
      return {
        btn: true,
        'btn-done': this.isDone,
      };
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

  margin: 3px 4px;
  border-radius: 50%;

  border: 2px solid;
  background-color: #fff;

  font-size: 12px;
  cursor: pointer;
  transition: 0.08s;

  &-done {
    background-color: orange;
  }

  &:hover {
    transform: scale(1.2);
  }
}
</style>
