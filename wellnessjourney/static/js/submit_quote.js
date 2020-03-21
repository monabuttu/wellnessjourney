$(document).ready(function(){

    $('#submit_quote').on('click',function(){
        var video_quote = $('#qte').val();
        console.log(video_quote);

        req = $.ajax({
            url: '/videoquotes',
            type: 'POST',
            data: {quote : video_quote}
        });

        $('#qte').val("");
    });

});