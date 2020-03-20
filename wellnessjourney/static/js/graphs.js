
(function() {

var c1 = d3.select('#chart')

d3.json('/api/yourentries').then(entries=>{
    console.log(entries[0]);
    var formatTime = d3.timeFormat("%B %d, %Y")

    var dates = entries.map(d => d.date);
    var new_dates = [];
    dates.forEach(d=> {
        // console.log(d);
        x = formatTime(new Date(d))
        new_dates.push(x);
        });
    
    var classification = entries.map(d=> d.post);
    // Part 3 - Line Chart
    var trace1 = {
        x: dates,
        y: classification,
        type: "bar"
    };

    var data = [trace1];

    var layout = {
        autosize: true,
        margin: {
            "b":95,
            "l":65,
            "r":25,
            "t":30
        }

    };

    Plotly.newPlot("chart", data, layout, {staticPlot: true});

});

window.onresize = function() {
    Plotly.Plots.resize(c1);
    
d3.json('/api/yourentries').then(entries=>{
    console.log(entries[0]);
    var formatTime = d3.timeFormat("%B %d, %Y")

    var dates = entries.map(d => d.date);
    var new_dates = [];
    dates.forEach(d=> {
        // console.log(d);
        x = formatTime(new Date(d))
        new_dates.push(x);
        });
    
    var classification = entries.map(d=> d.post);
    // Part 3 - Line Chart
    var trace1 = {
        x: dates,
        y: classification,
        type: "bar"
    };

    var data = [trace1];

    var layout = {
        autosize: true,
        margin: {
            "b":95,
            "l":65,
            "r":25,
            "t":30
        }

    };

    Plotly.newPlot("chart", data, layout, {staticPlot: true});

});

 };

})();