<template>
  <div :class="`relationmap-wrapper ${wrapperClass}`">
    <svg
      ref="svg"
      :class="['relationmap-svg', svgClass]"
      width="900"
      height="850"
    ></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import RELATION_MAP_RES from '../datas/relationMap.res';

const RELATION_MAP_NODE_TYPE = {
  PROJECT: 'PROJECT',
  NETWORK: 'NETWORK',
  PUBLIC_NETWORK: 'PUBLIC_NETWORK',
  SERVER: 'SERVER',
  ROUTER: 'ROUTER',
  LOAD_BALANCER: 'LOAD_BALANCER',
  BLOCK_STORAGE: 'BLOCK_STORAGE',
  SERVER_AUTO_SCALING: 'SERVER_AUTO_SCALING',
};

export default {
  name: 'ApplemangoExample',
  components: {},
  props: {},
  data() {
    return {
      mapId: '0',
      wrapperClass: '',
      svgClass: 'svgClass',
      loading: false,
      relationMapData: {},
      width: 0,
      height: 0,
      treemap: null,
      root: null,
      rootDescendants: null,
      nodes: [],
      links: [],
      textElements: [],
      targetId: null,
      zoomHandler: null,
      zoom: {
        x: 0, // Translate를 위한 X좌표 초기값
        y: 0, // Translate를 위한 Y좌표 초기값
        k: 1, // Scale 초기값
      },
      setOnlyNetworkPosition: false,
      tooltip: {},
      tooltipDiv: null,
      CIRCLE_DEFAULT_STROKE_COLOR: '#c5c5c5',
      serverRscInfo: null, // *override
      nodeBreadcrumb: [],
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.mapId = this._uid;
      this.wrapperClass = `relationmap-${this.mapId}`;
      this.relationMapData = RELATION_MAP_RES;
      this.setLayout();
    },
    setLayout() {
      const svg = d3
        .select(`.${this.svgClass}`)
        .style('border', '1px solid #999')
        .style('width', '900px')
        .style('height', '650px')
        .style('padding', '10px')
        .style('box-sizing', 'border-box');

      const depth = this.getMapDepth(this.relationMapData);
      this.setMapSize(800 + depth * 300, 900);
      this.treemap = d3.tree().size([this.height, this.width]); // return function

      const container = svg
        .append('g')
        .attr(
          'transform',
          `translate(${this.zoom.x},${this.zoom.y}) scale(${this.zoom.k})`,
        );

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

      const root = d3.hierarchy(this.relationMapData);
      root.x0 = this.height / 2;
      root.y0 = 500;

      this.rootDescendants = root.descendants().map((d, i) => ({
        ...d,
        id: i,
      }));
      this.root = root;

      this.initZoom(svg, container);
      this.drawMap();
      svg
        .attr('viewBox', () => [0, 0, this.width, this.height])
        .on('dblclick.zoom', null);
    },
    getMapDepth(relationMapData) {
      let result = 1;
      let networkFlag = false;
      const checkSize = (level, node) => {
        if (node.children && node.children.length > 0) {
          node.children.forEach((d) => {
            checkSize(level + 1, d);
          });
          if (node.type === RELATION_MAP_NODE_TYPE.PUBLIC_NETWORK) {
            networkFlag = true;
          }
        }
        if (result < level) result = level;
      };

      checkSize(0, relationMapData);
      if (networkFlag) {
        if (result > 2) result -= 1;
        else this.setOnlyNetworkPosition = true;
      }
      return result;
    },
    setMapSize(width = 900, height = 850) {
      this.width = width;
      this.height = height;
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
    drawMap() {
      const source = this.root;
      const treeData = this.treemap(source);
      let nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // 노드 생성
      let networkFlag = false;
      nodes.forEach((d) => {
        if (
          d.data.type === RELATION_MAP_NODE_TYPE.ROUTER ||
          d.data.type === RELATION_MAP_NODE_TYPE.PUBLIC_NETWORK
        ) {
          d.y = 100;
          d.x =
            d.data.type === RELATION_MAP_NODE_TYPE.ROUTER
              ? d.x - 150
              : d.x - 300;
          networkFlag = true;
        } else {
          const depth = networkFlag ? d.depth - 2 : d.depth;
          d.y = 100 + depth * 450;
        }
        if (this.setOnlyNetworkPosition) {
          d.x += 100;
          d.y += 300;
        }
      });

      let i = 0;
      const node = this.nodes.selectAll('g.node').data(nodes, (d) => {
        if (!d.id) {
          i += 1;
          d.id = i;
        }
        return d.id;
      });
      this.tooltipDiv = d3
        .select(`.tooltip-${this.mapId}`)
        .style('visibility', 'hidden');

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', (d) => `node item-${d.data.treeKey}`)
        .attr('transform', () => `translate(${source.y0},${source.x0})`)
        .on('click', (e, d) => {
          this.clickNode(e, d);
        })
        .on('mouseover', (e, d) => {
          this.mouseoverNode(d);
        })
        .on('mouseout', () => {
          this.mouseoutNode();
        });

      const rectHeight = 70;
      const rectWidth = 300;

      // 박스
      nodeEnter
        .append('rect')
        .attr('class', 'rect')
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', -10)
        .attr('y', (rectHeight / 2) * -1)
        .attr('rx', '5')
        .attr('fill', '#fff')
        .attr('stroke', 'red')
        .attr('stroke-opacity', (d) => (d.data.type === 'ROOT' ? 0 : 1))
        .attr('class', (d) => `item-${d.data.treeKey}`);

      // 아이콘 배경
      nodeEnter
        .append('rect')
        .attr('class', 'rect')
        .attr('width', 70)
        .attr('height', rectHeight)
        .attr('x', -10)
        .attr('y', (rectHeight / 2) * -1)
        .attr('rx', '5')
        .attr('fill', '#d44')
        .attr('fill-opacity', 1);

      // target
      nodeEnter
        .filter((d) => d.data.treeKey === this.targetId)
        .append('rect')
        .attr('width', 60)
        .attr('height', 17)
        .attr('x', -7)
        .attr('y', -52)
        .attr('fill', 'red');

      nodeEnter
        .filter((d) => d.data.treeKey === this.targetId)
        .append('text')
        .style('fill', 'blue')
        .attr('x', 3)
        .attr('y', -39)
        .text('Target');

      nodeEnter
        .filter(
          (d) =>
            d.data.type !== RELATION_MAP_NODE_TYPE.PUBLIC_NETWORK &&
            d.data.treeKey !== this.targetId,
        )
        .append('rect')
        .attr('width', 30)
        .attr('height', 30)
        .attr('x', 270)
        .attr('y', -50)
        .attr('rx', '5')
        .attr('fill', 'white')
        .attr('stroke-width', '1px')
        .attr('stroke', '#e2e5ec')
        .attr('class', `map-breadcrumb-${this.mapId} node--inactive`);

      nodeEnter
        .filter(
          (d) =>
            d.data.type !== RELATION_MAP_NODE_TYPE.PUBLIC_NETWORK &&
            d.data.treeKey !== this.targetId,
        )
        .append('text')
        .attr('x', 280)
        .attr('y', -30)
        .text('?')
        .attr('class', `fa map-breadcrumb-${this.mapId} node--inactive`);

      // text
      nodeEnter
        .append('text')
        .attr('dy', -4)
        .attr('x', 70)
        .attr('text-anchor', 'start')
        .attr('fill', '#000')
        .style('font-size', '18px')
        .style('font-weight', '600')
        .text((d) =>
          d.data.label.length > 20
            ? `${d.data.label.substring(0, 20)}..`
            : d.data.label,
        );

      nodeEnter
        .append('text')
        .attr('x', 70)
        .attr('dy', '1.4em')
        .attr('fill', '#000')
        .style('font-size', '15px')
        .style('font-weight', 'normal')
        .text((d) => {
          if (d.data.type === RELATION_MAP_NODE_TYPE.PUBLIC_NETWORK) {
            return `되나  ${d.data.serviceSubTypeName}`;
          }
          return d.data.serviceSubTypeName;
        });
      nodeEnter
        .append('text')
        .attr('x', 210)
        .attr('dy', '1.4em')
        .attr('fill', '#000')
        .style('font-size', '15px')
        .style('font-weight', 'normal')
        .text((d) => (!d.data.createDatetime ? '' : d.data.createDatetime));

      nodeEnter
        .append('text')
        .attr('dy', 14)
        .attr('x', 10)
        .attr('text-anchor', 'start')
        .classed('w-icon ', (d) => d.data.ype)
        .style('font-size', '30px')
        .style('opacity', 0.5)
        .text((d) => d.data.type);

      // 마우스 오버 시 테두리
      nodeEnter
        .insert('rect', '.rect')
        .attr('width', rectWidth + 10)
        .attr('height', rectHeight + 10)
        .attr('x', -15)
        .attr('y', (rectHeight / 2) * -1 - 5)
        .attr('rx', '5')
        .attr('fill', 'none')
        .attr('stroke-width', '10px')
        .attr('stroke', (d) => 'yellow')
        .style('opacity', 0.3)
        .attr('class', `node-border-${this.mapId} border--inactive`);

      const nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.attr('transform', (d) => `translate(${d.y},${d.x})`);

      const nodeExit = node
        .exit()
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select('text').style('fill-opacity', 1e-6);

      // ---- 링크 생성  ----
      const link = this.links.selectAll('path.link').data(links, (d) => d.id);

      function diagonal(s, d) {
        const path = `M ${s.y + 140} ${s.x}
                C ${(s.y + d.y) / 2 + 140} ${s.x},
                  ${(s.y + d.y) / 2 + 140} ${d.x},
                  ${d.y + 140} ${d.x}`;
        return path;
      }

      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          const o = {
            x: source.x0,
            y: source.y0,
          };
          return diagonal(o, o);
        });
      const linkUpdate = linkEnter.merge(link);
      linkUpdate.attr('d', (d) => diagonal(d, d.parent));

      link
        .exit()
        .attr('d', () => {
          const o = {
            x: source.x,
            y: source.y,
          };
          return diagonal(o, o);
        })
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },
    clickNode(event, node) {
      if (event && event.defaultPrevented) return;
      this.$refs.serviceDetailPopup.open(node);
    },
    mouseoverNode(target) {
      console.log(target);
      let data = { ...target.data };
      data = this.setServerTooltipRscInfo(data);
      this.tooltip = {
        ...data,
      };
      const item = document.querySelector(`.item-${target.data.treeKey}`);
      const wrapper = document.querySelector(`.${this.wrapperClass}`);
      const coords = item.getBoundingClientRect();
      const wrapCoords = wrapper.getBoundingClientRect();

      const nodeHeight = coords.bottom - coords.top;
      const nodeWidth = coords.right - coords.left;

      const top = coords.top - wrapCoords.top + nodeHeight;
      const left = coords.left - wrapCoords.left + (nodeWidth - nodeWidth / 3);
      this.tooltipDiv = this.tooltipDiv
        .style('top', `${top}px`)
        .style('left', `${left}px`)
        .transition()
        .duration(200)
        .style('visibility', 'visible');

      const treeKey = target.data.treeKey;
      d3.selectAll(`.node-border-${this.mapId}`)
        .classed('node--active', (d) => d.data.treeKey === treeKey)
        .classed('node--inactive', (d) => d.data.treeKey !== treeKey);

      if (this.nodeBreadcrumb && this.nodeBreadcrumb.length < 3) {
        d3.selectAll(`.map-breadcrumb-${this.mapId}`)
          .classed('node--active', (d) => d.data.treeKey === treeKey)
          .classed('node--inactive', (d) => d.data.treeKey !== treeKey);
      }
    },
    mouseoutNode() {
      this.tooltipDiv.transition().duration(200).style('visibility', 'hidden');
      d3.selectAll(`.node-border-${this.mapId}`)
        .classed('node--active', false)
        .classed('node--inactive', true);
      d3.selectAll(`.map-breadcrumb-${this.mapId}`)
        .classed('node--active', false)
        .classed('node--inactive', true);
    },
    setServerTooltipRscInfo(data) {
      if (data.type === RELATION_MAP_NODE_TYPE.SERVER) {
        const server = { ...data };
        server.cpu = server.cpuRscInfo ? server.cpuRscInfo : '-';
        server.mem = server.memRscInfo ? server.memRscInfo : '-';
        return server;
      }
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
