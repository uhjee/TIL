<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
export default {
  name: "array-data-chart",
  data() {
    return {
      chartOptions: {
        title: {
          text: "Array Data"
        },
        subtitle: {
          text: "[2,0], [4,5] , [2,8],... ,[2, 4]"
        },
        yAxis: {
          title: {
            text: "y"
          }
        },
        xAxis: {},
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },
        plotOptions: {
          series: {
            label: {}
          }
        },
        series: [
          {
            name: "둘리",
            data: [
              [3, 6],
              [3, 5],
              [7, 3],
              [1, 9],
              [4, 7]
            ]
          },
          {
            name: "요롱이",
            data: [
              [8, 1],
              [6, 7],
              [3, 2],
              [8, 3],
              [3, 6]
            ]
          },
          {
            name: "둘리",
            data: [
              [9, 8],
              { x: 5, y: 8, color: "#BF0B23" },
              [2, 3],
              [6, 1],
              [3, 6]
            ]
          }
        ]
      }
    };
  }
};
</script>

<style></style>
