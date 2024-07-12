/**
* 출처 - align circul round
* https://stackoverflow.com/questions/30586434/d3-js-how-to-arrange-the-squre-box-around-the-circle-properly
*/

<template>
  <div class="container">
    <svg ref="svg" :class="['example-svg']"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Chance from 'chance';

const radians = 0.0174532925;

export default {
  name: 'TreeMapExample',
  components: {},
  props: {},
  data() {
    return {
      mapData: {},
      size: {
        width: 0,
        height: 0,
      },
      treeMap: null,
      zoom: {
        x: 0, // Translate를 위한 X좌표 초기값
        y: 0, // Translate를 위한 Y좌표 초기값
        k: 1, // Scale 초기값
      },
      root: null,
      nodes: [],
      links: [],
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.makeSampleMap();
      this.$nextTick(() => this.setLayout());
    },
    setLayout() {
      const width = 500;
      const height = 500;
      const maxRadius = 75;

      // size scale for data
      const radiusScale = d3
        .scaleSqrt()
        .domain([0, d3.max(this.mapData.children)])
        .range([0, maxRadius]);

      // determine the appropriate radius for the circle
      const roughCircumference =
        d3.sum(this.mapData.children.map(radiusScale)) * 2;
      const radius = roughCircumference / (Math.PI * 2);

      // make a radial tree layout
      this.treeMap = d3
        .tree()
        .size([360, radius])
        .separation((a, b) => radiusScale(6) + radiusScale(6));

      const svg = d3
        .select('.example-svg')
        .style('border', '1px solid #999')
        .style('width', width)
        .style('height', height)
        .style('padding', '10px')
        .style('text-align', 'center')
        .style('box-sizing', 'border-box');

      this.setMapSize(height, width);

      this.zoom = {
        x: width / 2,
        y: height / 2,
        k: 1, // Scale 초기값
      };

      const container = svg
        .append('g')
        .attr(
          'transform',
          `translate(${this.zoom.x},${this.zoom.y}) scale(${this.zoom.k})`,
        );

      const circle = svg.append('circle').attr({ r: maxRadius });

      // apply the layout to the data
      const root = d3.hierarchy(this.mapData);

      this.rootDescendants = root.descendants().map((d, i) => ({
        ...d,
        id: i,
      }));
      this.root = root;

      this.links = container
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5);

      this.nodes = container
        .append('g')
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'all');

      this.initZoom(svg, container);
      this.drawMap();

      svg
        .attr('viewBox', () => [0, 0, width, height])
        .on('dblclick.zoom', null);
    },
    drawMap() {
      const root = this.root;
      const treeData = this.treeMap(root);
      let nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      let i = 0;
      const node = this.nodes.selectAll('g.node').data(nodes, (d) => {
        if (!d.id) {
          i += 1;
          d.id = i;
        }
        return d.id;
      });

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', (d) => `node item-${d.id}`)
        .attr('transform', function (d, i) {
          return (
            'translate(' +
            75 * Math.sin(Math.PI * i * 0.25) +
            ',' +
            75 * Math.cos(Math.PI * i * 0.25) +
            ')'
          );
        });

      const circles = nodeEnter
        .append('circle')
        .attr('class', 'circle')
        .attr('r', 20)
        .attr('fill', '#fff')
        .attr('stroke', '#000')
        .attr('stroke-opacity', (d) => (d.depth === 0 ? 1 : 0.6))
        .attr('class', (d) => `item-${d.id}`);

      // // name
      // nodeEnter
      //   .append('text')
      //   .attr('dy', -10)
      //   // .attr('x', 70)
      //   .attr('text-anchor', 'start')
      //   .attr('fill', '#000')
      //   .style('font-size', '18px')
      //   .style('font-weight', '600')
      //   .text((d) =>
      //     d.data.name.length > 20
      //       ? `${d.data.name.substring(0, 20)}..`
      //       : d.data.name,
      //   );
      // age
      nodeEnter
        .append('text')
        .attr('dy', 10)
        // .attr('x', 70)
        .attr('text-anchor', 'start')
        .attr('fill', '#000')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .text((d) => d.data.age);
      // // desc
      // nodeEnter
      //   .append('text')
      //   .attr('dy', 30)
      //   // .attr('x', 70)
      //   .attr('text-anchor', 'start')
      //   .attr('fill', '#000')
      //   .style('font-size', '18px')
      //   .style('font-color', '#777')
      //   .style('font-weight', '600')
      //   .text((d) =>
      //     d.data.desc.length > 20
      //       ? `${d.data.desc.substring(0, 20)}..`
      //       : d.data.desc,
      //   );
      // const nodeUpdate = nodeEnter.merge(node);
      // nodeUpdate.attr('transform', (d) => `translate(${d.y},${d.x})`);
      // const nodeExit = node
      //   .exit()
      //   .attr('transform', () => `translate(${root.y},${root.x})`)
      //   .remove();
    },
    makeSampleMap() {
      const chance = new Chance();
      const root = {
        name: chance.name(),
        age: chance.age(),
        desc: chance.paragraph(),
      };

      const children = Array.from({ length: 7 }, (_, i) => ({
        name: chance.name(),
        age: chance.age(),
        desc: chance.paragraph(),
      }));
      root.children = children;
      this.mapData = root;
    },
    initZoom(svg, container) {
      this.zoomHandler = d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          this.zoom = {
            x: event.transform.x,
            y: event.transform.y,
            k: event.transform.k,
          };
          container.attr('transform', event.transform);
        });
      svg.call(this.zoomHandler);
    },
    setMapSize(width, height) {
      this.size = {
        width,
        height,
      };
    },
    calculateX(angle, radius) {
      // change to clockwise
      let a = 360 - angle;
      // start from 12 o'clock
      return radius * Math.sin(a * radians);
    },
    calculateY(angle, radius) {
      // change to clockwise
      let a = 360 - angle;
      // start from 12 o'clock
      return radius * Math.cos(a * radians);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>
