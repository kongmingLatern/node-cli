import React, { useEffect } from "react";
import * as d3 from "d3";
import { data } from "./data";
export default function Draw() {
  useEffect(() => {
    // 在组件挂载后执行绘制关系图的操作
    drawGraph();
  }, []);

  const drawGraph = () => {
    // 关系图的数据
    const nodes = [
      { id: 1, name: "Node 1" },
      { id: 2, name: "Node 2" },
      { id: 3, name: "Node 3" },
      { id: 4, name: "Node 4" },
      { id: 5, name: "Node 5" },
    ];

    const links = [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 2, target: 3 },
      { source: 4, target: 5 },
    ];

    // 创建一个力导向图模拟器
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(300, 300))
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      ); // 调整节点之间的间隔

    // 创建SVG元素并设置其宽度和高度
    const svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 1000);

    // 创建连线
    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // 创建节点
    // const node = svg
    //   .selectAll("circle")
    //   .data(nodes)
    //   .enter()
    //   .append("circle")
    //   .attr("r", 10)
    //   .attr("fill", "blue");
    const node = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);
    //添加圆形节点
    node.append("circle").attr("r", 20).attr("fill", "blue");
    //添加文字
    node
      .append("text")
      .text((d) => d.name)
      .attr("x", -10)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .attr("fill", "white");
    //在节点上方显示文字
    //使用力导向图模拟器更新节点和连线位置
    // 使用力导向图模拟器更新节点和连线位置
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
    });
  };

  return <div id="graph" />;
}
