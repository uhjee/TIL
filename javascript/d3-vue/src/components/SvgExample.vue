<template>
  <div class="container">
    <svg width="800" height="200">
      <g fill="none">
        <path stroke="red" d="M5 20 l215 0" />
        <path
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
          d="M5 40 l215 0"
        />
        <path
          stroke="blue"
          stroke-width="8"
          stroke-linecap="square"
          d="M5 60 l215 0"
        />
      </g>
      <g fill="none">
        <path stroke="black" stroke-dasharray="5,5" d="M5 80 l215 0" />
        <path stroke="black" stroke-dasharray="10,10" d="M5 100 l215 0" />
        <path
          stroke="black"
          stroke-dasharray="20,10,5,5,5,10"
          d="M5 120 l215 0"
        />
      </g>
      <g>
        <circle stroke="black" cx="100" cy="100" r="90" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgExample',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>
