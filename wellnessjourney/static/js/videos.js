var video_div = d3.select('#videos');

d3.json('/api/yourselection').then(function(video){
    console.log(video[0]);

    video_div.append('p').text(`${video[video.length - 1].title}`);
    video_div.append('div').html(`<iframe id='videolink' src="https://www.youtube.com/embed/${video[video.length - 1].video_id}" frameborder="0"></iframe>`);

    $(document).ready(function(){

        $('#submit_quote').on('click',function(){
    
            var liked = $("input[name='like']:checked").val();
            var video_quote = $('#qte').val();
            var liked_video = $("iframe").attr("src");
    
            req = $.ajax({
                url: '/videoinputs',
                type: 'POST',
                data: {quote : video_quote, like : liked, l_video: liked_video}
            });
    
            console.log(liked);
            console.log(liked_video);
            $('#qte').val("");
        });
    
    });

});

