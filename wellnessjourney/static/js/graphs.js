
(function() {

// postive/negative graph
var c1 = d3.select('#chart')

d3.json('/api/yourentries').then(entries=>{
    var dates = entries.map(d => d.date);
    var new_dates = [];
    dates.forEach(d=> {
        x = new Date(d)
        x = x.toLocaleDateString('en-US')
        new_dates.push(x);
        });
    
    console.log(new_dates)
    
    var posts = entries.map(d=> d.post);
    var postgroup = posts.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});

    var colors = ['pink','beige','black'];
    var data = [{
        values: Object.values(postgroup),
        labels: Object.keys(postgroup),
        marker: {
            colors: colors
        },
        type: 'pie'
      }];

    var layout = {
        // autosize: true,
        margin: {
            "b":95,
            "l":65,
            "r":25,
            "t":30
        },
        showlegend: true,
	    legend: {"orientation": "h"}

    };

    Plotly.newPlot("chart", data, layout, {staticPlot: true});

});

// selection count graph

var c2 = d3.select('#chart1')

d3.json('/api/yourselection').then(selections =>{
 
    var selection = selections.map(d=> d.selection);

    var group = selection.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});
 
 
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
     
        var selection = selections.map(d=> d.selection);
    
        var group = selection.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});      
     
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
    
    var posts = entries.map(d=> d.post);
    var postgroup = posts.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});
    var colors = ['pink','beige','black'];
    var data = [{
        values: Object.values(postgroup),
        labels: Object.keys(postgroup),
        marker: {
            colors: colors
        },
        type: 'pie'
      }];

    var layout = {
        // autosize: true,
        margin: {
            "b":95,
            "l":65,
            "r":25,
            "t":30
        },
        showlegend: true,
	    legend: {"orientation": "h"}

    };

    Plotly.newPlot("chart", data, layout, {staticPlot: true});
    
    });

 };

})();