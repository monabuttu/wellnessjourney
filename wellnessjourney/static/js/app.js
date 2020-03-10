d3.json('/api/yourquotes').then(function test(data){
    console.log(data[0].affirmation);
    d3.select('#a1').text(data[0].affirmation);
})