(function($) {

    var requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    }
    
    $.ajax(requestConfig).then(function(responseMessage){
        var newElement = $(responseMessage)
        $('#showList').show();
        for (var i = 0; i < newElement.length; i++)
        {
            var li = `<li><a href='${newElement[i]._links.self.href}'>${newElement[i].name}</a></li>`;
            $('#showList').append(li);
        }
        $('#show').hide();
        $('#homeLink').hide();
    })

    $('#searchForm').submit((event) => {
        event.preventDefault();
        if($('#search_term').val().trim())
        {
            $('#error').hide();
            $('#show').hide();
            $('#showList').empty();
            searchShow($('#search_term').val().trim());
            $('#search_term').focus();
        }
        else
        {
            $('#error').show();
            $('#search_term').focus();
            $('#search_term').val("");
        }
    })

    function searchShow(searchTerm) {
        var requestConfig = {
            method: 'GET',
            url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm
        }
        $.ajax(requestConfig).then(function(responseMessage){
            var newElement = $(responseMessage);
            $('#showList').show();
            for (var i = 0; i < newElement.length; i++)
            {
                var li = `<li><a href='${newElement[i].show._links.self.href}'>${newElement[i].show.name}</a></li>`;
                $('#showList').append(li);
            }
            $('#show').hide();
            $('#homeLink').show();
        })
    }

    $('#showList').on('click', 'a', function(event) {
        event.preventDefault();
        $('#error').hide();
        $('#showList').hide();
        $('#show').empty();
        console.log($(this).attr('href'))
        var requestConfig = {
            type: 'get',
            url: $(this).attr('href'),
        }
        $.ajax(requestConfig).then(function(responseMessage){
            var newElement = $(responseMessage);
            
            $('#show').show();
            var name = (newElement[0].name === null) ? 'N/A' : newElement[0].name;
            var image = (newElement[0].image === null) ? '../public/no_image.jpg' : newElement[0].image.medium;
            var language = (newElement[0].language === null) ? 'N/A' : newElement[0].language;
            var genres = (newElement[0].genres.length === 0) ? 'N/A' : newElement[0].genres;
            var average = (newElement[0].rating.average === null) ? 'N/A' : newElement[0].rating.average;
            var network = (newElement[0].network === null) ? 'N/A' : newElement[0].network.name;
            var summary = (newElement[0].summary === null) ? 'N/A' : newElement[0].summary;

            var h1 = `<h1>${name}</h1>`;
            var img = `<img src='${image}'>`;
            $('#show').append(h1);
            $('#show').append(img);
            $('#show').append(`<dl>`);
            $('#show').append(`<dt>Language</dt><dd>${language}</dd>`);
            $('#show').append(`<dt>Genres</dt>`);
            if(genres === 'N/A')
            {
                $('#show').append(`<dd>N/A</dd>`);
            }
            else
            {
                $('#show').append(`<dd><ul id='genresList'></ul></dd>`);
                for(var i = 0; i < genres.length; i++)
                {
                    $('#genresList').append(`<li>${genres[i]}</li>`);
                }
                
            }
            $('#show').append(`<dt>Average Rating</dt><dd>${average}</dd>`);
            $('#show').append(`<dt>Network</dt><dd>${network}</dd>`);
            $('#show').append(`<dt>Summary</dt><dd>${summary}</dd>`);
        })
        $('#homeLink').show();
    })
        
    
})(window.jQuery);
