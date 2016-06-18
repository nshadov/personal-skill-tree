
  var width = 0;
  var height = 700;
  var border = 100;
  var nodesize = 40;

  var canvas = d3.select(".container").append("svg")
    .append("g")
    .attr("transform", "translate("+border+","+border+")");

  width = $("svg").parent().width();
  d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  // FILTERS
  var filter = canvas.append("defs")
    .append("filter")
      .attr("id", "glowing")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("width", "150%")
      .attr("height", "150%");

  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 2)
    .attr("result", "blur");

  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 0)
    .attr("dy", 0)
    .attr("result", "offsetBlur");

  filter.append("feFlood")
    .attr("flood-color", "#0067ff")
    .attr("result", "color");
  filter.append("feComposite")
    .attr("in2", "offsetBlur")
    .attr("operator", "in");

  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode");
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

  // TREE DEFINITION
  var tree = d3.layout.tree()
    .nodeSize(nodesize)
    .separation(function(a,b){return 10;})
    .size([height-2*border,width-2*border]);

  d3.json("https://gist.githubusercontent.com/nshadov/0e087575e131691d481d1b3b0cd6a2d6/raw/7376fd840c2c153cf76639062319e45094c1338d/skill-tree.json", function(data){

    //alert(JSON.stringify(data));

    var nodes = tree.nodes(data);
    var links = tree.links(nodes);

    // Unused
    var diagonal = d3.svg.diagonal()
      .projection(function(d){
        return [d.y, d.x];
      });

    var step_line = d3.svg.line().interpolate("step")
      .x(function(d){ return d.ly })
      .y(function(d){ return d.lx });

    function diagonal_step(d){
      var points = [
          {lx: d.source.x, ly: d.source.y},
          {lx: d.target.x, ly: d.target.y}
      ];
      return step_line(points);
    }

    // EDGES
    canvas.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
        .attr("class", "link glowing")
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("d", diagonal_step);

    // NODES
    var node = canvas.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" +d.y+ "," +d.x+ ")";
        });

    node.append("circle")
      .attr("r", nodesize/2)
      .attr("class", "glowing")
      .attr("fill", "blue");

    // ADDING TOOLTIPS
    if (typeof tooltip !== 'undefined') {
    // the variable is defined
    node.on("mouseover", function(){return show_tooltip();})
	    .on("mousemove", function(){return move_tooltip();})
	    .on("mouseout", function(){return hide_tooltip();});
    }

    node.append("image")
      .attr("xlink:href", function(d) { return "img/icons/skill.png"; })
      .attr("class", "skill-img glowing")
      .attr("x", "-"+nodesize/2+"px")
      .attr("y", "-"+nodesize/2+"px")
      .attr("width", nodesize+"px")
      .attr("height", nodesize+"px");

    node.append("text")
      .text(function(d) {
        return d.name;
      });
  });
