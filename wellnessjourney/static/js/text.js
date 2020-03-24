var intro = 'What is your definition of success? There are many definitions and one could argue that the definition depends on each individual.'

var traits_intro = 'Although the definitions of success varies, successful people work hard at cultivating a positive attitude. Use this app as a tool to maintain a positive mindset, stay motivated and remain focused on achieving your definition of success.'
d3.select('#successblurb').html(`<p>${intro}</p>`);

// form element
var form = d3.select('#traits');

// create options for length of video
var length = ['Less than 4 minutes', 'Between 4 and 20 minutes','Longer than 20 minutes'];

// add length options to form
form.append('span').html(`<input type = 'radio' value = 'short' id='short' name='length'><label for='$short'>${length[0]}</label><br>`)
form.append('span').html(`<input type = 'radio' value = 'medium' id='medium' name='length'><label for='medium'>${length[1]}</label><br>`)
form.append('span').html(`<input type = 'radio' value = 'long' id='long' name='length'><label for='long'>${length[2]}</label><br><br>`)


// create search words
var traits = ['Grit','Patience','Responsibility','Willpower','Confidence','Positivity','Planning',
'Focus','Passion','Resiliency','Courage','Discipline','Happiness','Gratitude'];

d3.select('#successcharacteristics').html(`<p>${traits_intro}</p><br><p>Choose your preferred video length and topic to start your morning on a positive note!!</p>`)



form.selectAll('p').data(traits)
.enter()
.append('p')
.html(trait=>`<input type = 'radio' value = '${trait}' id='${trait}' name='selection'><label for='${trait}'> ${trait}</label>`)

form.append("button").attr('type', 'submit').text('Get Motivated!');
