<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
export default {
  name: "plot-band-lines",
  data() {
    return {
      chartOptions: {
        title: {
          text: "plotBand And Lines"
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
          ],

          //   Plot Bands!!!!!!!!!!!!!!!!!!
          plotBands: [
            {
              color: "orange",
              from: 2, //start of the plot band
              to: 3, //end of the plot band
              label: {
                text: "난 라벨",
                align: "left",
                // 기본 plot band을 기준으로 한 간격(picel 단위)
                x: +30
                // x: -10
              },
              events: {
                click: function() {
                  console.log(this.options.label.text);
                },
                mouseover: function() {},
                mouseout: function() {},
                mousemove: function() {}
              }
            }
          ],
          //   Plot Lines!!!!!!!!!!!!!!!!!!
          plotLines: [
            {
              color: "red",
              dashStyle: "longdashdot",
              value: 5,
              width: 2
            }
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
