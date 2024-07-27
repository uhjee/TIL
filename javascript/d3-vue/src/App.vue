<template>
  <div id="app">
    <relation-map-proto />
    <tree-map-example></tree-map-example>
    <!-- <svg-example></svg-example> -->
    <applemango-example />
  </div>
</template>

<script>
import RelationMapProto from './components/RelationMapProto.vue';
import ApplemangoExample from './components/ApplemangoExample.vue';
import SvgExample from './components/SvgExample.vue';
import TreeMapExample from './components/TreeMapExample.vue';

export default {
  name: 'App',
  components: {
    RelationMapProto,
    TreeMapExample,
    ApplemangoExample,
  },
};
</script>
, RadialTree

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  & > * {
    margin-bottom: 20px;
  }
}
</style>
