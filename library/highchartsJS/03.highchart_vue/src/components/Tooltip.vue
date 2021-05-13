<template>
  <div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
export default {
  name: "tooltip",
  data() {
    return {
      chartOptions: {
        title: {
          text: "tooltip test"
        },

        tooltip: {
          // backgroundColor: "#FCFFC5",
          // borderColor: "black",
          // borderRadius: 10,
          // borderWidth: 9

          // 배경 gradient ----------------
          backgroundColor: {
            linearGradient: [0, 0, 100, 60],
            stops: [
              [0, "#FFFFFF"],
              [1, "#E0E0E0"]
            ]
          },
          borderWidth: 1,
          borderColor: "#AAA",

          //Formmater!!!!!
          formatter: function(c) {
            console.log(this);
            console.log(c);
            return (
              "이름 <b>" +
              this.x +
              "</b> 은 <b>" +
              this.y +
              "</b> 이다, " +
              this.series.name +
              "안에 있는.."
            );
          },

          // crosshair!!!!!!!!!
          // 오직 x-axis에서만 가능
          // crosshairs: [true]

          // 오직 y-axis에서만 가능
          // crosshairs: [false, true]

          // both axes
          crosshairs: [true, true]
        },

        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },

        series: [
          {
            name: "이름!",
            data: [
              29.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ]
          }
        ]
      }
    };
  }
};
</script>

<style></style>
