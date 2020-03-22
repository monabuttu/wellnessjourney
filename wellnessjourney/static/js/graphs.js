
(function() {

// postive/negative graph
var c1 = d3.select('#chart')

d3.json('/api/yourentries').then(entries=>{
    console.log(entries[0]);

    var dates = entries.map(d => d.date);
    var new_dates = [];
    dates.forEach(d=> {
        // console.log(d);
        x = new Date(d)
        x = x.toLocaleDateString('en-US')
        new_dates.push(x);
        });
    
    console.log(new_dates)
    
    var posts = entries.map(d=> d.post);
    var colors = [];
    posts.forEach(d=>{
        if (d==='Positive'){
            colors.push('pink')
        }
        else if (d==='Neutral'){
            colors.push('beige')
        }
        else {
            colors.push('black')
        }
    });
    
    var classification = entries.map(d=> d.post);
    // Part 3 - Line Chart
    var trace1 = {
        x: new_dates,
        y: classification,
        type: "bar",
        marker: {
            color:colors
        }
    };

    var data = [trace1];

    var layout = {
        autosize: true,
        margin: {
            "b":95,
            "l":65,
            "r":25,
            "t":30
        },
        yaxis: {autorange: 'reversed'}

    };

    Plotly.newPlot("chart", data, layout, {staticPlot: true});

});

// selection count graph

var c2 = d3.select('#chart1')

d3.json('/api/yourselection').then(selections =>{
    console.log(selections[0]);
 
    var selection = selections.map(d=> d.selection);

    var group = selection.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});

    // var colors = [];
    // posts.forEach(d=>{
    //     if (d==='Positive'){
    //         colors.push('pink')
    //     }
    //     else if (d==='Neutral'){
    //         colors.push('beige')
    //     }
    //     else {
    //         colors.push('black')
    //     }
    // });
    
 
    var trace2 = {
        x: Object.keys(group),
        y: Object.values(group),
        type: "bar",
        marker: {
            color:'black'
        }
    };

    var data = [trace2];

    var layout = {
        autosize: true,
        margin: {
            "b":95,
            "l":65,
            "r":25,
            "t":30
        }

    };

    Plotly.newPlot("chart1", data, layout, {staticPlot: true});

});

window.onresize = function() {
    Plotly.Plots.resize(c2);
    Plotly.Plots.resize(c1);
    
    d3.json('/api/yourselection').then(selections =>{
        console.log(selections[0]);
     
        var selection = selections.map(d=> d.selection);
    
        var group = selection.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});
    
        // var colors = [];
        // posts.forEach(d=>{
        //     if (d==='Positive'){
        //         colors.push('pink')
        //     }
        //     else if (d==='Neutral'){
        //         colors.push('beige')
        //     }
        //     else {
        //         colors.push('black')
        //     }
        // });
        
     
        var trace2 = {
            x: Object.keys(group),
            y: Object.values(group),
            type: "bar",
            marker: {
                color:'black'
            }
        };
    
        var data = [trace2];
    
        var layout = {
            autosize: true,
            margin: {
                "b":95,
                "l":65,
                "r":25,
                "t":30
            }
    
        };
    
        Plotly.newPlot("chart1", data, layout, {staticPlot: true});
    
    });

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
        
        var posts = entries.map(d=> d.post);
        var colors = [];
        posts.forEach(d=>{
            if (d==='Positive'){
                colors.push('pink')
            }
            else if (d==='Neutral'){
                colors.push('beige')
            }
            else {
                colors.push('black')
            }
        });
        
        var classification = entries.map(d=> d.post);
        // Part 3 - Line Chart
        var trace1 = {
            x: dates,
            y: classification,
            type: "bar",
            marker: {
                color: colors
            }
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