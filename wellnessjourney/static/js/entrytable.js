d3.json('/api/yourentries').then(entries=>{

var tableData = entries;

// get table element

var tableBody = d3.select("tbody");

tableData.forEach((entry) => {
    var row = tableBody.append("tr");
    Object.entries(entry).forEach(([key,value]) => {
        var cell = row.append("td");
        cell.text(value);
    }); 
});

// Select the button
var button = d3.selectAll(".form-control");

button.on("change", function() {

  // Select the input element and get the raw HTML node
  var moodinputValue = d3.select('#mood').node().value;
  var polarinputValue = d3.select('#polar').node().value;

  
var  filteredData = tableData;

  if (moodinputValue != "") {
    filteredData = filteredData.filter(function (mood) {
    return mood.mood === moodinputValue;
});
}

if (polarinputValue != "") {
    filteredData = filteredData.filter(function (polar) {
        return polar.post === polarinputValue;
    });
}

  tableBody.selectAll("tr").remove();
  tableBody.selectAll("td").remove();
  
// output filtered data

  filteredData.forEach((data) => {
    var row = tableBody.append("tr");
    Object.entries(data).forEach(([key,value]) => {
        var cell = row.append("td");
        cell.text(value);
    }); 
});

});


var button2 = d3.select("#filter-btn");

button2.on("click",function(){
  tableData.forEach((entry) => {
    var row = tableBody.append("tr");
    Object.entries(entry).forEach(([key,value]) => {
        var cell = row.append("td");
        cell.text(value);
    }); 
});

var moodinputValue = d3.select('#mood').property("value","");
var polarinputValue = d3.select('#polar').property("value","");

});
});
