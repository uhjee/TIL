<template>
  <div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
export default {
  name: "legend-chart",
  data() {
    return {
      chartOptions: {
        legend: {
          // layout: "vertical",
          layout: "horizontal",
          align: "center",
          verticalAlign: "top",
          backgroundColor: "#FCFFC5",
          borderColor: "#E03939",
          borderWidth: 1,
          borderRadius: 10,
          // floating: true
          // itemCheckboxStyle: {
          //   width: "13px"
          // }
          // 범례 내의 이름끼리의 간격
          itemDistance: 5,
          // hover 시 text의 색 바뀜
          itemHoverStyle: {
            color: "#4FE039"
          },
          // 범례 내의 이름과 박스 바닥과의 간격
          // itemMarginBottom: 10,
          // 범례 박스의 마진
          margin: 4,
          // 범례 안의 이름 style에 대한 설정
          itemStyle: {
            color: "#2D407B",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            textOverflow: "ellipsis"
          }
        },
        title: {
          text: "legend test"
        },
        yAxis: {
          title: {
            text: "Number of Employees"
          }
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017"
          }
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            }
          }
        },
        series: [
          {
            name: "Manufacturing",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "Sales & Distribution",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          },
          {
            name: "Project Development",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          },
          {
            name: "Other",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }
        ]
      }
    };
  }
};
</script>

<style></style>
