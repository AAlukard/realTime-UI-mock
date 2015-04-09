/**
 * Created by alukard on 4/4/15.
 */
$(document).ready(function() {

    function buildMentionsChart() {
        var svg = dimple.newSvg("#mentionsChartContainer", 590, 400);
        var myChart = new dimple.chart(svg, mentionsChartData);
        myChart.setBounds(60, 30, 510, 305);
        var x = myChart.addCategoryAxis("x", "Day");
        x.addOrderRule("Date");
        myChart.addMeasureAxis("y", "Mentions");
        myChart.addSeries("Channel", dimple.plot.area);
        myChart.addLegend(60, 10, 510, 20, "right");
        myChart.draw();

        svg.append("text")
            .attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
            .attr("y", myChart._yPixels() - 20)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-weight", "bold")
            .text("Mentions chart");
    }

    buildMentionsChart();

    function buildSentimentalChart() {
        var svg = dimple.newSvg("#sentimentalChartContainer", 590, 400);
        var myChart = new dimple.chart(svg, sentimentalChartData);
        myChart.setBounds(60, 30, 510, 305);
        var x = myChart.addCategoryAxis("x", "Day");
        x.addOrderRule("Date");
        myChart.addMeasureAxis("y", "Adoption");
        myChart.addSeries("Channel", dimple.plot.line);
        myChart.addLegend(60, 10, 510, 20, "right");
        myChart.draw();

        svg.append("text")
            .attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
            .attr("y", myChart._yPixels() - 20)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-weight", "bold")
            .text("Sentimental chart");
    }

    buildSentimentalChart();
});