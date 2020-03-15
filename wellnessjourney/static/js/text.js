var form = d3.select('#traits');

var traits = ['Patience','Responsibility','Willpower','Confidence','Positivity',
'Focus','Passion','Resiliency','Faith','Courage','Discipline'];

var intro = 'What is success? There are many definitions and one could argue that the definition depends on each individual. What does success mean to you? What do you need to do to achieve your goals and meet your definition of success?'

var traits_intro = 'Although the definition of success varies, successful people share similar traits and work hard at cultivating them. Use this app to stay positive, motivated and focused on achieving your definition of success.'
d3.select('#successblurb').html(`<p>${intro}</p>`);


d3.select('#successcharacteristics').html(`<p>${traits_intro}</p><br><p>Choose one of the below to start your journey towards building a mind-set ready for success!</p>`)

form.selectAll('p').data(traits)
.enter()
.append('p')
.html(trait=>`<input type = 'radio' value = '${trait}' id='${trait}' name='selection'><label for='${trait}'> ${trait}</label>`)

form.append("button").attr('type', 'submit').text('Get Motivated!');
