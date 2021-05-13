<template>
  <div>
    <highcharts
      class="example-highchart"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
export default {
  name: "example-chart",
  data() {
    return {
      chartOptions: {
        // 차트에 대한 설정

        chart: {
          // 타입: line(default), bar, column, pie,  등..
          // series 에서도 개별적으로 줄 수 있다.
          type: "line"
        },

        //  챠트의 제목
        title: {
          text: "practice_line chart"
        },

        //  차트의 부제목
        subtitle: {
          text: "Source: thesolarfoundatioin.com"
        },

        //  y축에 대한 옵션
        yAxis: {
          title: {
            text: "Number of Employees"
          }
        },

        // x축에 대한 옵션
        xAxis: {
          // x축에 대한 접근성
          accessibility: {
            rangeDescription: "Range: 2010 to 2017"
          }
        },

        // 범례에 대한 옵션
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        // plot에 대한 옵션... series에 대한 옵션도 해당
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010,
            // point 선택이 가능하도록..
            // 선택한 것은 var selectedPoints = chart.getSelectedPoints(); 로 잡을 수있다.
            allowPointSelect: true,
            // y축을 기준으로 zone
            zoneAxis: "y",
            // 기준점을 두어 차트상에 구역을 구분
            zones: [
              {
                value: 80000
              },
              {
                dashStyle: "dot"
              }
            ]
          },
          // 차트 선에 대한 설정
          line: {
            // 각 data 마다 label 띄워주기
            dataLabels: {
              enabled: true
            }
          }
        },

        // 챠트 데이터의 묶음
        series: [
          {
            // chart type을 개별적으로 줄 수 있다.
            // type: "line",
            // name attribute는 legend에 표시될 이름
            name: "Installation",
            data: [
              43934,
              // point :: series 내의 데이터 사이에서 더 잘보이게 할 수 있다.
              { y: 52503, color: "#BF0B23" },
              57177,
              69658,
              // marker : point 보다 스타일, 모양 등을 바꿀 수 있다.
              { y: 97031, marker: { fillColor: "#BF0B23", radius: 10 } },
              119931,
              137133,
              154175
            ]
          },
          {
            // type: "bar",
            name: "Manufacturing",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
            // 선 굵기
            lineWidth: 5
          },
          {
            type: "column",
            name: "Sales & Distribution",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          },
          {
            // type: "pie",
            name: "Project Development",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
            // 점선으로 표현
            dashStyle: "longdash"
          },
          {
            name: "Other",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
            // 기준점으로 zone을 만들어 다른 색으로 표시
            zones: [
              {
                value: 0,
                color: "#f7a35c"
              },
              {
                value: 5000,
                color: "#f7a35c"
              },
              {
                value: 10000,
                color: "#f7a35c"
              }
            ]
          }
        ],

        // 반응형에 대한 설정
        reponsive: {
          rules: [
            {
              condition: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    selectPointTest() {
      let selectedPoints = chart.getSelectedPoints();
      console.log(seletedPoints);
    }
  }
};
</script>

<style></style>
