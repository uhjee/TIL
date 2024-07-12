/** * References *
https://clamwell.github.io/blog/draw-network-chart-with-d3.js/ */
<template>
  <div id="container">
    <svg ref="svg" :class="svgClassName"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'RelationMapProto',
  components: {},
  props: {},
  data() {
    return {
      svgClassName: 'example_svg',
      size: {
        width: 600,
        height: 400,
      },
      simulation: null,
      nodeEl: null, // 맵의 노드
      linkEl: null, // 맵의 링크
      graphData: {
        links: [],
        nodes: [],
      },
      zoom: {
        x: 0,
        y: 0,
        k: 1,
      },
      zoomHandler: null,
    };
  },
  mounted() {
    this.makeNodeLinkData();
    this.initializeSimulation();
    this.initializeDisplay();
  },
  computed: {
    sourceTargetList() {
      return this.graphData.links.map((l) => [
        l.source.elementId,
        l.target.elementId,
      ]);
    },
  },
  methods: {
    initializeSimulation() {
      const forceOption = {
        link: (links) => d3.forceLink(links).id((d) => d.elementId),
        center: ({ width, height }) => d3.forceCenter(width / 2, height / 2),
        charge: (strength) => d3.forceManyBody().strength(strength),
        forceCollide: (distance) => d3.forceCollide().radius(distance),
      };

      const simulation = d3
        .forceSimulation(this.graphData.nodes)
        .force('link', forceOption.link(this.graphData.links)) // 노드 간 링크 설정
        .force('center', forceOption.center(this.size)) // 요소들을 가운데로 당기는 설정
        .force('charge', forceOption.charge(-500)) // 노드 간 중력
        .force('collide', forceOption.forceCollide(80)) // 노드들의 간격 직접 명시
        .stop();
      // .on('tick', this.ticked);
      for (var i = 0; i < 300; ++i) simulation.tick();

      this.simulation = simulation;
    },
    initializeDisplay() {
      const minScale = 0.1;
      const svg = d3
        .select(`.${this.svgClassName}`)
        .attr('viewBox', [0, 0, this.size.width, this.size.height]);

      const container = svg
        .append('g')
        .attr(
          'transform',
          `translate(${this.zoom.x},${this.zoom.y})scale(${this.zoom.k})`,
        );

      this.linkEl = container
        .append('g')
        .attr('stroke', '#aaa')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(this.graphData.links)
        .join('line')
        .attr('stroke-width', 1)
        .attr('class', 'link');

      this.nodeEl = container
        .append('g')
        .attr('class', 'circle-node-holder')
        .selectAll('g.circle-node-holder')
        .data(this.graphData.nodes)
        .enter()
        .append('g');

      this.zoomHandler = d3
        .zoom()
        .scaleExtent([minScale, 1.5])
        .on('zoom', (event) => {
          this.zoom = {
            x: 0,
            y: event.transform.y,
            k: 1,
          };
          container.attr('transform', event.transform);
        });
      svg.call(this.zoomHandler);
      svg.on('dblclick.zoom', null);

      this.updateDisplay();
      this.ticked();
    },
    updateDisplay() {
      const circleRadius = 18;

      this.nodeEl
        .attr('class', 'node')
        .on('mouseover', (event, d) => this.mouseOverNode(event, d))
        .on('mouseout', () => this.mouseOutNode())
        .each(function (d) {
          // icon 배경 원
          d3.select(this)
            .append('circle')
            .attr('r', circleRadius)
            .attr('fill', '#fff')
            .attr('stroke', '#e2e5ec')
            .attr('stroke-width', '3px')
            .attr('class', (d) => `circle circle-item-${d.elementId}`);

          // icon
          d3.select(this)
            .append('text')
            .attr('dy', 2)
            .attr('dominant-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .attr('font-size', '26px')
            .classed('fa', true)
            .text((d) => '\uf233');

          // obj name label
          d3.select(this)
            .append('text')
            .text(d.objName)
            .attr('dx', circleRadius * 2 + 14)
            .attr('font-size', '12px')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('class', 'node-label');
        });
    },
    ticked() {
      this.linkEl.call((link) => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);
      });

      this.nodeEl.call((node) => {
        node.attr('transform', (d) => `translate(${d.x},${d.y})`);
      });
    },
    initZoom() {
      this.zoom = {
        x: 0,
        y: 0,
        k: 1,
      };
    },
    mouseOverNode(event, target) {
      const activeCircleEl = document.querySelector(
        `.circle-item-${target.elementId}`,
      );
      const elementId = d3.select(event.target).datum().elementId;

      d3.selectAll('.node')
        .classed('element--active', (d) =>
          this.isLinked(elementId, d.elementId),
        )
        .classed(
          'element--inactive',
          (d) => !this.isLinked(elementId, d.elementId),
        );
      d3.selectAll('.node-label')
        .classed('element--active', (d) =>
          this.isLinked(elementId, d.elementId),
        )
        .classed(
          'element--inactive',
          (d) => !this.isLinked(elementId, d.elementId),
        );
      d3.selectAll('line.link')
        .classed('element--active', (d) =>
          this.isLinkedLine(elementId, d.source.elementId, d.target.elementId),
        )
        .classed(
          'element--inactive',
          (d) =>
            !this.isLinkedLine(
              elementId,
              d.source.elementId,
              d.target.elementId,
            ),
        );
    },
    mouseOutNode() {
      d3.selectAll('.node')
        .classed('element--active', true)
        .classed('element--inactive', false);
      d3.selectAll('.node-label')
        .classed('element--active', true)
        .classed('element--inactive', false);
      d3.selectAll('line.link')
        .classed('element--active', (d) => true)
        .classed('element--inactive', false);
    },
    isLinked(a, b) {
      if (!this.sourceTargetList || this.sourceTargetList.length < 1)
        return false;
      return (
        a === b ||
        this.sourceTargetList.some(
          (i) => (i[0] === a && i[1] === b) || (i[0] === b && i[1] === a),
        )
      );
    },
    isLinkedLine(activeElementId, sourceElementId, targetElementId) {
      return (
        activeElementId === sourceElementId ||
        activeElementId === targetElementId
      );
    },
    makeNodeLinkData() {
      const makeNumber = (max = 10, min = 3, checkDuplicateNum = null) => {
        let result = 0;
        let tryCount = 0;
        while (
          result > max ||
          result < min ||
          checkDuplicateNum === result ||
          tryCount < 100
        ) {
          result = Math.floor(Math.random() * 10) % (max + 1);
          tryCount++;
        }
        return result;
      };
      const nodeCount = makeNumber();
      const linkCount = makeNumber(nodeCount);
      const nodes = Array.from({ length: nodeCount }, (_, i) => ({
        elementId: i,
        objName: '관리대상' + i,
      }));
      const nodeIds = nodes.map((i) => i.elementId);
      const links = Array.from({ length: linkCount }, (_, i) => {
        const source = nodeIds[makeNumber(nodeIds.length - 1, 0)];
        return {
          source,
          target: nodeIds[makeNumber(nodeIds.length - 1, 0, source)],
        };
      });
      const linkedElementIds = links.reduce(
        (arr, cur) => [...arr, ...Object.values(cur)],
        [],
      );
      const set = new Set(linkedElementIds);
      // console.log({ nodeCount, linkCount, nodes, links });
      this.graphData = {
        nodes: nodes.filter((n) => set.has(n.elementId)),
        links: links,
      };
    },
  },
};
</script>

<style lang="scss">
#container {
  border: 1px solid #888;
  width: 600px;
  height: 400px;

  .node {
    cursor: pointer;
  }

  .element--active {
    opacity: 1;
  }

  .element--inactive {
    opacity: 0.3;
  }
}
</style>
