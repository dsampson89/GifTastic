$(function(){
    createButton(searchArray,'searchButton',"#buttonArea");
})
// starting array
var searchArray = ["Dog", "Cat", "Bird"];

function createButton(searchArray, addToClass, addToArea){

    $(addToArea).empty();
    for(var i=0; i<searchArray.length; i++){
        var a = $('<button>');
        a.addClass(addToClass);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(addToArea).append(a);

    }
}

$(document).on('click', '.searchButton', function(){
    var type = $(this).data('type');
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ type +"&api_key=fV9xOrsD5XAFFJnufULaPVQ3S1Jb2BSV&limit=10"
    $.ajax({url:queryUrl,
    method:'GET'
    })
    .then(function(response){
       for(var i=0; i<response.data.length; i++){
           var gifDiv= $('<div class = "gif-item">');
           var rating= response.data[i].rating;
           var p = $('<p>').text('Rating:'+ rating);
           var animated = response.data[i].images.fixed_height.url;
           var still = response.data[i].images.fixed_height_still.url;
           var image = $('<img>');
           image.attr("src", still);
           image.attr("data-still", still);
           image.attr("data-animated", animated);
           image.attr("data-state", 'still');
           image.addClass("gifImage");
           gifDiv.prepend(p);
           gifDiv.prepend(image);
           $('#gifArea').prepend(gifDiv);


       }
    })
})

$(document).on('click','.gifImage', function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state','animated')
    }else{
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$("#addButton").on('click', function(){

    var newSearch = $('input').val();
    searchArray.push(newSearch);
    createButton(searchArray,'searchButton', '#buttonArea');
    return false;
})