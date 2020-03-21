$(document).ready(function(){

    $('#submit_quote').on('click',function(){
        var video_quote = $('#qte').val();

        req = $.ajax({
            url: '/videoquotes',
            type: 'POST',
            data: {quote : video_quote}
        });

        $('#qte').val("");
    });

});