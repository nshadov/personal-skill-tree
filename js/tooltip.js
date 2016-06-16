var tooltip = d3.select("body")
  .append("div")
    .attr("class", "tooltip glowing")
    .style("position", "absolute")
	  .style("z-index", "10")
	  .style("visibility", "hidden")

tooltip.append("div")
  .attr("class", "tooltip-header")
	.text("tooltip");

tooltip.append("div")
  .attr("class", "tooltip-post")
  .text("example text");
