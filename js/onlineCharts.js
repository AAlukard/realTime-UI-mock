/**
 * Created by alukard on 4/4/15.
 */
$(document).ready(function() {

    function buildMentionsChart() {
        var data = [];

        var svg = dimple.newSvg("#mentionsChartContainer", 590, 400);
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 510, 305);
        var x = myChart.addTimeAxis("x", "Time", undefined, "%H:%M:%S");
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


        window.setInterval(function() {updateVizMent(myChart)}, 1000);
    }

    buildMentionsChart();

    function buildSentimentalChart() {
        var data = [];

        var svg = dimple.newSvg("#sentimentalChartContainer", 590, 400);
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 510, 305);
        var x = myChart.addTimeAxis("x", "Time", undefined, "%H:%M:%S");
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

        window.setInterval(function() {updateVizSent(myChart)}, 1000);
    }

    buildSentimentalChart();

    var sentArray = [];

    function updateVizSent(myChart) {
        var date = new Date();

        var prevCola;
        var prevPepsi;
        if (sentArray.length > 1) {
            prevCola = sentArray[sentArray.length-2];
            prevPepsi = sentArray[sentArray.length-1];
        } else {
            prevCola = {Adoption: 1};
            prevPepsi = {Adoption: 1};
        }

        if (sentArray.length > 28) {
            sentArray.splice(0,2);
        }

        var lastAddedPepsiSent = {Time:date.getTime(), Adoption: prevCola.Adoption + (Math.random() - 0.5)*0.5, Channel:"Pepsi"};
        var lastAddedColaSent = {Time:date.getTime(), Adoption: prevPepsi.Adoption + (Math.random() - 0.5)*2, Channel:"Cola"};
        sentArray.push(lastAddedPepsiSent);
        sentArray.push(lastAddedColaSent);
        myChart.data = sentArray.slice();
        myChart.draw(1000);
    }

    var mentArray = [];

    function updateVizMent(myChart) {
        var date = new Date();

        var prevCola;
        var prevPepsi;
        if (mentArray.length > 1) {
            prevCola = mentArray[mentArray.length-2];
            prevPepsi = mentArray[mentArray.length-1];
        } else {
            prevCola = {Mentions: 1};
            prevPepsi = {Mentions: 1};
        }

        if (mentArray.length > 28) {
            mentArray.splice(0,2);
        }

        var nextColaMent = prevCola.Mentions+(Math.random()-0.5)*5;
        if (nextColaMent < 0) {
            nextColaMent = 0;
        }
        var nextPepsiMent = prevPepsi.Mentions+(Math.random()-0.5)*5;
        if (nextPepsiMent < 0) {
            nextPepsiMent = 0;
        }

        var lastAddedColaMent = {Time: date.getTime(), Mentions: nextColaMent,Channel:"Cola"};
        var lastAddedPepsiMent = {Time: date.getTime(), Mentions: nextPepsiMent,Channel:"Pepsi"};
        mentArray.push(lastAddedColaMent);
        mentArray.push(lastAddedPepsiMent);
        myChart.data = mentArray.slice();
        myChart.draw(1000);
    }
});