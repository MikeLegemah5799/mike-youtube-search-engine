// Search bar handler
$(function() { 
    var searchField = $('#query');
    var icon = $('#search-btn');

    //focus  Event handler
    $(searchField).on('focus', function() {  
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400);
    });

    // Blur Event Handler

    $(searchField).on('blur', function() {  
        if(searchField.val == '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function () {});
            $(icon).animate({
                right: '360px'
            },400, function () {});
        }
        
    });

    $('#search-form').submit(function(e) {
        e.preventDefault();
    });

});


function search() { 
    //clear the results
    $('#results').html('');
    $('#buttons').html('');

    // get form input 

    q = $('#query').val();

    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            //'maxResults': '25',
            key: 'AIzaSyAbxDCEPS27ZL-H9eLseWwwuxaHCIUJS6o' },
            function (data) { 
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    // log data
                    var output = getOutput(item);

                    //display Results
                    $('#results').append(output);

                }); 

                var buttons = getButtons(prevPageToken, nextPageToken);

                // show buttons
                $('#buttons').append(buttons);
            }
    );

 }

// Next Page function

function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    //clear the results
    $('#results').html('');
    $('#buttons').html('');

    // get form input 

    q = $('#query').val();

    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            pageToken: token,
            //'maxResults': '25',
            key: 'AIzaSyAbxDCEPS27ZL-H9eLseWwwuxaHCIUJS6o' },
            function (data) { 
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    // log data
                    var output = getOutput(item);

                    //display Results
                    $('#results').append(output);

                }); 

                var buttons = getButtons(prevPageToken, nextPageToken);

                // show buttons
                $('#buttons').append(buttons);
            }
    );

}


// Prev Page function

function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prevt-button').data('query');
    //clear the results
    $('#results').html('');
    $('#buttons').html('');

    // get form input 

    q = $('#query').val();

    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            pageToken: token,
            //'maxResults': '25',
            key: 'AIzaSyAbxDCEPS27ZL-H9eLseWwwuxaHCIUJS6o' },
            function (data) { 
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    // log data
                    var output = getOutput(item);

                    //display Results
                    $('#results').append(output);

                }); 

                var buttons = getButtons(prevPageToken, nextPageToken);

                // show buttons
                $('#buttons').append(buttons);
            }
    );

}


 // Build the output

 function getOutput(item) {
     var videoId = item.id.videoId;
     var title = item.snippet.title;
     var description = item.snippet.description;
     var thumb = item.snippet.thumbnails.high.url;
     var channelTitle = item.snippet.channelTitle;
     var videoDate = item.snippet.publishedAt;

     // build ouput string

     var output = '<li>'  + 
     '<div class="list-left">' + 
     '<img src="'+thumb+'">' + 
     '</div>' +
     '<div class="list-right">' + 
     '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
     '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
     '<p>'+description+'</p>' +
     '</div>' +
     '</li>' + 
     '<div class="clearfix"></div>' +
     '';

     return output;
 }

 // build the buttons 

 function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	}
	
	return btnoutput;
}