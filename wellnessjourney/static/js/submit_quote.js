$(document).ready(function(){

    $('#submit_quote').on('click',function(){

        var liked = $("input[name='like']:checked").val();
        var video_quote = $('#qte').val();

        req = $.ajax({
            url: '/videoinputs',
            type: 'POST',
            data: {quote : video_quote, like : liked}
        });

        console.log(liked);
        $('#qte').val("");
    });

});