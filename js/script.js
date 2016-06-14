
  var canvas = d3.select("body").append("svg")
    .attr("width", 1000)
    .attr("height", 700)
    .append("g")
    .attr("transform", "translate(50,50)");

  var tree = d3.layout.tree()
    .size([600,900]);

  d3.json("https://gist.githubusercontent.com/nshadov/0e087575e131691d481d1b3b0cd6a2d6/raw/ac47e5faff5ae7c861536f331abca7fbd394846f/skill-tree.json", function(data){

    //alert(JSON.stringify(data));

    var nodes = tree.nodes(data);
    var links = tree.links(nodes);

    var diagonal = d3.svg.diagonal()
      .projection(function(d){
        return [d.y, d.x];
      });

    // EDGES
    canvas.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
        .attr("class", "link")
        .attr("stroke", "gray")
        .attr("fill", "none")
        .attr("d", diagonal);

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
      .attr("r", 20)
      .attr("fill", "blue");

    node.append("image")
      .attr("xlink:href", function(d) { return "img/icons/skill.png"; })
      .attr("x", "-32px")
      .attr("y", "-32px")
      .attr("width", "64px")
      .attr("height", "64px");

    node.append("text")
      .text(function(d) {
        return d.name;
      });

  });
