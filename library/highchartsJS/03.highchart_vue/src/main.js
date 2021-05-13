// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts';

// global Options for Highcharts
Highcharts.setOptions({
  chart: {
    backgroundColor: {
      linearGradient: [0, 0, 500, 500],
      stops: [
        [0, "rgb(255,255,255)"],
        [1, "rgb(240, 240, 255)"]
      ]
    },
    // div의 두께 - 가장 바깥
    borderWidth: 1,
    // plot 챠트가 그려지는 곳
    plotBackgroundColor: "rgba(255, 255, 255, .9)",
    plotShadow: true,
    plotBorderWidth: 1
  }
})

Vue.use(HighchartsVue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
