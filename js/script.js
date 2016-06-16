
  var canvas = d3.select(".container").append("svg")
    .attr("width", 1000)
    .attr("height", 700)
    .append("g")
    .attr("transform", "translate(50,50)");

  var width = $("svg").parent().width();
  d3.select("svg").attr("width", width);

  // FILTERS
  var filter = canvas.append("defs")
    .append("filter")
      .attr("id", "glowing")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("width", "150%")
      .attr("height", "150%");

  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");

  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 0)
    .attr("dy", 0)
    .attr("result", "offsetBlur");

  filter.append("feFlood")
    .attr("flood-color", "#00a7ff")
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
    .size([600,900]);

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
      .attr("r", 32)
      .attr("class", "glowing")
      .attr("fill", "blue");


    node.append("image")
      .attr("xlink:href", function(d) { return "img/icons/skill.png"; })
      .attr("class", "skill-img glowing")
      .attr("x", "-32px")
      .attr("y", "-32px")
      .attr("width", "64px")
      .attr("height", "64px");

    node.append("text")
      .text(function(d) {
        return d.name;
      });
  });
