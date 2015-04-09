/**
 * Created by alukard on 4/3/15.
 */

$(document).ready(function() {

    var election = new Datamap({
        scope: 'usa',
        element: document.getElementById('container'),
        geographyConfig: {
            highlightBorderColor: '#bada55',
            highlightBorderWidth: 3
        },
        fills: {
            'bad': '#8cacff',
            'somewhat-bad': '#8d6bff',
            'neutral': '#b187ff',
            'somewhat-good': '#ff87fb',
            'good': '#ff8e8e',
             defaultFill: 'rgba(23,48,210,0.9)'
        },
        data: {}
    });
    election.labels();
    election.legend();


    $(".pepsi-button").on('click', function() {
        election.updateChoropleth(pepsi);
    });
    $(".cola-button").on('click', function() {
        election.updateChoropleth(cola);
    });
});