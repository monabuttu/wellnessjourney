var quotes_div = d3.select('#quotes');

d3.json('/api/yourquotes').then(quote_entries => {

    console.log(quote_entries);

    quotes_div.selectAll('div')
    .data(quote_entries)
    .enter()
    .append('p')
    .text(function(d) {
        return d.quote;
      });
});