var tooltip_width = 250;
var tooltip = d3.select("body")
  .append("div")
    .attr("class", "tooltip glowing")
    .style("position", "absolute")
	  .style("z-index", "10")
	  .style("visibility", "hidden")
    .style("width", tooltip_width+"px");

var tooltip2_width = 250;
var tooltip2 = d3.select("body")
  .append("div")
    .attr("class", "tooltip_big glowing")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("width", tooltip2_width);

var tooltip_header = tooltip.append("div")
  .attr("class", "tooltip-header");

d3.select(".tooltip").select("div.tooltip-header").append("div")
  .attr("class", "tooltip-icon").append("img");
d3.select(".tooltip").select("div.tooltip-header").append("div")
  .attr("class", "tooltip-title");

tooltip.append("div")
  .attr("class", "tooltip-post")
  .text("example text");

function show_tooltip(d) {
  tooltip.style("visibility", "visible");
  //tooltip2.style("visibility", "visible");

  //$(".tooltip-header").text(d.name);
  d3.select(".tooltip").select("div.tooltip-title").text(d.name);
  d3.select(".tooltip").select("div.tooltip-post").text(d.name);

  var img = d3.select(".tooltip").select("div.tooltip-icon").select("img")
    .style("background-image", "url('img/icons/"+d.icon+".png')");

  console.log(img);

  return null;
}

function hide_tooltip() {
  tooltip.style("visibility", "hidden");
  tooltip2.style("visibility", "hidden");
  return null;
}

function move_tooltip() {
  var top  = d3.event.pageY-10;
  var left = d3.event.pageX+10;
  var svg_width = $("svg").width();
  var svg_height = $("svg").height();

  if( (left+tooltip_width) > svg_width ) {
    left = left - tooltip_width - 20;
  }

  if( top > svg_height/2 ) {
    tooltip2.style("top", "10px");
    tooltip2.style("bottom", null);
  } else {
    tooltip2.style("top", null);
    tooltip2.style("bottom", "10px");
  }

  tooltip.style("top", top+"px").style("left", left+"px");
  return null;
}
