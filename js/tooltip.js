var tooltip_width = 250;

var tooltip = d3.select("body")
  .append("div")
    .attr("class", "tooltip glowing")
    .style("position", "absolute")
	  .style("z-index", "10")
	  .style("visibility", "hidden")
    .style("width", tooltip_width+"px");

tooltip.append("div")
  .attr("class", "tooltip-header")
	.text("tooltip");

tooltip.append("div")
  .attr("class", "tooltip-post")
  .text("example text");

function show_tooltip() {
  return tooltip.style("visibility", "visible");
}

function hide_tooltip() {
  return tooltip.style("visibility", "hidden");
}

function move_tooltip() {
  var top  = d3.event.pageY-10;
  var left = d3.event.pageX+10;
  var svg_width = $("svg").width();

  if( (left+tooltip_width) > svg_width ) {
    left = left - tooltip_width - 20;
  }

  return tooltip.style("top", top+"px").style("left", left+"px");
}
