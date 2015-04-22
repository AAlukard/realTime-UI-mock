/**
 * Created by alukard on 4/8/15.
 */
$(document).ready(function() {

    var margin = {top: 40, right: 120, bottom: 40, left: 120},
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.x, d.y]; });

    var mainSvg = d3.select("#tree-container").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom);

    var svg = mainSvg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define 'div' for tooltips
    var div = d3.select("body")
        .append("div")  // declare the tooltip div
        .attr("class", "tooltip")              // apply the 'tooltip' class
        .style("opacity", 0);                  // set the opacity to nil

// load the external data
    d3.json("js/data/treeData.json", function(error, treeData) {
        root = treeData[0];
        update(root);
    });

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });

        // Declare the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {d
                return d.id || (d.id = ++i);
            });

        // Enter the nodes.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });


        nodeEnter.append("defs")
            .append("pattern")
            .attr("id", function(d) { return d.id; })
            .attr("patternUnits", "userSpaceOnUse")
            .attr("height", "48")
            .attr("width", "48")
            .attr("x", "-24")
            .attr("y", "-24")
                .append("image")
                .attr("x", "0")
                .attr("y", "0")
                .attr("height", "48")
                .attr("width", "48")
                .attr("xlink:href", function(d) { return "img/" + d.pic; });

        nodeEnter.append("circle")
            .attr("r", 24)
            .style("fill", function(d) { return "url(#" + d.id + ")"; })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                var content = "";
                if (d.message) {
                    content = "<span style='font-weight: bold'>" + d.message + "</span><br/>";
                }

                content = content + "Retweeted: " + d.retweets;

                div	.html(content)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            });

        //nodeEnter.append("image")
        //    .attr("xlink:href", function(d) { return "img/" + d.pic; })
        //    .attr("x", "-24")
        //    .attr("y", "-24")
        //    .attr("width", "48")
        //    .attr("height", "48");

        //nodeEnter.append("text")
        //    .attr("x", function (d) {
        //        return d.children || d._children ? -13 : 13;
        //    })
        //    .attr("dy", ".35em")
        //    .attr("text-anchor", function (d) {
        //        return d.children || d._children ? "end" : "start";
        //    })
        //    .text(function (d) {
        //        return d.name;
        //    })
        //    .style("fill-opacity", 1);

        // Declare the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter the links.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", diagonal);
    }
});