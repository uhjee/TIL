<template>
  <div id="app">
    <plot-band-lines></plot-band-lines>
    <legend-chart></legend-chart>
    <tooltip></tooltip>
    <example-chart />
    <array-data-chart></array-data-chart>
  </div>
</template>

<script>
import ExampleChart from "./components/ExampleChart";
import ArrayDataChart from "./components/ArrayDataChart";
import Tooltip from "./components/Tooltip";
import LegendChart from "./components/LegendChart";
import PlotBandLines from "./components/PlotBandandLines";
export default {
  name: "App",
  components: {
    PlotBandLines,
    LegendChart,
    ExampleChart,
    ArrayDataChart,
    Tooltip
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
