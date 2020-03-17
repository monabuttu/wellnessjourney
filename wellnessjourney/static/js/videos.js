var video_div = d3.select('#videos');

d3.json('/api/yourvideos').then(function(video){
    console.log(video[0]);

    video_div.append('p').text(`${video[video.length - 1].title}`);
    video_div.append('div').html(`<iframe src="https://www.youtube.com/embed/${video[video.length - 1].video_id}" frameborder="0"></iframe>`);

    video_div.append('p').text(`${video[video.length - 2].title}`);
    video_div.append('div').html(`<iframe src="https://www.youtube.com/embed/${video[video.length - 2].video_id}" frameborder="0"></iframe>`);

});