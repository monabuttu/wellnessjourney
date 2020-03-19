
d3.json('/api/yourentries').then(entries=>{
    console.log(entries[0]);

    var parseTime = d3.timeParse("%B %d, %Y")
    parseTime(entries[0].date);

    var dates = entries.map(d => d.date);
    var classification = entries.map(d=> d.post);
    // Part 3 - Line Chart
    var trace1 = {
        x: dates,
        y: classification,
        type: "bar"
    };

    var data = [trace1];

    var layout = {
        autosize: false,
        width: 500,
        height: 500,
        margin: {
        // l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
        }

    };

    Plotly.newPlot("chart", data, layout);

});


